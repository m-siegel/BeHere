const eventUtil = {};
export function eventify(obj) {
    const object = {
        name: obj.name,
        description: obj.description,
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