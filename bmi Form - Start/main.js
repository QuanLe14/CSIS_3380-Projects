const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.post("/", (req, res) => {
    const weight = parseFloat(req.body.weight);
    const height = parseFloat(req.body.height);
    const heightM = height/100
    const bmi = (weight / Math.pow(heightM, 2)).toFixed(1);

    console.log(bmi);
    res.render('bmi', {bmi: bmi});
})

app.get('/', (req, res) => {
    res.render('bmi');
})

app.use(express.static("public"));

app.listen(3000, function () {
 console.log("server started on port 3000");
});