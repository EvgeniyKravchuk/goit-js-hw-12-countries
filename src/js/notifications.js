import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

export function errorNotification(message) {
  const pnotifyError = error({
    text: `${message}`,
    type: 'error',
    addClass: 'pnotify-error',
    closer: false,
    sticker: false,
    delay: 3500,
  });
}
