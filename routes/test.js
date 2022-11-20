import eventsDB from "../db-connect/events-connect.js";

console.log(await eventsDB.getEventPreviews("rohan.gov"));
// console.log(await eventsDB.getOneEvent("63784e1864902c0fd2333806"));

// import usersDB from "../db-connect/users-connect.js";
// console.log(await usersDB.getUserByUsername("username3"));
