"use strict";

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ValeSchema = Schema({
    folio: {
        type: String,
        required: true
    },
    producto: {
        type: String,
        required: true
    },
    importe: {
        type: Number,
        required: true
    },
    usado: {
        type: Boolean,
        default: false
    },
    cancelado: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

ValeSchema.statics.actualizarVale = async function(valeId) {
    try {
        const valeActualizado = await this.findByIdAndUpdate(
            valeId,
            { $set: { cancelado: true } },
            { new: true }
        );

        if (!valeActualizado) {
            throw new Error("No se encontró el vale con el ID proporcionado.");
        }

        return valeActualizado;
    } catch (error) {
        throw new Error("Error al actualizar el vale: " + error.message);
    }
};

ValeSchema.statics.buscarVales = async function(producto, importe) {

    const pipeline = [
        {
            $match: {
                producto,
                usado: false,
                ...(producto === "EFECTIVO" && { importe }) 
            }
        },
        {
            $sort: {
                numero: 1
            }
        },
        {
            $limit: 100
        }
    ];

    try {
        const vales = await this.aggregate(pipeline);
        return vales;
    } catch (error) {
        throw new Error("Error en la consulta de vales: " + error.message);
    }
};


module.exports = model("Vale", ValeSchema);