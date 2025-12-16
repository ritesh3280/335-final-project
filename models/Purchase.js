const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    medicine: {
        type: String,
        required: true
    },
    quant: {
        type: Number,
        required: true
    },
    symptoms: {
        type: String,
        required: true
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Purchase', purchaseSchema);

