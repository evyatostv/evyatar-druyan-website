import { BiometricAuth, BiometryError, BiometryErrorType } from '@aparajita/capacitor-biometric-auth';
import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';

const PUSH_TOKEN_STORAGE_KEY = 'dd-admin-push-token-v1';

export function isNativeAdminApp() {
  return Capacitor.isNativePlatform();
}

export function getStoredAdminPushToken() {
  return localStorage.getItem(PUSH_TOKEN_STORAGE_KEY) || '';
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
