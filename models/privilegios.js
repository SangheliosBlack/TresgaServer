const mongoose = require("mongoose");
const { Schema, model } = mongoose;

var Privilegios_Schema = Schema({
    seccion: {
        type: String,
        required: true
    },
    permiso: {
        type: Boolean,
        required: true
    }
});

Privilegios_Schema.statics.getFieldsInfo = function () {
    return Object.keys(this.schema.paths)
        .map(field => ({
            name: field,
            properties: this.schema.paths[field]
        }));
};

const Privilegio = model("privilegios", Privilegios_Schema);


module.exports = Privilegio;

