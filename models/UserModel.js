const mongoose = require('mongoose')

const UserSchemma = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
        },
        verified: {
            type: Boolean,
            required: true,
            default: false
        }
}
);

const userModel = mongoose.model("Users", UserSchemma);

module.exports = userModel;
