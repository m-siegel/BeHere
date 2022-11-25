const eventUtil = {};
export function eventify(obj) {
  const object = {
    name: obj.name,
    description: obj.description,
    organization: obj.organization,
    creator: obj.creator,
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
