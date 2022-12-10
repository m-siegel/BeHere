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
    start: new Date(obj.start).toISOString(),
    finish: new Date(obj.finish).toISOString(),
    tags: obj.tags,
    followedBy: [],
    rsvps: [],
    likes: [],
  };
  return object;
}
eventUtil.eventify = eventify;

export default eventUtil;
