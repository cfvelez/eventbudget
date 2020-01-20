
require("dotenv").config();
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require("../../../models/User");

const config = {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  }

module.exports = new FacebookStrategy( config,
  async function(accessToken, refreshToken, profile, done) {
    email = "dfvelez9@gmail.com";
    console.log('accessToken:'+accessToken);
    console.log('refreshToken:'+refreshToken);
    console.log('profile:'+profile);

    try{

         // Buscamos el usuario a traves del email
     const user = await User.findOne({ email });

     if (err) { return done(err); }
       done(null, user);

    }catch(error){
        done(error);
    }
   

});