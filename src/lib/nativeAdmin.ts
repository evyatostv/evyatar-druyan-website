import { BiometricAuth, BiometryError, BiometryErrorType } from '@aparajita/capacitor-biometric-auth';
import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { PushNotifications } from '@capacitor/push-notifications';

const PUSH_TOKEN_STORAGE_KEY = 'dd-admin-push-token-v1';

export function isNativeAdminApp() {
  return Capacitor.isNativePlatform();
}

export function getStoredAdminPushToken() {
  return localStorage.getItem(PUSH_TOKEN_STORAGE_KEY) || '';
}

export async function requestAdminLocalNotificationsPermission() {
  if (isNativeAdminApp()) {
    let permission = await LocalNotifications.checkPermissions();
    if (permission.display === 'prompt') {
      permission = await LocalNotifications.requestPermissions();
    }
    return permission.display === 'granted';
  }

  if (typeof window !== 'undefined' && 'Notification' in window) {
    if (Notification.permission === 'default') {
      await Notification.requestPermission();
    }
    return Notification.permission === 'granted';
  }

  return false;
}

export async function requireAdminBiometric(isRTL: boolean) {
  if (!isNativeAdminApp()) return;

  const labels = isRTL
    ? {
        reason: 'אימות ביומטרי לפתיחת דשבורד האדמין',
        cancelTitle: 'ביטול',
        iosFallbackTitle: 'קוד גישה',
        androidTitle: 'כניסה לאדמין',
        androidSubtitle: 'אימות ביומטרי נדרש',
      }
    : {
        reason: 'Biometric authentication is required to unlock admin dashboard',
        cancelTitle: 'Cancel',
        iosFallbackTitle: 'Use passcode',
        androidTitle: 'Admin Login',
        androidSubtitle: 'Biometric authentication required',
      };

  try {
    const biometry = await BiometricAuth.checkBiometry();
    if (!biometry.isAvailable && !biometry.deviceIsSecure) {
      return;
    }

    await BiometricAuth.authenticate({
      reason: labels.reason,
      cancelTitle: labels.cancelTitle,
      allowDeviceCredential: true,
      iosFallbackTitle: labels.iosFallbackTitle,
      androidTitle: labels.androidTitle,
      androidSubtitle: labels.androidSubtitle,
      androidConfirmationRequired: false,
    });
  } catch (error) {
    if (error instanceof BiometryError) {
      if (error.code === BiometryErrorType.userCancel || error.code === BiometryErrorType.systemCancel) {
        throw new Error(isRTL ? 'האימות בוטל. נסו שוב.' : 'Authentication was canceled. Try again.');
      }
      throw new Error(isRTL ? 'האימות הביומטרי נכשל.' : 'Biometric authentication failed.');
    }
    throw new Error(isRTL ? 'לא ניתן להשלים אימות ביומטרי כרגע.' : 'Unable to complete biometric authentication right now.');
  }
}

export async function registerAdminPushToken(isRTL: boolean) {
  if (!isNativeAdminApp()) return '';

  try {
    await PushNotifications.removeAllListeners();
  } catch {
    // ignore stale listeners
  }

  const tokenPromise = new Promise<string>((resolve, reject) => {
    let settled = false;
    const done = (value: string, isError = false) => {
      if (settled) return;
      settled = true;
      if (isError) {
        reject(new Error(value));
      } else {
        resolve(value);
      }
    };

    PushNotifications.addListener('registration', (token) => {
      localStorage.setItem(PUSH_TOKEN_STORAGE_KEY, token.value);
      done(token.value);
    });

    PushNotifications.addListener('registrationError', () => {
      done(isRTL ? 'שגיאה ברישום פושים' : 'Push registration error', true);
    });

    window.setTimeout(() => {
      done(isRTL ? 'פג זמן ההמתנה לרישום פושים' : 'Push registration timed out', true);
    }, 10000);
  });

  let status = await PushNotifications.checkPermissions();
  if (status.receive === 'prompt') {
    status = await PushNotifications.requestPermissions();
  }
  if (status.receive !== 'granted') {
    throw new Error(isRTL ? 'אין הרשאה להתראות' : 'Notifications permission denied');
  }

  await PushNotifications.register();
  return tokenPromise;
}

export async function notifyLeadReceived(
  lead: { fullName?: string; projectType?: string; company?: string },
  isRTL: boolean,
) {
  const title = isRTL ? 'ליד חדש התקבל' : 'New lead received';
  const leadName = lead.fullName || (isRTL ? 'ליד חדש' : 'New lead');
  const detail = lead.projectType || lead.company || '';
  const body = detail ? `${leadName} · ${detail}` : leadName;

  const isAllowed = await requestAdminLocalNotificationsPermission();
  if (!isAllowed) {
    return { delivered: false, reason: isRTL ? 'אין הרשאה להתראות' : 'Notifications permission denied' };
  }

  if (isNativeAdminApp()) {
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            id: Date.now() % 2147483000,
            title,
            body,
            schedule: {
              at: new Date(Date.now() + 250),
            },
          },
        ],
      });
      return { delivered: true };
    } catch (error) {
      return {
        delivered: false,
        reason:
          error instanceof Error
            ? error.message
            : isRTL
              ? 'נכשלה יצירת התראה מקומית'
              : 'Failed to schedule local notification',
      };
    }
  }

  if (typeof window !== 'undefined' && 'Notification' in window) {
    if (Notification.permission === 'granted') {
      new Notification(title, { body });
      return { delivered: true };
    }
  }
  return { delivered: false, reason: isRTL ? 'לא ניתן להציג התראה כרגע' : 'Could not display notification' };
}
