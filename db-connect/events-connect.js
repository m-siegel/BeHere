// Created by Tim Crawley

import { MongoClient, ObjectId } from "mongodb";
let uri = process.env.URI || "mongodb://localhost:27017";

const dbName = "be-here-db";
const eventsCol = "events";

const eventsConnect = {};
eventsConnect.dbName = dbName;
eventsConnect.eventsCol = "events";
eventsConnect.uri = uri;

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
          name: eventObj.name,
          description: eventObj.description,
          location: eventObj.location,
          start: eventObj.start,
          finish: eventObj.finish,
          tags: eventObj.tags,
        },
      }
    );
    if (res.acknowledged && res.matchedCount) {
      return {
        success: true,
        msg: "Event updated successfully.",
        err: null,
      };
    }
    return {
      success: false,
      msg: "Unable to update event.",
      err: null,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      msg: "An error has occured. Please try again later.",
      err: e,
    };
  } finally {
    client.close();
  }
}
eventsConnect.updateEvent = updateEvent;

/**
 * Returns previews of all of the events that match the query.
 * @param {object} queryObj A valid mongodb find object, for example,
 *                          { $and: [ { organization: "rohan.gov" },
 *                          { $or: [ { <category1>: { $regex: <searchTerm>, $options: "i" } },
 *                              { <category2>: { $regex: <searchTerm>, $options: "i" } }] } ]}
 * @param {number} skip The number of matching documents to skip before the first one returned. Should be a positive integer.
 * @param {number} limit The number of matching documents to return. If limit is 0, returns all of them. Should be a positive integer.
 * @returns {object} { success: Boolean,
 *                     msg: a string explaining the operation outcome,
 *                     events: An array of event objects, or null
 *                     err: null, or the error that was caught
 *                     }
 */
export async function getEventPreviews(queryObj, skip, limit) {
  // Need to validate params
  // Mea updated
  skip = skip ? Math.max(Math.floor(skip), 0) : 0;
  limit = limit ? Math.max(Math.floor(limit), 0) : 0;
  // create date/time variable to use within db call query
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(eventsCol);
    const res = await collection
      .find(queryObj, {
        projection: {
          _id: 1,
          name: 1,
          organization: 1,
          creator: 1,
          tags: 1,
          location: 1,
          start: 1,
          followedBy: 1,
          rsvps: 1,
          likes: 1,
        },
      })
      .sort({
        start: 1,
        finish: 1,
        creator: 1,
      })
      .skip(skip)
      .limit(limit);
    if (res) {
      const arr = await res.toArray();
      arr.forEach((obj) => {
        // obj.start = obj.start.substr(0, 16);
        // obj.finish = obj.start.substr(0, 16);
        obj.start = new Date(obj.start).toLocaleDateString("en-us", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
        obj.finish = new Date(obj.finish).toLocaleDateString("en-us", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      });
      return {
        success: true,
        msg: "Events found.",
        events: arr,
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
      msg: "An error occurred in the database. Please try again later.",
      events: null,
      err: e,
    };
  } finally {
    client.close();
  }
}
eventsConnect.getEventPreviews = getEventPreviews;

// Ilana-Mahmea
/**
 * Returns the count of all of the events that match the query.
 * @param {object} queryObj A valid mongodb find object, for example,
 *                          { $and: [ { organization: "rohan.gov" },
 *                          { $or: [ { <category1>: { $regex: <searchTerm>, $options: "i" } },
 *                              { <category2>: { $regex: <searchTerm>, $options: "i" } }] } ]}
 * @returns {object} { success: Boolean,
 *                     msg: a string explaining the operation outcome,
 *                     events: An array of event objects, or null
 *                     err: null, or the error that was caught
 *                     }
 */
export async function getEventCount(queryObj) {
  // Need to validate params
  // create date/time variable to use within db call query
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(eventsCol);
    const res = await collection
      .countDocuments(queryObj);
    return {
      success: true,
      msg: "Successful query.",
      count: res,
      err: null,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      msg: "An error occurred in the database. Please try again later.",
      count: 0,
      err: e,
    };
  } finally {
    client.close();
  }
}
eventsConnect.getEventCount = getEventCount;

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
  const client = new MongoClient(uri);
  //const userId = new ObjectId(id);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(eventsCol);
    const res = await collection
      .find(
        {
          creator: id,
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
      });
    if (res) {
      const arr = await res.toArray();
      arr.forEach((obj) => {
        obj.start = new Date(obj.start).toLocaleDateString("en-us", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
        obj.finish = new Date(obj.finish).toLocaleDateString("en-us", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      });
      return {
        success: true,
        msg: "Events found.",
        events: arr,
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
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(eventsCol);
    const res = await collection
      .find(
        {
          $or: [
            {
              rsvps: {
                userId: id,
                status: "Yes",
              },
            },
            {
              rsvps: {
                userId: id,
                status: "Maybe",
              },
            },
          ],
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
      });
    if (res) {
      const arr = await res.toArray();
      arr.forEach((obj) => {
        obj.start = new Date(obj.start).toLocaleDateString("en-us", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
        obj.finish = new Date(obj.finish).toLocaleDateString("en-us", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      });
      return {
        success: true,
        msg: "Events found.",
        events: arr,
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
    res.start = res.start.substr(0, 16);
    res.finish = res.finish.substr(0, 16);
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

export async function eventRsvp(user, event, rsvpStatus) {
  const client = new MongoClient(uri);
  const eventId = new ObjectId(event._id);
  const userId = user._id;
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(eventsCol);
    const removeRsvp = await collection.updateOne(
      { _id: eventId },
      {
        $pull: {
          rsvps: {
            userId: userId,
          },
        },
      }
    );
    let addRsvp;
    if (removeRsvp.matchedCount === 1 && rsvpStatus) {
      addRsvp = await collection.updateOne(
        { _id: eventId },
        {
          $addToSet: {
            rsvps: {
              userId: userId,
              status: rsvpStatus,
            },
          },
        }
      );
    } else if (removeRsvp.matchedCount === 1) {
      return {
        success: true,
        msg: "RSVP removed successfully.",
        err: null,
      };
    } else {
      console.log(removeRsvp);
      return {
        success: false,
        msg: "Cannot find event... please try later.",
        err: null,
      };
    }

    if (addRsvp && addRsvp.modifiedCount === 1) {
      return {
        success: true,
        msg: "RSVP updated successfully.",
        err: null,
      };
    } else {
      return {
        success: false,
        msg: "RSVP wasn't able to update... please try later.",
        err: null,
      };
    }
  } catch (e) {
    console.error(e);
    return {
      success: false,
      msg: "An error has occured. Please try again later.",
      err: e,
    };
  } finally {
    client.close();
  }
}
eventsConnect.eventRsvp = eventRsvp;

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
          success: true,
          msg: "You've removed this like successfully.",
          err: null,
        };
      }
      return {
        success: false,
        msg: "An error has prevented you from unliking this event.",
        err: null,
      };
    }
    const updateRes = await collection.updateOne(query, addLikeInfo);
    if (updateRes.acknowledged && updateRes.matchedCount) {
      return {
        success: true,
        msg: "You've added this like successfully.",
        err: null,
      };
    }
    return {
      success: false,
      msg: "An error has prevented you from liking this event.",
      err: null,
    };
  } catch (e) {
    console.error("Error: ", e);
    return { status: false, error: e };
  }
}
eventsConnect.toggleLike = toggleLike;

export default eventsConnect;
