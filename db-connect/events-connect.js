// Created by Tim Crawley

import { MongoClient, ObjectId } from "mongodb";
const uri = process.env.URI || "mongodb://localhost:27017";
const dbName = "be-here-db";
const eventsCol = "events";

const eventsConnect = {};
eventsConnect.dbName = dbName;
eventsConnect.eventsCol = "events";
eventsConnect.uri = uri;

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
export async function deleteEvent(eventId) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(eventsCol);
    const res = collection.deleteOne({ _id: eventId });
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
          // TODO -- discuss what will be passed into eventObj
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
 * @param {object} orgName      The name of the organization.
 * @returns {object}        { success: Boolean,
 *                            msg: a string explaining the operation outcome,
 *                            events: An array of event objects, or null
 *                            err: null, or the error that was caught
 *                            }
 */
// Event previews -- need eventId, name, eventOrgName, creator, tags, location/time
export async function getEventPreviews(orgName) {
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
          organization: orgName,
          //start: { $gte: /* today's variable */}
        },
        {
          _id: 1,
          name: 1,
          eventOrgName: 1,
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
      return {
        success: true,
        msg: "Events found.",
        events: res,
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
 * Returns one event (for expanded view)
 * @param {string} eventId      The ID of one event.
 * @returns {object}        { success: Boolean,
 *                            msg: a string explaining the operation outcome,
 *                            events: An array of event objects, or null
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
export async function eventRsvp(user, event, rsvpStatus) {
  const client = new MongoClient(uri);
  const eventId = new ObjectId(event._id);
  const userId = new ObjectId(user._id);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(eventsCol);
    const existingRsvp = getRsvp(eventId, userId, collection);
    if (existingRsvp.exists) {
      if (existingRsvp.value === rsvpStatus) {
        return {
          success: false,
          msg: `The RSVP has already been set to ${value}`,
          err: null,
        };
      } else {
        removeRsvpFromEvent(eventId, userId, collection, existingRsvp.value);
      }
    }
    let res;
    if (rsvpStatus === "Yes") {
      res = await collection.updateOne(
        { _id: eventId },
        {
          $addToSet: {
            rsvpYes: userId,
          },
        }
      );
    } else if (rsvpStatus === "Maybe") {
      res = await collection.updateOne(
        { _id: eventId },
        {
          $addToSet: {
            rsvpMaybe: userId,
          },
        }
      );
    } else if (rsvpStatus === "No") {
      res = await collection.updateOne(
        { _id: eventId },
        {
          $addToSet: {
            rsvpNo: userId,
          },
        }
      );
    } else {
      return {
        success: false,
        msg: "Unable to update - an invalid RSVP value was entered.",
        err: e,
      };
    }
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
 * @param {string} eventId A MongoDB Object Id of the event
 * @param {string} userId A MongoDB Object Id of the user
 * @param {object} collection A MongoDB collection object
 * @returns {object} {exists: boolean,
 *                    value: String representation of existing RSVP, or null}
 */
async function getRsvp(eventId, userId, collection) {
  const rsvpYes = await collection.findOne({ _id: eventId, rsvpYes: userId });
  const rsvpMaybe = await collection.findOne({ _id: eventId, rsvpYes: userId });
  const rsvpNo = await collection.findOne({ _id: eventId, rsvpYes: userId });

  if (!rsvpYes && !rsvpMaybe && !rsvpNo) {
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
 * @param {MongodbObjectId} eventId
 * @param {MongodbObjectId} userId
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
            rsvpYes: userId,
          },
        }
      );
      break;
    case "Maybe":
      removeStatus = await collection.updateOne(
        { _id: eventId },
        {
          $pull: {
            rsvpMaybe: userId,
          },
        }
      );
      break;
    case "No":
      removeStatus = await collection.updateOne(
        { _id: eventId },
        {
          $pull: {
            rsvpNo: userId,
          },
        }
      );
      break;
  }
}

// Event previews -- need eventId, name, eventOrgName, creator, tags, location/time
// TODO -- get all events where user is in following list
// TODO -- all events where user is creator
// TODO -- all events for an organization

export default eventsConnect;
