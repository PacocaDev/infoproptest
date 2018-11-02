const mongoose = require('mongoose');

/**
 * Real State Schema
 * @private
 */
const realStateSchema = new mongoose.Schema(
  {
    logradouro: {
      type: String,
      trim: true,
    },
    numero: {
      type: Number,
    },
    bairro: {
      type: String,
      trim: true,
    },
    municipio: {
      type: String,
      trim: true,
    },
    estado: {
      type: String,
      trim: true,
    },
    cep: {
      type: String,
      trim: true,
    },
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
    tp_negocio: {
      type: String,
    },
    preco: {
      type: Number,
    },
    data: {
      type: Date,
    }
  },
  {
    timestamps: true,
  });

/**
 * @typedef RealState
 */
module.exports = mongoose.model('RealState', realStateSchema);
