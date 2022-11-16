const eventUtil = {};
export function eventify(obj) {
    const object = {
        name: obj.name,
        description: obj.description,
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
        rsvpNo: []
    }
    return object;
}
eventUtil.eventify = eventify;

export default eventUtil;