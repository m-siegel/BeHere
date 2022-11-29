/* Ilana-Mahmea */

const generalUtil = {};

/**
 * Tests whether the parameter has a valid email syntax.
 * @param {string} email String to test for valid email structure.
 * @returns {boolean} Whether or not the parameter is a valid email.
 */
export function validEmailStructure(email) {
  if (typeof email === "string") {
    // From https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s01.html
    const re =
      /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[A-Z0-9-]+\.)+[A-Z]{2,6}$/i;
    if (email.match(re)) {
      return true;
    }
  }
  return false;
}
generalUtil.validEmailStructure = validEmailStructure;

/**
 * Extracts the organization (everything after the @ sign) from the given email.
 * @param {string} email Email to extract the organization from.
 * @returns {string} The domain section of the email (everything after the @ sign) or an empty string.
 */
export function getOrgFromEmail(email) {
  const re = /@((?:[A-Z0-9-]+\.)+[A-Z]{2,6}$)/i;
  const matches = email.match(re); // Will throw TypeError if not a string
  if (matches) {
    return matches[1]; // The second match group is the one without the "@"
  }
  return "";
}
generalUtil.getOrgFromEmail = getOrgFromEmail;

export default generalUtil;
