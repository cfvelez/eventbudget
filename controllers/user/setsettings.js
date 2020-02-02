const User = require("../../models/User");
const Settings = require("../../models/Settings");
module.exports = async (req, res) => {
    try {
      const user = await User.findById(req.user._id); 
      console.log(req.body);
      const { p_budget, p_numTickets, p_location,p_categories } = req.body;
      if(user.settings){
        //find and update
      }
      else{
        const settingsObj = new Settings({
          budget: p_budget,
          numTickets : p_numTickets,
          location: p_location,
          b_categories: p_categories
        });

        const settings = await settingsObj.save();
        user.settings = settings._id;
        if(await user.save()){
          res.status(200).json({msg:"Preferencias registradas."});
        }
      }

      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  }

