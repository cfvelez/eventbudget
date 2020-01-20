var logout = require('express-passport-logout');

module.exports =  (req, res) => { 
    
    try{
        logout();
        req.logout();
        console.log(req.logout());
        return res.status(200).json({msg:"Sesión finalizada."});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({ message: "Hubo un error" });
    }

 }
  
