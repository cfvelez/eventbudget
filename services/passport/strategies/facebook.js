
require("dotenv").config();
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require("../../../models/User");

const config = {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${process.env.URL_FACEBOOK_CALLBACK}/auth/facebook/callback`
  }

module.exports = new FacebookStrategy( config,
  async function(accessToken, refreshToken, profile, done) {
    
    console.log('accessToken:'+accessToken);
    console.log('refreshToken:'+refreshToken);
    console.log('profile:'+profile);

    try{

         // Buscamos el usuario a traves del email
     const user = await User.findOne({ email });

     if (!user) { return done('No se encontro usuario',null); }

      return done(null, user);

    }catch(error){
      console.error(error);
      return done(error);
    }
   

});