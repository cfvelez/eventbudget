const Express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../../models/User.js");


const router = Express.Router();

router.get("/view", (request, response) => {
    response.render("login");
  });

  router.post("/getAuth", async (request, response) => {
    const { username, password } = request.body;
    try {
     const user = await User.findOne({ username });
  
      if (!user) return response.render("login", { error: "el usuario no existe" });
    
      const passwordDB = user.password;
  
      const checkpw =  await bcrypt.compareSync(password, passwordDB); 

      if (!checkpw)
        return response.render("login", { error: "La contraseña no es correcta" });
    
        request.session.currentUser = user;

        response.status(200).json({ message: "OK" });
        
       /* const getToken = require("../../spotify-token/getToken.js");
        const token = await getToken();

        request.session.token = token;
        
        response.redirect("../../spotify/releases/");
        //redireccionamos aca
        */
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: "Hubo un problema" });
    }
  });
  

module.exports = router;