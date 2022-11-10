const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
    console.log("Post has been received");

    const query = req.body.cityName;
    const unit = req.body.unit;
    const apiKey = "0d3869a3d174ce74a6c597cde11593c7";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;

    https.get(url, function(resp) {
        resp.on("data", function(data) {
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const weatherIcon = weatherData.weather[0].icon;
            const weatherImg = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

            var unitOutuput;

            if (unit == "metric") {
                unitOutuput = "Celsius";
            } else if (unit == "imperial") {
                unitOutuput = "Farenheit";
            } else if (unit == "standard") {
                unitOutuput = "Kelvin";
            }

            res.write("<h1>The current temperature at " + query + " is " + temp + " degrees " + unitOutuput + "</h1>");
            res.write("</br> <p>People at " + query + " are currently experiencing " + weatherDescription + "</p>");
            res.write("<img src=" + weatherImg + " alt='Image of the Weather'>");
            res.send();
        })
    })


})








app.listen(3000, function() {
    console.log("The server is listening on port ");
})