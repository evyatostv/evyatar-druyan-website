import assert from 'node:assert/strict';
import { afterEach, beforeEach, describe, it, mock } from 'node:test';
import {
  attributionFrom, EMPTY_ANSWERS, leadSummary, normalizePhone, normalizeWebsite,
  questionsFor, SERVICE_LABELS, submitShopifyLead, validateAnswer, whatsappFallback,
  type AnswerKey, type ShopifyAnswers, type ShopifyService,
} from '../src/lib/shopifyLead';

const TEST_ID = '08f516f0-b33a-42e9-bba2-538740fead24';

function validAnswers(service: ShopifyService = 'maintenance'): ShopifyAnswers {
  const questions = questionsFor(service);
  return {
    ...EMPTY_ANSWERS,
    business: 'סטודיו בדיקה — כלי קרמיקה בעבודת יד',
    stage: questions.find(q => q.key === 'stage')!.options![0],
    need: questions.find(q => q.key === 'need')!.options![0],
    website: 'example.com/shop',
    timing: questions.find(q => q.key === 'timing')!.options![1],
    budget: questions.find(q => q.key === 'budget')!.options![0],
    name: 'נועה בדיקה',
    contact: '050-123-4567',
    contactMethod: 'phone',
  };
}

function validation(key: AnswerKey, value: string, changes: Partial<ShopifyAnswers> = {}, service: ShopifyService = 'maintenance') {
  return validateAnswer(questionsFor(service).find(q => q.key === key)!, { ...validAnswers(service), ...changes, [key]: value });
}

describe('Lead qualification and normalization', () => {
  it('keeps both offers at eight questions while qualifying the relevant business stage', () => {
    const maintenance = questionsFor('maintenance');
    const build = questionsFor('build');
    assert.equal(maintenance.length, 8);
    assert.equal(build.length, 8);
    assert.deepEqual(maintenance.map(q => q.key), build.map(q => q.key));
    assert.equal(new Set(maintenance.map(q => q.key)).size, 8);
    assert.notDeepEqual(maintenance.find(q => q.key === 'stage')!.options, build.find(q => q.key === 'stage')!.options);
    assert.notDeepEqual(maintenance.find(q => q.key === 'need')!.options, build.find(q => q.key === 'need')!.options);
    assert.notEqual(maintenance.find(q => q.key === 'budget')!.hint, build.find(q => q.key === 'budget')!.hint);
    for (const service of ['maintenance', 'build'] as const) {
      for (const q of questionsFor(service)) assert.equal(validateAnswer(q, validAnswers(service)), '');
    }
    assert.notEqual(validation('stage', maintenance.find(q => q.key === 'stage')!.options![0], {}, 'build'), '');
  });

  it('normalizes common Israeli and international formats without accepting incomplete Israeli numbers', () => {
    for (const [input, expected] of [
      ['050-123-4567', '+972501234567'], ['(052) 123 4567', '+972521234567'],
      ['03-123-4567', '+97231234567'], ['077-123-4567', '+972771234567'],
      ['+972 50 123 4567', '+972501234567'], ['+972-3-1234567', '+97231234567'],
      ['+44 20 7946 0958', '+442079460958'],
    ]) assert.equal(normalizePhone(input), expected, input);
    for (const invalid of ['', ' ', '050123456', '05012345678', '0312345678', '077123456', '+97250123456', '+9720501234567', '+972312345678', '1234', '050abcd567', '+012345678', '+1234567890123456']) {
      assert.equal(normalizePhone(invalid), '', invalid);
    }
  });

  it('accepts optional bare-domain links and rejects unsafe or malformed destinations', () => {
    assert.equal(normalizeWebsite(' example.com/shop '), 'https://example.com/shop');
    assert.equal(normalizeWebsite('https://www.example.com/אביזרים'), 'https://www.example.com/%D7%90%D7%91%D7%99%D7%96%D7%A8%D7%99%D7%9D');
    assert.equal(normalizeWebsite('http://example.com'), 'http://example.com/');
    assert.equal(normalizeWebsite(''), '');
    assert.equal(validation('website', ''), '');
    assert.equal(validation('website', '  '), '');
    for (const invalid of ['javascript:alert(1)', 'data:text/html,hello', 'ftp://example.com', 'https://user:password@example.com', 'http://localhost', 'https://', 'not a domain']) {
      assert.equal(normalizeWebsite(invalid), '', invalid);
      assert.notEqual(validation('website', invalid), '');
    }
  });

  it('rejects empty required answers and out-of-range copy without rejecting Hebrew or punctuation', () => {
    for (const q of questionsFor('maintenance').filter(q => !q.optional)) {
      assert.notEqual(validateAnswer(q, { ...validAnswers(), [q.key]: '   ' }), '', q.key);
    }
    for (const key of ['business', 'name'] as const) {
      const max = key === 'business' ? 300 : 80;
      assert.notEqual(validation(key, 'א'), '');
      assert.equal(validation(key, 'אב'), '');
      assert.equal(validation(key, 'א'.repeat(max)), '');
      assert.notEqual(validation(key, 'א'.repeat(max + 1)), '');
    }
    assert.equal(validation('business', 'נועה & Co. — כלי בית 🏺; "עבודת יד"'), '');
    assert.notEqual(validation('budget', 'a value outside the offered choices'), '');
  });

  it('accepts exactly the chosen contact channel and rejects malformed addresses', () => {
    assert.equal(validation('contact', ' test+shop@example.com ', { contactMethod: 'email' }), '');
    for (const invalid of ['not-email', 'name@host', 'name @example.com', '@example.com', 'a'.repeat(245) + '@example.com']) {
      assert.notEqual(validation('contact', invalid, { contactMethod: 'email' }), '', invalid);
    }
    assert.equal(validation('contact', '+972501234567', { contactMethod: 'phone' }), '');
    assert.notEqual(validation('contact', 'test@example.com', { contactMethod: 'phone' }), '');
    assert.notEqual(validation('contact', '050-123-4567', { contactMethod: 'email' }), '');
  });
});

describe('Attribution and explicit WhatsApp fallback', () => {
  it('keeps bounded campaign identifiers and drops arbitrary query parameters and unsafe values', () => {
    const query = new URLSearchParams({ ad: 'A', utm_source: 'instagram', utm_medium: 'story', utm_campaign: 'shopify_2026-11', utm_content: 'build-B', email: 'person@example.com', phone: '0501234567', business: 'private answers', fbclid: 'tracking-value' });
    assert.deepEqual(attributionFrom(query.toString()), { ad: 'A', utm_source: 'instagram', utm_medium: 'story', utm_campaign: 'shopify_2026-11', utm_content: 'build-B' });
    assert.deepEqual(attributionFrom('?utm_source=person%40example.com&utm_medium=%3Cscript%3E&ad=' + 'x'.repeat(81)), {});
    assert.deepEqual(attributionFrom(''), {});
    assert.deepEqual(attributionFrom('?ad=' + 'x'.repeat(80)), { ad: 'x'.repeat(80) });
  });

  it('preserves all answers as plain text in a correctly encoded, user-sent message', () => {
    const answers = { ...validAnswers('build'), business: 'A&B — "כלים" 🏺', website: '', contactMethod: 'email' as const, contact: 'lead+test@example.com' };
    const summary = leadSummary('build', answers);
    assert.ok(summary.includes(SERVICE_LABELS.build));
    assert.ok(summary.includes('לא נמסר'));
    assert.ok(summary.includes('ערוץ חזרה מועדף: אימייל'));
    for (const key of ['business', 'stage', 'need', 'timing', 'budget', 'name', 'contact'] as const) assert.ok(summary.includes(answers[key]));
    const url = new URL(whatsappFallback('build', answers));
    assert.equal(url.origin, 'https://wa.me');
    assert.equal(url.pathname, '/972535532893');
    assert.equal(url.searchParams.get('text'), summary);
    assert.equal([...url.searchParams].length, 1);
    assert.ok(leadSummary('maintenance', validAnswers()).includes('טלפון / WhatsApp'));
  });
});

describe('Remote delivery truthfulness', { concurrency: false }, () => {
  let originalWindow: unknown;
  let cleanupCount: number;
  let scheduledAbort: (() => void) | undefined;
  let requests: { input: string; init: RequestInit }[];
  let respond: (init: RequestInit) => Promise<Response>;

  beforeEach(() => {
    originalWindow = (globalThis as { window?: unknown }).window;
    cleanupCount = 0;
    scheduledAbort = undefined;
    requests = [];
    (globalThis as { window?: unknown }).window = {
      setTimeout(callback: () => void, delay: number) { assert.ok(delay > 0 && delay <= 15000); scheduledAbort = callback; return 1; },
      clearTimeout() { cleanupCount += 1; },
    };
    respond = async () => new Response(null, { status: 201 });
    mock.method(globalThis, 'fetch', async (input: string | URL | Request, init?: RequestInit) => {
      assert.equal(String(input), 'https://lead-backend.invalid/rest/v1/leads', 'test must never address the live backend');
      assert.ok(init);
      requests.push({ input: String(input), init });
      return respond(init);
    });
  });

  afterEach(() => {
    mock.restoreAll();
    if (originalWindow === undefined) delete (globalThis as { window?: unknown }).window;
    else (globalThis as { window?: unknown }).window = originalWindow;
  });

  it('only accepts confirmed remote inserts and preserves qualification information', async () => {
    const answers = validAnswers();
    await submitShopifyLead('maintenance', answers, TEST_ID, { ad: 'A', utm_source: 'instagram' });
    assert.equal(requests.length, 1);
    const request = requests[0].init;
    assert.equal(request.method, 'POST');
    assert.equal(new Headers(request.headers).get('Prefer'), 'return=minimal');
    const body = JSON.parse(String(request.body));
    assert.equal(body.id, TEST_ID);
    assert.equal(body.full_name, answers.name);
    assert.equal(body.company, answers.business);
    assert.equal(body.phone, '+972501234567');
    assert.equal(body.email, '');
    assert.equal(body.project_type, 'shopify-maintenance');
    assert.equal(body.budget, answers.budget);
    for (const key of ['stage', 'need', 'website', 'timing', 'budget'] as const) assert.ok(body.details.includes(answers[key]));
    assert.ok(body.details.includes('utm_source: instagram'));
    assert.ok(body.details.includes(TEST_ID));
    assert.equal(cleanupCount, 1);
  });

  it('stores an email-only build lead without inventing a phone number', async () => {
    const answers = { ...validAnswers('build'), name: ' נועה ', contactMethod: 'email' as const, contact: ' test@example.com ' };
    await submitShopifyLead('build', answers, TEST_ID, {});
    const body = JSON.parse(String(requests[0].init.body));
    assert.equal(body.full_name, 'נועה');
    assert.equal(body.email, 'test@example.com');
    assert.equal(body.phone, '');
    assert.equal(body.project_type, 'shopify-build');
  });

  it('blocks invalid answers before any network request', async () => {
    for (const answers of [{ ...validAnswers(), contact: '050123456' }, { ...validAnswers(), business: '' }, { ...validAnswers(), website: 'javascript:alert(1)' }]) {
      await assert.rejects(submitShopifyLead('maintenance', answers, TEST_ID, {}), /Invalid form/);
    }
    assert.equal(requests.length, 0);
    assert.equal(cleanupCount, 0);
  });

  it('rejects HTTP errors instead of treating a local copy as delivery', async () => {
    for (const status of [400, 401, 403, 500, 503]) {
      respond = async () => new Response(JSON.stringify({ message: 'backend unavailable' }), { status });
      await assert.rejects(submitShopifyLead('maintenance', validAnswers(), TEST_ID, {}), /Remote submission failed/);
    }
    assert.equal(requests.length, 5, 'no hidden retries');
    assert.equal(cleanupCount, 5);
  });

  it('propagates offline failures and clears its timeout', async () => {
    respond = async () => { throw new TypeError('Failed to fetch'); };
    await assert.rejects(submitShopifyLead('maintenance', validAnswers(), TEST_ID, {}), /Failed to fetch/);
    assert.equal(requests.length, 1);
    assert.equal(cleanupCount, 1);
  });

  it('aborts a stalled request and never reports success on timeout', async () => {
    respond = (init) => new Promise((_resolve, reject) => {
      init.signal!.addEventListener('abort', () => reject(new DOMException('Timed out', 'AbortError')), { once: true });
    });
    const pending = submitShopifyLead('maintenance', validAnswers(), TEST_ID, {});
    assert.ok(scheduledAbort);
    scheduledAbort();
    await assert.rejects(pending, { name: 'AbortError' });
    assert.equal(cleanupCount, 1);
  });

  it('allows byte-identical retry after a lost response without a second UUID', async () => {
    const answers = validAnswers();
    respond = async () => { throw new TypeError('Response lost'); };
    await assert.rejects(submitShopifyLead('maintenance', answers, TEST_ID, { ad: 'A' }), /Response lost/);
    respond = async () => new Response(JSON.stringify({ code: '23505', message: 'duplicate key value violates unique constraint "leads_pkey"' }), { status: 409 });
    await submitShopifyLead('maintenance', answers, TEST_ID, { ad: 'A' });
    assert.equal(requests.length, 2);
    assert.equal(requests[0].init.body, requests[1].init.body);
    assert.equal(cleanupCount, 2);
  });

  it('does not treat unrelated conflicts or malformed errors as successful delivery', async () => {
    for (const body of [
      JSON.stringify({ code: '23505', message: 'duplicate key value violates unique constraint "leads_email_key"' }),
      JSON.stringify({ code: 'other', message: 'leads_pkey' }),
      'not JSON',
    ]) {
      respond = async () => new Response(body, { status: 409 });
      await assert.rejects(submitShopifyLead('maintenance', validAnswers(), TEST_ID, {}), /Remote submission failed/);
    }
    assert.equal(cleanupCount, 3);
  });
});
