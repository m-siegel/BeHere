/* Ilana-Mahmea */

import bcrypt from "bcrypt";
import generalUtil from "./general-util.js";
import userConnect from "../db-connect/users-connect.js";

const userUtil = {};

/**
 * Registers a user based on the attributes of the parameter object if the parameter object's username and email
 * fields are valid.
 * @param {Object} registrationInfo Object with information needed to register the user.
 *     Should include firstName, lastName, username, password, contactEmail and orgEmail attributes.
 * @returns {Object} Object indicating the success or failure of the registration. The return object
 *     has the following attributes:
 *     - success: boolean. Whether or not the registration was successful.
 *     - reason: string. Indicates where the failure was if the registration was not successful.
 *     - userIdString: string. The string representation of the database id of the inserted object,
 *     if insertion was successful.
 */
export async function registerUser(registrationInfo) {
  // TODO: Validate parameters, esp email
  if (!generalUtil.validEmailStructure(registrationInfo.orgEmail)) {
    return {
      success: false,
      reason: `${registrationInfo.orgEmail} is an invalid email address.`,
      userIdString: "",
    };
  }
  if (!generalUtil.validEmailStructure(registrationInfo.contactEmail)) {
    return {
      success: false,
      reason: `${registrationInfo.contactEmail} is an invalid email address.`,
      userIdString: "",
    };
  }
  if (await userConnect.usernameInUse(registrationInfo.username)) {
    return {
      success: false,
      reason: `The username ${registrationInfo.username} has been claimed by another user.`,
      userIdString: "",
    };
  }
  if (await userConnect.emailInUse(registrationInfo.contactEmail)) {
    return {
      success: false,
      reason: `The email ${registrationInfo.contactEmail} has been claimed by another user.`,
      userIdString: "",
    };
  }
  if (await userConnect.emailInUse(registrationInfo.orgEmail)) {
    return {
      success: false,
      reason: `The email ${registrationInfo.orgEmail} has been claimed by another user.`,
      userIdString: "",
    };
  }

  // Hash password to store
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(registrationInfo.password, salt);

  // Get user object
  const user = initializeUserObj(
    registrationInfo.firstName,
    registrationInfo.lastName,
    registrationInfo.username,
    hashedPassword,
    registrationInfo.contactEmail.toLowerCase(),
    registrationInfo.orgEmail.toLowerCase()
  );

  // Add to database
  const added = await userConnect.addToCollection(user);
  if (added.success) {
    return {
      success: true,
      reason: "",
      userIdString: added.insertedIdString,
    };
  }
  return {
    success: false,
    reason: "database",
    userIdString: "",
  };
}
userUtil.registerUser = registerUser;

/**
 * Initializes a user object with properties to match the parameters and default
 * null or empty values for homeLocation and followingEvents.
 * @param {} firstName The new user's first name.
 * @param {*} lastName The new user's last name.
 * @param {*} username The new user's username.
 * @param {*} password The new user's password (should be previously hashed).
 * @param {*} contactEmail The new user's contact email.
 * @param {*} orgEmail The new user's organization email.
 * @returns
 */
function initializeUserObj(
  firstName,
  lastName,
  username,
  password,
  contactEmail,
  orgEmail
) {
  const user = {
    firstName: firstName,
    lastName: lastName,
    username: username,
    password: password,
    contactEmail: contactEmail,
    organizationEmails: [orgEmail],
    organizations: [generalUtil.getOrgFromEmail(orgEmail)],
    homeLocation: {},
    followingEvents: [],
    likedEvents: [],
    rsvpYesEvents: [],
    rsvpMaybeEvents: [],
    rsvpNoEvents: [],
  };
  return user;
}

export default userUtil;
