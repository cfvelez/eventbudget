const User = require("../../models/User");
const Settings = require("../../models/Settings");
const City =  require("../../models/Cities");

module.exports = async (req, res) => {
    try {
          const user = await User.findById(req.user._id); 
        
          const bodySettings = { budget, numTickets,location,categories } = req.body;
          
          if(bodySettings.budget <= 1) return res.status(200).json({msg:"El presupuesto debe ser mayor a 1 euros."});

          if(bodySettings.numTickets <= 0) return res.status(200).json({msg:"Cantidad de tickets incorrecto."});

          const city = await City.findById(bodySettings.location); 

          if(!city) return res.status(200).json({msg:"Ciudad no existe."});

          const settingsObj = new Settings({
            budget: bodySettings.budget,
            numTickets : bodySettings.numTickets,
            location: bodySettings.location,
            categories: bodySettings.categories
          });

          let settings;

          if(user.settings){
            //find and update
            //settings = await Settings.findById(user.settings);
            const response = await Settings.update({_id: user.settings},bodySettings);
           
            if(response.n >= 1){
              return res.status(200).json({msg:"Preferencias actualizadas correctamente."});
            }

          }
          else{
            settings = await settingsObj.save();
            user.settings = settings._id;
            if(await user.save()){
              return res.status(200).json({msg:"Preferencias actualizadas correctamente."});
            }
          }

        return res.status(200).json({msg:"Error al guardar las preferencias."});

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  }

