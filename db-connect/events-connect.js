// Created by Tim Crawley

import { MongoClient, ObjectId } from "mongodb";
let uri = process.env.URI || "mongodb://localhost:27017";

const dbName = "be-here-db";
const eventsCol = "events";

const eventsConnect = {};
eventsConnect.dbName = dbName;
eventsConnect.eventsCol = "events";
eventsConnect.uri = uri; // TODO: I'm not sure we should do this

export function initializeURI() {
  uri = process.env.MONGO_URI || "mongodb://localhost:27017";
}
eventsConnect.initializeURI = initializeURI;

/**
 * Adds the given event object to the events collection
 * @param {object} eventObj     An event object.
 * @returns {object}     {success: boolean
 *                        msg: string explaining the operation outcome
 *                        insertedId: the string representation of the event ID, or null
 *                        err: null, or the error that was caught}
 */
export async function addEvent(eventObj) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(eventsCol);
    const res = await collection.insertOne(eventObj);
    if (res.acknowledged) {
      return {
        success: true,
        msg: "Successfully created event",
        insertedId: res.insertedId.toString(),
        err: null,
      };
    }
    return {
      success: false,
      msg: "Could not add event. Please try again later",
      insertedId: null,
      err: null,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      msg: "An error occured while creating the event",
      insertedId: null,
      err: e,
    };
  } finally {
    client.close();
  }
}
eventsConnect.addEvent = addEvent;

/**
 * Deletes an event from the events collection
 * @param {string} eventId      The ID of the event to be deleted
 * @returns {object}        {success: boolean,
 *                           msg: a string explaining the operation outcome,
 *                           err: null, or the error that was caught
 *                           }
 */
export async function deleteEvent(eventIdString) {
  const eventId = new ObjectId(eventIdString);
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(eventsCol);
    const res = await collection.deleteOne({ _id: eventId });
    if (res.acknowledged) {
      return {
        success: true,
        msg: "Successfully deleted event",
        err: null,
      };
    }
    return {
      success: false,
      msg: "Could not delete event. Please try again later",
      err: null,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      msg: "An error occured while deleting the event",
      err: e,
    };
  } finally {
    client.close();
  }
}
eventsConnect.deleteEvent = deleteEvent;

/**
 * Updates an existing event.
 * @param {object} eventObj     The event object.
 * @returns {object}        { success: Boolean,
 *                            msg: a string explaining the operation outcome,
 *                            event: An event object, or null
 *                            err: null, or the error that was caught
 *                            }
 */
export async function updateEvent(eventObj) {
  const client = new MongoClient(uri);
  const id = new ObjectId(eventObj._id);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(eventsCol);
    const res = await collection.updateOne(
      { _id: id },
      {
        $set: {
          // TODO -- discuss what will be passed into eventObj -- what about time?
          // name, description, tags, (date/time/place)?
          name: eventObj.name,
          description: eventObj.description,
          tags: eventObj.tags,
        },
      }
    );
    if (res.acknowledged && res.matchedCount) {
      return {
        // TODO -- discuss what will be passed back
        success: true,
        msg: "Event updated successfully.",
        // anything else?
        err: null,
      };
    }
    return {
      // TODO -- discuss what will be passed back
      success: false,
      msg: "Unable to update event.",
      // anything else?
      err: null,
    };
  } catch (e) {
    console.error(e);
    return {
      // TODO -- discuss what will be passed back
      success: false,
      msg: "An error has occured. Please try again later.",
      // anything else?
      err: e,
    };
  } finally {
    client.close();
  }
}
eventsConnect.updateEvent = updateEvent;

/**
 * Returns all of the events in the org (for event previews).
 * @param {string} organization      The name of the organization.
 * @returns {object}        { success: Boolean,
 *                            msg: a string explaining the operation outcome,
 *                            events: An array of event objects, or null
 *                            err: null, or the error that was caught
 *                            }
 */
// Event previews -- need eventId, name, organization, creator, tags, location/time
export async function getEventPreviews(organization) {
  // create date/time variable to use within db call query
  // const timeNow = new Date().get
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(eventsCol);
    const res = await collection
      .find(
        {
          organization: organization,
          //start: { $gte: /* today's variable */}
        },
        {
          projection: {
            _id: 1,
            name: 1,
            organization: 1,
            creator: 1,
            tags: 1,
            location: 1,
            start: 1,
            followedBy: 1,
            rsvpYes: 1,
            rsvpMaybe: 1,
            rsvpNo: 1,
            likes: 1,
          },
        }
      )
      .sort({
        start: 1,
      });
    if (res) {
      return {
        success: true,
        msg: "Events found.",
        events: await res.toArray(),
        err: null,
      };
    }
    return {
      success: false,
      msg: "No events found.",
      events: null,
      err: null,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      msg: "An error occurred. Please try again later.",
      events: null,
      err: e,
    };
  } finally {
    client.close();
  }
}
eventsConnect.getEventPreviews = getEventPreviews;

/**
 * Returns all of the events that the user created.
 * @param {string} id      The ID of the user.
 * @returns {object}        { success: Boolean,
 *                            msg: a string explaining the operation outcome,
 *                            events: An array of event objects, or null
 *                            err: null, or the error that was caught
 *                            }
 */
// Event previews -- need eventId, name, organization, creator, tags, location/time
export async function getUserCreatedEventPreviews(id) {
  // create date/time variable to use within db call query
  // const timeNow = new Date().get
  const client = new MongoClient(uri);
  //const userId = new ObjectId(id);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(eventsCol);
    const res = await collection
      .find(
        {
          // how will we query? by userId or email?
          creator: id,
          //start: { $gte: /* today's variable */}
        },
        {
          _id: 1,
          name: 1,
          organization: 1,
          creator: 1,
          tags: 1,
          location: 1,
          start: 1,
        }
      )
      .sort({
        start: 1,
      })
      .toArray();
    console.log(res);
    if (res) {
      return {
        success: true,
        msg: "Events found.",
        events: res,
        err: null,
      };
    }
    return {
      success: false,
      msg: "You currently haven't created any events.",
      events: null,
      err: null,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      msg: "An error occurred. Please try again later.",
      events: null,
      err: e,
    };
  } finally {
    client.close();
  }
}
eventsConnect.getUserCreatedEventPreviews = getUserCreatedEventPreviews;

/**
 * Returns all of the events a specific user follows.
 * @param {string} _id      The ID of the user.
 * @returns {object}        { success: Boolean,
 *                            msg: a string explaining the operation outcome,
 *                            events: An array of event objects, or null
 *                            err: null, or the error that was caught
 *                            }
 */
export async function getUserFollowedEventPreviews(id) {
  const client = new MongoClient(uri);
  //const userId = new ObjectId(id);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(eventsCol);
    const res = await collection
      .find(
        {
          $or: [{ rsvpYes: id }, { rsvpMaybe: id }],
          //start: { $gte: /* today's variable */}
        },
        {
          _id: 1,
          name: 1,
          organization: 1,
          creator: 1,
          tags: 1,
          location: 1,
          start: 1,
        }
      )
      .sort({
        start: 1,
      })
      .toArray();
    console.log("followed events: ", res);
    if (res) {
      return {
        success: true,
        msg: "Events found.",
        events: res,
        err: null,
      };
    }
    return {
      success: false,
      msg: "You currently don't follow any events.",
      events: null,
      err: null,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      msg: "An error occurred. Please try again later.",
      events: null,
      err: e,
    };
  } finally {
    client.close();
  }
}
eventsConnect.getUserFollowedEventPreviews = getUserFollowedEventPreviews;

/**
 * Returns one event (for expanded view)
 * @param {string} eventId      The ID of one event.
 * @returns {object}        { success: Boolean,
 *                            msg: a string explaining the operation outcome,
 *                            event: An event object, or null
 *                            err: null, or the error that was caught
 *                            }
 */
export async function getOneEvent(eventId) {
  const client = new MongoClient(uri);
  const id = new ObjectId(eventId);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(eventsCol);
    const res = await collection.findOne({ _id: id });
    if (res) {
      return {
        success: true,
        msg: "Event found.",
        event: res,
        err: null,
      };
    }
    return {
      success: false,
      msg: "No events found.",
      event: null,
      err: null,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      msg: "An error occurred. Please try again later.",
      event: null,
      err: e,
    };
  } finally {
    client.close();
  }
}
eventsConnect.getOneEvent = getOneEvent;

/**
 * Sets the event RSVP for a user.
 * @param {object} user     A user object
 * @param {object} event    An event object
 * @param {string} rsvpStatus   An rsvp status for a specific user
 * @returns {object}        {success: boolean,
 *                           msg: a string explaining the operation outcome,
 *                           err: null, or the error that was caught
 *                           }
 */
// TODO: Can this just be the event Id and the user Id to be faster?
// TODO: Can this also do the following list?
export async function eventRsvp(user, event, rsvpStatus) {
  const client = new MongoClient(uri);
  const eventId = new ObjectId(event._id);
  const userId = new ObjectId(user._id);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(eventsCol);
    console.log("calling getRsvp");
    const existingRsvp = await getRsvp(eventId, userId, collection);
    console.log("checking if there is an existing RSVP");
    if (existingRsvp.exists) {
      console.log("existingRsvp exists!: ", existingRsvp);
      if (existingRsvp.value === rsvpStatus) {
        console.log("the rsvp has already been set");
        return {
          success: false,
          msg: `The RSVP has already been set to ${existingRsvp.value}`,
          err: null,
        };
      } else {
        console.log("attempting to remove existing rsvp");
        await removeRsvpFromEvent(
          eventId,
          userId,
          collection,
          existingRsvp.value
        );
        console.log("removed existing rsvp");
      }
    }
    console.log("existingRsvp: ", existingRsvp);
    let res;
    if (rsvpStatus === "Yes") {
      console.log("setting rsvp to 'yes'");
      res = await collection.updateOne(
        { _id: eventId },
        {
          $addToSet: {
            rsvpYes: userId.toString(),
          },
        }
      );
    } else if (rsvpStatus === "Maybe") {
      console.log("setting rsvp to 'maybe'");
      res = await collection.updateOne(
        { _id: eventId },
        {
          $addToSet: {
            rsvpMaybe: userId.toString(),
          },
        }
      );
    } else if (rsvpStatus === "No") {
      console.log("setting rsvp to 'no'");
      res = await collection.updateOne(
        { _id: eventId },
        {
          $addToSet: {
            rsvpNo: userId.toString(),
          },
        }
      );
    } else {
      return {
        success: false,
        msg: "Unable to update - an invalid RSVP value was entered.",
        err: null,
      };
    }
    console.log("res: ", res);
    if (res.acknowledged && res.modifiedCount) {
      return {
        success: true,
        msg: "RSVP updated successfully.",
        err: null,
      };
    }
    return {
      success: false,
      msg: "RSVP was unable to update.",
      err: null,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      msg: "An error has occurred. Please try again later.",
      err: e,
    };
  } finally {
    client.close();
  }
}
eventsConnect.eventRsvp = eventRsvp;

/**
 * Returns am object that describes if a previous RSVP was already set.
 * @param {ObjectId} eventId A MongoDB Object Id of the event
 * @param {ObjectId} userId A MongoDB Object Id of the user
 * @param {object} collection A MongoDB collection object
 * @returns {object} {exists: boolean,
 *                    value: String representation of existing RSVP, or null}
 */
async function getRsvp(eventId, userId, collection) {
  // storing userIds as strings in arrays
  console.log("in getRsvp");
  const rsvpYes = await collection.findOne({
    _id: eventId,
    rsvpYes: userId.toString(),
  });
  const rsvpMaybe = await collection.findOne({
    _id: eventId,
    rsvpMaybe: userId.toString(),
  });
  const rsvpNo = await collection.findOne({
    _id: eventId,
    rsvpNo: userId.toString(),
  });

  if (!rsvpYes && !rsvpMaybe && !rsvpNo) {
    console.log("There isn't an existing rsvp");
    return {
      exists: false,
      value: null,
    };
  } else if (rsvpYes) {
    return {
      exists: true,
      value: "Yes",
    };
  } else if (rsvpMaybe) {
    return {
      exists: true,
      value: "Maybe",
    };
  } else {
    return {
      exists: true,
      value: "No",
    };
  }
}

/**
 * Removes an existing RSVP for a user.
 * @param {ObjectId} eventId
 * @param {ObjectId} userId
 * @param {MongodbCollection} collection
 * @param {string} value
 * @returns void
 */
async function removeRsvpFromEvent(eventId, userId, collection, value) {
  let removeStatus;
  switch (value) {
    case "Yes":
      removeStatus = await collection.updateOne(
        { _id: eventId },
        {
          $pull: {
            rsvpYes: userId.toString(),
          },
        }
      );
      console.log("case Yes remove status: ", removeStatus);
      break;
    case "Maybe":
      removeStatus = await collection.updateOne(
        { _id: eventId },
        {
          $pull: {
            rsvpMaybe: userId.toString(),
          },
        }
      );
      console.log("case Maybe remove status: ", removeStatus);
      break;
    case "No":
      removeStatus = await collection.updateOne(
        { _id: eventId },
        {
          $pull: {
            rsvpNo: userId.toString(),
          },
        }
      );
      console.log("case No remove status: ", removeStatus);
      break;
    default:
      console.log("no status to remove");
  }
  return;
}

// Event previews -- need eventId, name, eventOrgName, creator, tags, location/time
// TODO -- get all events where user is in following list
// TODO -- all events where user is creator
// TODO -- all events for an organization

export async function toggleLike(eventIdString, userIdString) {
  const eventId = new ObjectId(eventIdString);

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(eventsCol);
    const query = { _id: eventId };
    const hasAlreadyLiked = await collection.findOne({
      _id: eventId,
      likes: userIdString,
    });
    const addLikeInfo = { $push: { likes: userIdString } };
    const removeLikeInfo = { $pull: { likes: userIdString } };
    if (hasAlreadyLiked) {
      const updateRes = await collection.updateOne(query, removeLikeInfo);
      if (updateRes.acknowledged && updateRes.matchedCount) {
        return {
          // TODO -- discuss what will be passed back
          success: true,
          msg: "You've removed this like successfully.",
          // anything else?
          err: null,
        };
      }
      return {
        // TODO -- discuss what will be passed back
        success: false,
        msg: "An error has prevented you from unliking this event.",
        // anything else?
        err: null,
      };
    }
    const updateRes = await collection.updateOne(query, addLikeInfo);
    console.log("updateRes: ", updateRes);
    if (updateRes.acknowledged && updateRes.matchedCount) {
      return {
        // TODO -- discuss what will be passed back
        success: true,
        msg: "You've added this like successfully.",
        // anything else?
        err: null,
      };
    }
    return {
      // TODO -- discuss what will be passed back
      success: false,
      msg: "An error has prevented you from liking this event.",
      // anything else?
      err: null,
    };
  } catch (e) {
    console.error("Error: ", e);
    return { status: false, error: e };
  }
}
eventsConnect.toggleLike = toggleLike;

export default eventsConnect;
