var mongoose = require("mongoose");
var passportlocalmongoose = require("passport-local-mongoose");
var StartupSchema = mongoose.Schema({
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
    skills: [{
        type: String,
        default: ""
    }]
    
});

StartupSchema.plugin(passportlocalmongoose);
StartupSchema.index({ "$**": "text" });
module.exports = mongoose.model("Startup", StartupSchema);