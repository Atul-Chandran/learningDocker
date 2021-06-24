const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: [true, "User name required"],
        unique: true
    },
    password: {
        type: String,
        require: [true, "Password required"],
    }
});

const User = mongoose.model("User",userSchema);
module.exports = User;