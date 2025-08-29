export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s-]{10,}$/,
  ZIP: /^[a-zA-Z0-9\s-]{3,10}$/,
  CARD_NUMBER: /^\d{16}$/,
  EXPIRY: /^\d{2}\/\d{2}$/,
  CVC: /^\d{3,4}$/,
}
