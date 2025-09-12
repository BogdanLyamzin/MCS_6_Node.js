import User from "./classes/User.js";

const user = new User("Victoria", "Dallon");

if(Object.keys(user).length === 2) {
    console.log("User create successfully");
}