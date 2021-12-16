var mongoose = require("mongoose");
var passportlocalmongoose = require("passport-local-mongoose");
var UserSchema = mongoose.Schema({
    name: String,
    username: {
        type: String,
        default: ""
    },
    Password: String,
    date:{
        type:Date,
        default:Date.now
    },
    bio: {
        type: String,
        default: ""
    },
    title: {
        type: String,
        default: ""
    },
    organization: {
        type: String,
        default: ""
    },
    contact: {
        type: String,
        default: ""
    },
    skills: [{
        type: String,
        default: ""
    }],

});

UserSchema.plugin(passportlocalmongoose);
UserSchema.index({ "$**": "text" });
module.exports = mongoose.model("User", UserSchema);
