const express = require('express');
const router = express.Router();

const fda_url = "https://api.fda.gov/drug/ndc.json";

router.get("/search", (req, res) => {
    res.render("search", { result: null, error: null });
});

router.post("/searched", async (req, res) => {
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

module.exports = router;

