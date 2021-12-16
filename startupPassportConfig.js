const Startup = require('./models/startup')
const bcrypt = require('bcryptjs');
const LocalStrategy = require("passport-local").Strategy;
const passport = require('passport');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy((startup_name, startup_password, done) => {
      Startup.findOne({ startup_name: startup_name }, (err, startup) => {
        if (err) throw err;
        if (!startup) return done(null, false);
        bcrypt.compare(startup_password, startup.startup_password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, startup);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  passport.serializeUser((startup, cb) => {
    cb(null, startup.id);
  });
  passport.deserializeUser((id, cb) => {
    Startup.findOne({ _id: id }, (err, startup) => {
      const startupInformation = {
        startup_name: startup.startup_name,
      };
      cb(err, startupInformation);
    });
  });
};