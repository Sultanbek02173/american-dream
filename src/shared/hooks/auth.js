import Cookies from 'js-cookie';

const ROLE_COOKIE = 'user_role';
const canUseDOM = typeof document !== 'undefined';
const isSecure =
  typeof window !== 'undefined' && window.location?.protocol === 'https:';
const cookieOptions = {
  expires: 1,
  path: '/',
  sameSite: 'Lax',
  secure: isSecure,
};

const ALLOWED_ROLES = new Set(['Admin', 'Manager', 'Teacher', 'Student']);

export const setRole = role => {
  if (!canUseDOM) return;
  if (role && !ALLOWED_ROLES.has(role)) {
    console.warn(`[roleCookie] Unknown role "${role}" — set anyway`);
  }
  Cookies.set(ROLE_COOKIE, role, cookieOptions);
};

export const getRole = () => {
  if (!canUseDOM) return null;
  return Cookies.get(ROLE_COOKIE) || null;
};

export const removeRole = () => {
  if (!canUseDOM) return;
  Cookies.remove(ROLE_COOKIE, { path: '/' });
};
