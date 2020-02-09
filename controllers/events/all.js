//Get API
require("dotenv").config();
const Settings = require("../../models/Settings");
const TICKETMASTER =  `${process.env.TICKETMASTER}events.json?`;
const API_KEY = `apikey=${process.env.COSTUMER_KEY}`;
const axios = require("axios");
//https://app.ticketmaster.com/discovery/v2/events.json?city=[Madrid]&segmentId=KZFzniwnSyZfZ7v7nE,KZFzniwnSyZfZ7v7na&localStartEndDateTime=2020-02-01T23:59:59,2020-05-01T00:00:00&&apikey=mfBX49RdBdlwQxFuWkWTAvV9pgi8YBcU
module.exports = async (req, res) => {
    
    try {
        var config = {};
    
        const settings = await Settings.findById(req.user.settings).populate('location');
        console.log(settings.getStartDate());
        console.log(settings.getEndDate());
        return res.status(200).json(settings);

        let ENDPOINT = settings ? TICKETMASTER + `city=[${settings.location.name}]` : '';
        ENDPOINT = ENDPOINT + '&' + API_KEY;

        console.log(ENDPOINT);

        const response = await axios.get(ENDPOINT,config);
        //console.log(response.data);
        res.status(200).json(response.data);

       
    } catch (error) {
        console.log(error);

        response.redirect('../../auth/logout');
    }
} 
  