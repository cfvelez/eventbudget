//Get API
require("dotenv").config();
const TICKETMASTER =  `${process.env.TICKETMASTER}events/`;
const API_KEY = `apikey=${process.env.COSTUMER_KEY}`;
const axios = require("axios");
//https://app.ticketmaster.com/discovery/v2/events/Z698xZ2qZa7OS.json?apikey=mfBX49RdBdlwQxFuWkWTAvV9pgi8YBcU
module.exports = async (req, res) => {
    try {
        var config = {};
        const { Id } = req.params;

        let ENDPOINT = Id && Id !== '' ? TICKETMASTER + `${Id}.json` : '';

        if(ENDPOINT === '') return res.status(400).json({msg:'No ha ingresado un identificado de evento.'});
        
        ENDPOINT = ENDPOINT + '?' + API_KEY;

        console.log(ENDPOINT);

        const response = await axios.get(ENDPOINT,config);
        
        res.status(200).json(response.data);

       
    } catch (error) {
        console.log(error);

        response.redirect('../../auth/logout');
    }
} 
  