/** By Ilana-Mahmea */

/*
 * Note for TAs: This file contains some functions not currently used by the app.
 * Those functions are included because I anticipate the need for them in future versions of the app.
 */

import * as mongodb from "mongodb";
// Since this is imported before .env is configured, can't do .env uri || local uri here
let uri = "mongodb://localhost:27017";

const userConnect = {}; // To export default

const databaseName = "be-here-db";
userConnect.databaseName = databaseName;
const usersCollectionName = "users";
userConnect.collectionName = usersCollectionName;

export function initializeURI() {
  uri = process.env.MONGO_URI || "mongodb://localhost:27017";
}
userConnect.initializeURI = initializeURI;

// Generic functions

/**
 * Adds the parameter object to the users collection.
 * @param {!Object} objToAdd User object to add to the users collection.
 * @returns {Object:
 *     {success: boolean, message: string, insertedIdString: string, ?err: Error}}
 *     Object indicating the success of the operation and containing the string
 *     version of the inserted object's MongoDB ObjectId.
 */
export async function addToCollection(objToAdd) {
  const client = new mongodb.MongoClient(uri);
  if (!objToAdd) {
    return {
      success: false,
      message: "Cannot add null object to collection.",
      insertedIdString: "",
      err: null,
    };
  }
  try {
    await client.connect();
    const database = client.db(databaseName);
    const collection = database.collection(usersCollectionName);
    const res = await collection.insertOne(objToAdd);
    if (res.acknowledged) {
      return {
        success: true,
        message: "Successfully added user.",
        insertedIdString: res.insertedId.toString(),
        err: null,
      };
    }
    return {
      success: false,
      message:
        "Could not add user. Database did not acknowledge insert request.",
      insertedIdString: "",
      err: null,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: "An error occurred while trying to insert the user object.",
      insertedIdString: "",
      err: e,
    };
  } finally {
    await client.close();
  }
}
userConnect.addToCollection = addToCollection;

/**
 * Finds the first user document that matches the parameter query object.
 * @param {!Object} query Valid MongDB query.
 * @returns {Object:
 *     {success: boolean, message: string, ?user: Object, ?err: Error}}
 *     Object indicating the success of the operation and containing the retrieved object.
 *     success is true if the search was executed successfully, even if no user was found.
 */
export async function findOne(queryObj) {
  const client = new mongodb.MongoClient(uri);
  if (!(queryObj instanceof Object)) {
    return {
      success: false,
      message: "Query must be an object.",
      user: null,
      err: new TypeError("queryObj must be an Object"),
    };
  }
  try {
    await client.connect();
    const database = client.db(databaseName);
    const collection = database.collection(usersCollectionName);
    // Eslint thinks this is a deprecated call with callback,
    // but it's a call with a query object.
    const res = await collection.findOne(queryObj);
    if (res) {
      res._id = res._id.toString();
      return {
        success: true,
        message: "Found user.",
        user: res,
        err: null,
      };
    }
    return {
      success: true, // True because successfully searched
      message: "Could not find user.",
      user: null,
      err: null,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: "An error occurred while trying to find user.",
      user: null,
      err: e,
    };
  } finally {
    await client.close();
  }
}
userConnect.findOne = findOne;

/**
 * Finds all user documents that matche the parameter query object.
 * @param {!Object} query Valid MongDB query.
 * @returns {Object:
 *     {success: boolean, message: string, users: [Object], ?err: Error}}
 *     Object indicating the success of the operation and containing an array of
 *     the retrieved object.
 */
export async function findMany(queryObj) {
  const client = new mongodb.MongoClient(uri);
  if (!(queryObj instanceof Object)) {
    return {
      success: false,
      message: "Query must be an object.",
      users: [],
      err: new TypeError("queryObj must be an Object"),
    };
  }
  try {
    await client.connect();
    const database = client.db(databaseName);
    const collection = database.collection(usersCollectionName);
    // Eslint thinks this is a deprecated call with callback,
    // but it's a call with a query object.
    const res = await collection.find(queryObj).toArray();
    if (res) {
      res.forEach((user) => {
        user._id = user._id.toString();
      });
      return {
        success: true,
        message: "Found users.",
        users: res,
        err: null,
      };
    }
    return {
      success: false,
      message: "No users matched the query.",
      users: [],
      err: null,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: "An error occurred while trying to find users.",
      users: [],
      err: e,
    };
  } finally {
    await client.close();
  }
}
userConnect.findMany = findMany;

/**
 * Returns preview objects for each user that matches the given query.
 * @param {Object} queryObj Query object to match users to (e.g. {rsvpYesEvents: eventIdString})
 */
export async function getUserPreviews(queryObj) {
  const client = new mongodb.MongoClient(uri);
  if (!(queryObj instanceof Object)) {
    return {
      success: false,
      message: "Query must be an object.",
      users: [],
      err: new TypeError("queryObj must be an Object"),
    };
  }
  try {
    await client.connect();
    const database = client.db(databaseName);
    const collection = database.collection(usersCollectionName);
    const res = await collection
      .find(queryObj, {
        projection: { username: 1, firstName: 1, lastName: 1 },
      })
      .sort({ username: 1 })
      .toArray();
    if (res) {
      res.forEach((user) => {
        user._id = user._id.toString();
      });
      return {
        success: true,
        message: "Found users.",
        users: res,
        err: null,
      };
    }
    return {
      success: false,
      message: "No users matched the query.",
      users: [],
      err: null,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: "An error occurred while trying to find users.",
      users: [],
      err: e,
    };
  } finally {
    await client.close();
  }
}
userConnect.getUserPreviews = getUserPreviews;

/**
 * Updates the first user document that matches the parameter query object.
 * @param {!Object} queryObj Valid MongDB query.
 * @param {!Object} updatesObj Valid MongDB update object,
 *     for example {$set: {username: "example"}},
 * @returns {Object:
 *     {success: boolean, updatedCount: number, message: string, ?err: Error}}
 *     Object indicating the success of the operation.
 */
export async function updateOne(queryObj, updatesObj) {
  const client = new mongodb.MongoClient(uri);
  if (!(queryObj instanceof Object)) {
    return {
      success: false,
      updatedCount: 0,
      message: "Query must be an object.",
      err: new TypeError("queryObj must be an Object"),
    };
  }
  if (!(updatesObj instanceof Object)) {
    return {
      success: false,
      updatedCount: 0,
      message: "Updates object must be an object.",
      err: new TypeError("updatesObj must be an Object"),
    };
  }
  try {
    await client.connect();
    const database = client.db(databaseName);
    const collection = database.collection(usersCollectionName);

    const res = await collection.updateOne(queryObj, updatesObj);

    if (res.acknowledged) {
      return {
        success: true,
        updatedCount: res.modifiedCount,
        message: "Successfully updated user.",
        err: null,
      };
    }
    return {
      success: false,
      updatedCount: 0,
      message: "Request not acknowledged.",
      err: null,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      updatedCount: 0,
      msg: "Error updating user.",
      err: e,
    };
  } finally {
    await client.close();
  }
}
userConnect.updateOne = updateOne;

/**
 * Updates the all user documents that matche the parameter query object.
 * @param {!Object} queryObj Valid MongDB query.
 * @param {!Object} updatesObj Valid MongDB update object,
 *     for example {$set: {organization: "example"}},
 * @returns {Object: {success: boolean, message: string, updatedCount: number, ?err: Error}}
 *     Object indicating the success of the operation.
 */
export async function updateMany(queryObj, updatesObj) {
  const client = new mongodb.MongoClient(uri);
  if (!(queryObj instanceof Object)) {
    return {
      success: false,
      message: "Query must be an object.",
      updatedCount: 0,
      err: new TypeError("queryObj must be an Object"),
    };
  }
  if (!(updatesObj instanceof Object)) {
    return {
      success: false,
      message: "Updates object must be an object.",
      updatedCount: 0,
      err: new TypeError("updatesObj must be an Object"),
    };
  }
  try {
    await client.connect();
    const database = client.db(databaseName);
    const collection = database.collection(usersCollectionName);

    const res = await collection.updateMany(queryObj, updatesObj);

    if (res.acknowledged && res.modifiedCount) {
      return {
        success: true,
        message: "Successfully updated users.",
        updatedCount: res.modifiedCount,
        err: null,
      };
    }
    return {
      success: false,
      message: "Could not update users.",
      updatedCount: 0,
      err: null,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      msg: "Error updating users.",
      updatedCount: 0,
      err: e,
    };
  } finally {
    await client.close();
  }
}
userConnect.updateMany = updateMany;

/**
 * Pushes the given eventIdString to the specified user docement's `likedEvents`,
 * `rsvpYesEvents`, `rsvpMaybeEvents`, `rsvpNoEvents`, array.
 * @param {string} userIdString String version of the _id of the document to update.
 * @param {Object} pushCommand Object indicating the array to push to and the item to push, eg {likedEvents: eventIdString}
 * @returns {Object: {success: boolean, message: string, updatedCount: number, ?err: Error}} Object indicating
 *     the success of the operation.
 */
export async function pushToArray(userIdString, pushCommand) {
  let idObj;
  try {
    idObj = convertStringToObjectId(userIdString);
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: "Error creating ObjectId from parameter idString.",
      userIdString: userIdString,
      err: e,
    };
  }
  const res = await updateOne({ _id: idObj }, { $push: pushCommand });
  res.userIdString = userIdString;
  return res;
}
userConnect.pushToArray = pushToArray;

/**
 * Removes the specified event from the specified user docement's "following" array.
 * @param {string} userIdString String version of the _id of the document to update.
 * @param {Object} pullCommand Object indicating the array to push to and the item to pull, eg {likedEvents: eventIdString}
 * @returns {Object: {success: boolean, message: string, updatedCount: number, ?err: Error}} Object indicating
 *     the success of the operation.
 */
export async function pullFromArray(userIdString, pullCommand) {
  if (typeof userIdString !== "string") {
    return {
      success: false,
      message: "userIdString must be a string.",
      userIdString: userIdString,
      err: null,
    };
  }
  let idObj;
  try {
    idObj = convertStringToObjectId(userIdString);
  } catch (e) {
    return {
      success: false,
      message: "Error creating ObjectId from parameter idString.",
      userIdString: userIdString,
      err: e,
    };
  }
  const res = await updateOne({ _id: idObj }, { $pull: pullCommand });
  res.userIdString = userIdString;
  return res;
}
userConnect.pullFromArray = pullFromArray;

// Specific functions

/**
 * Replaces the first user document that matches the parameter id with the new object.
 * @param {string} idString String version of the _id of the document to delete.
 * @param {!Object} newObj User object to replace the matched document with.
 * @returns {Object: {success: boolean, message: string, userIdString: string, ?err: Error}} Object indicating
 *     the success of the operation.
 */
export async function replaceById(idString, newObj) {
  const client = new mongodb.MongoClient(uri);
  if (!(newObj instanceof Object)) {
    return {
      success: false,
      message: "newObj must be an object.",
      userIdString: idString,
      err: new TypeError("newObj must be an Object"),
    };
  }
  let idObj;
  try {
    idObj = convertStringToObjectId(idString);
  } catch (e) {
    return {
      success: false,
      message: "Error creating ObjectId from parameter idString.",
      userIdString: idString,
      err: e,
    };
  }
  try {
    await client.connect();
    const database = client.db(databaseName);
    const collection = database.collection(usersCollectionName);
    const res = await collection.replaceOne({ _id: idObj }, newObj);
    if (res.acknowledged) {
      if (res.deletedCount) {
        return {
          success: true,
          message: "Successfully replaced user.",
          userIdString: idString,
          err: null,
        };
      } else {
        return {
          success: false,
          message: "Could not find user to replace",
          userIdString: idString,
          err: null,
        };
      }
    }
    return {
      success: false,
      message: "Could not replace user. Replace request not acknowled.",
      userIdString: idString,
      err: null,
    };
  } catch (e) {
    return {
      success: false,
      message: "Could not replace user. An error occurred.",
      userIdString: idString,
      err: e,
    };
  } finally {
    await client.close();
  }
}
userConnect.replaceById = replaceById;

// Specific functions -- find

/**
 * Deletes the document in the users collection with the _id that matches the parameter idString.
 * @param {string} idString String version of the _id of the document to delete.
 * @returns {Object:
 *     {success: boolean, message: string, userIdString: string, ?err: Error}}
 *     Object indicating the success of the operation and containing the parameter
 *     idString.
 */
export async function deleteByIdString(idString) {
  const client = new mongodb.MongoClient(uri);
  let idObj;
  try {
    idObj = convertStringToObjectId(idString);
  } catch (e) {
    return {
      success: false,
      message: "Error creating ObjectId from parameter idString.",
      userIdString: idString,
      err: e,
    };
  }
  try {
    await client.connect();
    const database = client.db(databaseName);
    const collection = database.collection(usersCollectionName);
    const res = await collection.deleteOne({ _id: idObj });
    if (res.acknowledged) {
      if (res.deletedCount) {
        return {
          success: true,
          message: "Successfully deleted user.",
          userIdString: idString,
          err: null,
        };
      } else {
        return {
          success: false,
          message: "Could not find user to delete",
          userIdString: idString,
          err: null,
        };
      }
    }
    return {
      success: false,
      message: "Could not deleted user. Delete request not acknowled.",
      userIdString: idString,
      err: null,
    };
  } catch (e) {
    return {
      success: false,
      message: "Could not deleted user. An error occurred.",
      userIdString: idString,
      err: e,
    };
  } finally {
    await client.close();
  }
}
userConnect.deleteByIdString = deleteByIdString;

/**
 * Finds the first user document with the _id that matches the parameter id string.
 * @param {string} idString String version of the _id of the document to delete.
 * @returns {Object:
 *     {success: boolean, message: string, userIdString: string, ?user: Object, ?err: Error}}
 *     Object indicating the success of the operation and containing the retrieved object
 *     and the parameter id string.
 */
export async function getUserById(idString) {
  let idObj;
  try {
    idObj = convertStringToObjectId(idString);
  } catch (e) {
    return {
      success: false,
      message: "Error creating ObjectId from parameter idString.",
      userIdString: idString,
      user: null,
      err: e,
    };
  }
  const res = await findOne({ _id: idObj });
  res.userIdString = idString;
  return res;
}
userConnect.getUserById = getUserById;

/**
 * Finds the first user document with the specified username.
 * @param {string} username The username to match.
 * @returns {Object:
 *     {success: boolean, message: string, ?user: Object, ?err: Error}}
 *     Object indicating the success of the operation and containing the retrieved object.
 */
export async function getUserByUsername(username) {
  if (typeof username !== "string") {
    return {
      success: false,
      message: "username must be a string",
      user: null,
      err: new TypeError(`username must be a string, not a ${typeof username}`),
    };
  }
  return await findOne({ username: username });
}
userConnect.getUserByUsername = getUserByUsername;

/**
 * Finds the first user document with the specified contact email (contactEmail).
 * @param {string} contactEmail The email to match.
 * @returns {Object:
 *     {success: boolean, message: string, ?user: Object, ?err: Error}}
 *     Object indicating the success of the operation and containing the retrieved object.
 */
export async function getUserByContactEmail(contactEmail) {
  if (typeof contactEmail !== "string") {
    return {
      success: false,
      message: "contactEmail must be a string",
      user: null,
      err: new TypeError(
        `contactEmail must be a string, not a ${typeof contactEmail}`
      ),
    };
  }
  return await findOne({ contactEmail: contactEmail });
}
userConnect.getUserByContactEmail = getUserByContactEmail;

/**
 * Finds the first user document with the specified organization email (orgEmail) in their
 * organizationEmails array.
 * @param {string} orgEmail The email to match.
 * @returns {Object:
 *     {success: boolean, message: string, ?user: Object, ?err: Error}}
 *     Object indicating the success of the operation and containing the retrieved object.
 */
export async function getUserByOrgEmail(orgEmail) {
  if (typeof orgEmail !== "string") {
    return {
      success: false,
      message: "orgEmail must be a string",
      user: null,
      err: new TypeError(`orgEmail must be a string, not a ${typeof orgEmail}`),
    };
  }
  return await findOne({ organizationEmails: orgEmail });
}
userConnect.getUserByOrgEmail = getUserByOrgEmail;

/**
 * Finds the user documents with all the specified organizations in their organizations array.
 * @param {Array<string>} organizations The organizations to match.
 * @returns {Object:
 *     {success: boolean, message: string, users: Array<Object>, ?err: Error}}
 *     Object indicating the success of the operation and containing the retrieved objects.
 */
export async function getUsersByOrganizations(organizations) {
  if (!(organizations instanceof Array)) {
    return {
      success: false,
      message: "organizations must be an array of strings",
      users: [],
      err: new TypeError(
        `organizations must be an array, not a ${typeof organizations}`
      ),
    };
  }
  for (let s of organizations) {
    if (typeof s !== "string") {
      return {
        success: false,
        message: "All values in the organizations array must be strings",
        users: [],
        err: new TypeError(
          `All values in the organizations array must be strings. ${s} is a ${typeof s}.`
        ),
      };
    }
  }
  return await findMany({ organizations: { $all: organizations } });
}
userConnect.getUsersByOrganizations = getUsersByOrganizations;

/**
 * Gets the user previews for the users with the specified eventIdString in their likedEvents, rsvpYesEvents,
 * rsvpNoEvents, or rsvpMaybeEvents arrays.
 * @param {string} eventIdString String representation of the objectId of the event to find in the users
 *     rsvp or like arrays.
 * @returns {Object:
 *     {success: boolean,
 *      likeUsers: Array<Object>, likeMessage: string,
 *      yesUsers: Array<Object>, yesMessage: string,
 *      maybeUsers: Array<Object>, maybeMessage: string,
 *      noUsers: Array<Object>, noMessage: string,
 *      err: Object: {
 *       likeErr: Error,
 *       yesErr: Error,
 *       maybeErr: Error,
 *       noErr: Error,
 *       }
 *     }}
 *     Object indicating the success of the operation and containing the retrieved objects.
 *     See getUserPreviews for the shape of the objects returned in the users arrays.
 */
// export async function getRsvpLikeUserPreviews(eventIdString) {
//   if (typeof eventIdString !== "string") {
//     return {
//       success: false,
//       message: "eventIdString must be a string",
//       user: null,
//       err: new TypeError(
//         `eventIdString must be a string, not a ${typeof eventIdString}`
//       ),
//     };
//   }
//   const likeRes = await getUserPreviews({ likedEvents: eventIdString });
//   const yesRes = await getUserPreviews({ rsvpYesEvents: eventIdString });
//   const maybeRes = await getUserPreviews({ rsvpMaybeEvents: eventIdString });
//   const noRes = await getUserPreviews({ rsvpNoEvents: eventIdString });
//   const res = { err: {}, success: true };
//   if (likeRes.success) {
//     res.likeUsers = likeRes.users;
//   } else {
//     res.likeMessage = likeRes.message;
//     res.err.likeErr = likeRes.err;
//     res.success = false;
//   }
//   if (yesRes.success) {
//     res.yesUsers = yesRes.users;
//   } else {
//     res.yesMessage = yesRes.message;
//     res.err.yesErr = yesRes.err;
//     res.success = false;
//   }
//   if (maybeRes.success) {
//     res.maybeUsers = maybeRes.users;
//   } else {
//     res.maybeMessage = maybeRes.message;
//     res.err.maybeErr = maybeRes.err;
//     res.success = false;
//   }
//   if (noRes.success) {
//     res.noUsers = noRes.users;
//   } else {
//     res.noMessage = noRes.message;
//     res.err.noErr = noRes.err;
//     res.success = false;
//   }
//   return res;
// }
// userConnect.getRsvpLikeUserPreviews = getRsvpLikeUserPreviews;
export async function getRsvpLikeUserPreviews(userIds) {
  // TODO: validation
  // TODO: try-catch
  const query = { $or: userIds.map((id) => ({ _id: mongodb.ObjectId(id) })) };
  const res = await getUserPreviews(query);
  if (res.success) {
    return res;
  }
}
userConnect.getRsvpLikeUserPreviews = getRsvpLikeUserPreviews;

// Specific functions -- update

/**
 * Updates the user document with the id that matches the parameter userIdString.
 * @param {string} userIdString String version of the _id of the document to update.
 * @param {!Object} updatesObj Valid MongDB update object,
 *     for example {$set: {username: "example"}},
 * @returns {Object:
 *     {success: boolean, updatedCount: number, message: string, ?err: Error}}
 *     Object indicating the success of the operation.
 */
export async function updateById(userIdString, updatesObj) {
  const client = new mongodb.MongoClient(uri);
  let idObj;
  try {
    idObj = convertStringToObjectId(userIdString);
  } catch (e) {
    return {
      success: false,
      message: "Error creating ObjectId from parameter idString.",
      userIdString: userIdString,
      err: e,
    };
  }
  if (!(updatesObj instanceof Object)) {
    return {
      success: false,
      updatedCount: 0,
      message: "Updates object must be an object.",
      err: new TypeError("updatesObj must be an Object"),
    };
  }
  try {
    await client.connect();
    const database = client.db(databaseName);
    const collection = database.collection(usersCollectionName);

    const res = await collection.updateOne({ _id: idObj }, updatesObj);

    if (res.acknowledged) {
      if (res.updatedCount) {
        return {
          success: true,
          updatedCount: 1,
          message: "Successfully updated user.",
          err: null,
        };
      } else if (res.matchedCount) {
        return {
          success: true,
          updatedCount: 0,
          message: "User not updated.",
          err: null,
        };
      } else {
        return {
          success: false,
          updatedCount: 0,
          message: "User not found.",
          err: null,
        };
      }
    }
    return {
      success: false,
      updatedCount: 0,
      message: "Request not acknowledged.",
      err: null,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      updatedCount: 0,
      msg: "Error updating user.",
      err: e,
    };
  } finally {
    await client.close();
  }
}
userConnect.updateById = updateById;

/**
 * Updates the user document with the id that matches the parameter userIdString.
 * @param {string} userIdString String version of the _id of the document to update.
 * @param {!Object} updatesObj Valid MongDB update object,
 *     for example {$set: {username: "example"}},
 * @returns {Object:
 *     {success: boolean, ?updatedDocument: object, message: string, ?err: Error}}
 *     Object indicating the success of the operation and containing the updated document.
 */
export async function updateAndGetUpdatedById(userIdString, updatesObj) {
  const client = new mongodb.MongoClient(uri);
  let idObj;
  try {
    idObj = convertStringToObjectId(userIdString);
  } catch (e) {
    return {
      success: false,
      message: "Error creating ObjectId from parameter idString.",
      userIdString: userIdString,
      err: e,
    };
  }
  if (!(updatesObj instanceof Object)) {
    return {
      success: false,
      updatedCount: 0,
      message: "Updates object must be an object.",
      err: new TypeError("updatesObj must be an Object"),
    };
  }
  try {
    await client.connect();
    const database = client.db(databaseName);
    const collection = database.collection(usersCollectionName);

    const res = await collection.findOneAndUpdate({ _id: idObj }, updatesObj, {
      returnDocument: "after",
    });

    if (res.ok === 1) {
      return {
        success: true,
        updatedDocument: res.value,
        message: "Successfully updated user.",
        err: null,
      };
    } else {
      return {
        success: false,
        updatedDocument: null,
        message: "User not found.",
        err: null,
      };
    }
  } catch (e) {
    console.error(e);
    return {
      success: false,
      updatedDocument: null,
      msg: "Error updating user.",
      err: e,
    };
  } finally {
    await client.close();
  }
}
userConnect.updateAndGetUpdatedById = updateAndGetUpdatedById;

/**
 * Pushes the given eventRSVP object to the specified user docement's "following" array.
 * @param {string} userIdString String version of the _id of the document to update.
 * @param {Object} eventRSVP The eventRSVP object to push to the following array.
 * @returns {Object: {success: boolean, message: string, userIdString: string, ?err: Error}} Object indicating
 *     the success of the operation.
 */
export async function addEventToFollowing(userIdString, eventRSVP) {
  let idObj;
  try {
    idObj = convertStringToObjectId(userIdString);
  } catch (e) {
    return {
      success: false,
      message: "Error creating ObjectId from parameter idString.",
      userIdString: userIdString,
      err: e,
    };
  }
  if (!(eventRSVP instanceof Object)) {
    return {
      success: false,
      message: "Cannot push an event that is not an object",
      userIdString: userIdString,
      err: new TypeError(
        `eventRSVP must be an Object, not a ${typeof eventRSVP}`
      ),
    };
  }
  const res = await updateOne(
    { _id: idObj },
    { $push: { followingEvents: eventRSVP } }
  );
  res.userIdString = userIdString;
  return res;
}
userConnect.addEventToFollowing = addEventToFollowing;

/**
 * Removes the specified event from the specified user docement's "following" array.
 * @param {string} userIdString String version of the _id of the document to update.
 * @param {string} eventIdString The string version of the event to remove from the following array.
 * @returns {Object: {success: boolean, message: string, userIdString: string, ?err: Error}} Object indicating
 *     the success of the operation.
 */
export async function removeEventFromFollowing(userIdString, eventIdString) {
  if (typeof eventIdString !== "string") {
    return {
      success: false,
      message: "eventIdString must be a string.",
      userIdString: userIdString,
      err: null,
    };
  }
  let idObj;
  try {
    idObj = convertStringToObjectId(userIdString);
  } catch (e) {
    return {
      success: false,
      message: "Error creating ObjectId from parameter idString.",
      userIdString: userIdString,
      err: e,
    };
  }
  const found = await findOne({ _id: idObj });
  if (!found.user) {
    return {
      success: false,
      message: "Could not find specified user",
      userIdString: userIdString,
      err: null,
    };
  }
  const updatedEvents = found.user.followingEvents.filter(
    (event) => event.eventId !== eventIdString
  );
  const res = await updateOne(
    { _id: idObj },
    {
      $set: {
        followingEvents: updatedEvents,
      },
    }
  );
  res.userIdString = userIdString;
  return res;
}
userConnect.removeEventFromFollowing = removeEventFromFollowing;

/**
 * Returns whether or not the parameter username can be found in the users database.
 * @param {boolean} username Username to search for.
 * @returns True if the username appears in any document's username property, false otherwise.
 */
export async function usernameInUse(username) {
  const res = await userConnect.getUserByUsername(username);
  if (res.user) {
    return true;
  }
  return false;
}
userConnect.usernameInUse = usernameInUse;

/**
 * Returns whether or not the parameter email can be found in the users database.
 * @param {boolean} email Email to search for.
 * @returns True if the eamil appears in any document's contactEmail or
 *     organizationEmail propert, false otherwise.
 */
export async function emailInUse(email) {
  const contact = await userConnect.getUserByContactEmail(email);
  const org = await userConnect.getUserByOrgEmail(email);
  if (contact.user || org.user) {
    return true;
  }
  return false;
}
userConnect.emailInUse = emailInUse;

/**
 * Sets the specified user document's specified rsvp array to contain the specified eventIdString, while removing
 * that eventIdString from the user's other rsvp arrays. For example, if the user had prevously RSVPed "Yes" and
 * now RSVPs "Maybe", the result is that the eventIdString is removed from the rsvpYesEvents array and added to the
 * rsvpMaybeEvents array.
 * @param {string} userIdString String version of the _id of the document to update.
 * @param {string} eventIdString String version of the _id of the event to add.
 * @param {string} commandTypeString Rsvp type to add. One of "Yes", "Maybe", or "No".
 * @returns {Object: {success: boolean, message: string, updatedCount: number, ?err: Error}} Object indicating
 *     the success of the operation.
 */
export async function updateRSVP(
  userIdString,
  eventIdString,
  commandTypeString
) {
  // Remove old RSVPs
  await pullFromArray(userIdString, { rsvpYesEvents: eventIdString });
  await pullFromArray(userIdString, { rsvpMaybeEvents: eventIdString });
  await pullFromArray(userIdString, { rsvpNoEvents: eventIdString });
  // Add new one
  let res = {
    success: false,
    message: "Could not update user.",
    updatedCount: 0,
    err: null,
  };
  switch (commandTypeString) {
    case "Yes":
      res = await pushToArray(userIdString, { rsvpYesEvents: eventIdString });
      break;
    case "Maybe":
      res = await pushToArray(userIdString, { rsvpMaybeEvents: eventIdString });
      break;
    case "No":
      res = await pushToArray(userIdString, { rsvpNoEvents: eventIdString });
      break;
    default:
      res = {
        success: false,
        message: `Command parameter ${commandTypeString} is not valid.`,
        updatedCount: 0,
        err: null,
      };
  }
  return res;
}
userConnect.updateRSVP = updateRSVP;

/**
 * Adds the specified eventIdString to the specified user document's likedEvents array if it is not already in there,
 * otherwise removed the eventIdString from the likedEvents array.
 * @param {string} userIdString String version of the _id of the document to update.
 * @param {string} eventIdString String version of the _id of the event to add.
 * @returns {Object: {success: boolean, message: string, updatedCount: number, ?err: Error}} Object indicating
 *     the success of the operation.
 */
export async function toggleLike(userIdString, eventIdString) {
  const userRes = await getUserById(userIdString);
  if (userRes && userRes.user) {
    let res = {
      success: false,
      message: "Problem trying to toggle user's like.",
      updatedCount: 0,
      err: null,
    };
    if (userRes.user.likedEvents?.includes(eventIdString)) {
      res = await pullFromArray(userIdString, { likedEvents: eventIdString });
      return res;
    } else {
      res = await pushToArray(userIdString, { likedEvents: eventIdString });
      return res;
    }
  } else {
    return {
      success: false,
      message: "Could not find user.",
      updatedCount: 0,
      err: null,
    };
  }
}
userConnect.toggleLike = toggleLike;

// Helpers

/**
 * Converts a string to a MongoDB ObjectId object.
 * @param {string} idString A 24 character hexadecimal string value for the ObjectId.
 * @returns {mongodb.ObjectId} A MongoDB ObjectId object from the parameter string.
 * @throws {Error} If idString is null or if the idString is otherwise invalid.
 */
function convertStringToObjectId(idString) {
  if (!idString) {
    throw new TypeError("idString must not be null or empty.");
  }
  try {
    return new mongodb.ObjectId(idString);
  } catch (e) {
    if (e instanceof TypeError) {
      // BSONTypeError extends TypeError
      throw new TypeError(
        `idString ${idString} is not a valid ObjectId parameter ${e.message}`
      );
    } else {
      throw e;
    }
  }
}

export default userConnect;
