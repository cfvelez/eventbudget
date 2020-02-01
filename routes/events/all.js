const express = require("express");

//Get API
require("dotenv").config();
const TICKETMASTER =  `${process.env.TICKETMASTER}events.json?apikey=${process.env.COSTUMER_KEY}`;
const axios = require("axios");

const router = express.Router();

router.get("/" ,async (req, res) => {
    
    try {
        var config = {};

        const response = await axios.get(TICKETMASTER,config);
        //console.log(response.data);
        res.status(200).json(response.data);

       
    } catch (error) {
        console.log(error);

        response.redirect('../../auth/logout');
    }
});



module.exports = router;
