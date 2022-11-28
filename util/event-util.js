const eventUtil = {};
export function eventify(obj, creatorId, org) {
  const object = {
    name: obj.name,
    description: obj.description,
    organization: org,
    creator: creatorId,
    // String
    location: obj.location,
    // Google API to give us info about local time zone?
    // Saving start & finish as a string
    start: obj.start,
    finish: obj.finish,
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
