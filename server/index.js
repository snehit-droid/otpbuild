const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

let pins = ["576", "1964", "15764"];

const port = process.env.PORT || 5000;

app.post('/verify', (req, res) => {
    try {
        let valid;
        // let valid = pins.find(req.body.pin);
        for(v of pins){
            if(v == req.body.pin)
                valid = true;
        }
        valid ? res.status(200).json({ message: "OTP Valid!!!" }) : res.status(404).json({ message: "OTP InValid!!!" });
    } catch (error) {
        console.log(error);
    }
})

app.listen(port, () => console.log("app is running on port: " + port));