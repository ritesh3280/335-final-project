const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');

router.get('/purchase', (req, res) => {
    const medicine = req.query.medicine || "";
    res.render('purchase', { medicine });
});

router.post('/submitPurchase', async (req, res) => {
    const { name, email, medicine, quant, symptoms } = req.body;
    const doc = {
        name: name,
        email: email,
        medicine: medicine,
        quant: quant,
        symptoms: symptoms,
        submittedAt: new Date()
    };
    
    try {
        const purchase = new Purchase(doc);
        await purchase.save();
        res.render("applicationSubmitted", { doc, error: null });
    } catch (err) {
        res.render("applicationSubmitted", { 
            doc, 
            error: "Error saving to database: " + err.message 
        });
    }
});

router.get('/reviewPurchases', async (req, res) => {
    try {
        const purchases = await Purchase.find({}).sort({ submittedAt: -1 });
        res.render('reviewPurchases', { purchases, error: null });
    } catch (err) {
        res.render('reviewPurchases', { 
            purchases: [], 
            error: "Error retrieving purchases: " + err.message 
        });
    }
});

module.exports = router;

