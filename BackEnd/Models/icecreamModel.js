const mongoose = require('mongoose');

const iceCreamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
});

module.exports = mongoose.model('IceCream', iceCreamSchema);
