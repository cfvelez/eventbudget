
module.exports =  (req, res) => { 
    
    try{
        const {code} = req.params;
        return res.status(200).json({code});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({ message: "Hubo un error" });
    }

 }
  
