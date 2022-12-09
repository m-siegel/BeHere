/* Tim */

const eventUtil = {};
export function eventify(obj, creatorId, org) {
  const object = {
    name: obj.name,
    description: obj.description,
    organization: org,
    creator: creatorId,
    // String for version 1
    location: obj.location,
    // Saving start & finish as a string for version 1
    start: new Date(obj.start).toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    finish: new Date(obj.finish).toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    tags: [],
    followedBy: [],
    rsvpYes: [],
    rsvpMaybe: [],
    rsvpNo: [],
    likes: [],
  };
  return object;
}
eventUtil.eventify = eventify;

export default eventUtil;
