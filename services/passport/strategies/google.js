
require("dotenv").config();
const uuid = require("uuid/v1");
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../../../models/User");

const config = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: `${process.env.URL_GOOGLE_CALLBACK}/auth/google/callback`
  }

module.exports = new GoogleStrategy( config,
  async function(accessToken, refreshToken, profile, done) {
    
    const Gmail = profile.emails[0].value;

    try{

          // Buscamos el usuario a traves del email
        const user = await User.findOne( {email : Gmail} );

        if (user && user.provider !='G')
          return done({error:"Un usuario con este email ya existe en nuestra base de datos."}, null,null);
        
        if(user)
          return done(null, user,null);


        const confirmationCode = uuid();

        const GoogleUserModel = new User({
            code:confirmationCode,
            email:Gmail,
            name:profile.name.givenName,
            lastname:profile.name.familyName,
            status:true,
            provider:'G'
        });
        
        const GoogleUser = await GoogleUserModel.save();
        
        if(GoogleUser) return done(null, GoogleUser,null);

    }catch(error){
      console.error(error);
      return done(error,null,null);
    }
   

});