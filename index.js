const express = require("express");
const app = express();
const path = require("path");
const portNumber = 7003;
const bodyParser = require("body-parser");
//TO DO: add mongoose
//const { MongoClient, ServerApiVersion } = require("mongodb"); 

app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "templates"));

const fda_url = "https://api.fda.gov/drug/ndc.json";

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/purchase', (req, res) => {
    const medicine = req.query.medicine || "";
    res.render('purchase', { medicine });
});

app.get("/search", (req, res) => {
    res.render("search", { result: null, error: null });
});

app.post("/searched", async (req, res) => {
    const { generic } = req.body;

    try {
        const url = `${fda_url}?search=generic_name:${generic}&limit=1`;
        const response = await fetch(url);
        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            return res.render("search", {
                result: null,
                error: "No results found"
            });
        }

        const item = data.results[0];

        const result = {
            generic_name: item.generic_name,
            brand_name: item.brand_name,
            labeler_name: item.labeler_name,
            dosage_form: item.dosage_form,
            active_ingredients: Array.isArray(item.active_ingredients) ? item.active_ingredients : []
        };

        res.render("search", { result, error: null });

    } catch (err) {
        res.render("search", {
            result: null,
            error: "Error contacting FDA API"
        });
    }
});

//NEED TO FINISH THIS
app.post("/submitPurchase", async (req, res) => {
    const { name, email, medicine, quant, symptoms } = req.body;
    const doc = {
        name: name,
        email: email,
        medicine: medicine,
        quant: quant,
        symptoms: symptoms,
        submittedAt: new Date()
    };
    //TO DO: add this to mongo db
    //await applicantsCollection.insertOne(doc);
    res.render("applicationSubmitted", { doc });
});

/*
app.get("/reviewPurchases", async (req, res) => {
    //Add mongoDB code that gets all purchases made
});
*/

app.listen(portNumber);
console.log(`main URL http://localhost:${portNumber}/`);