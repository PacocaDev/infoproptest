const mongoose = require('mongoose');

/**
 * Real State Schema
 * @private
 */
const realStateSchema = new mongoose.Schema({
  date: {
    type: Date,
  },
  rua: {
    type: String,
    trim: true,
  },
  numero: {
    type: String,
  },
  bairro: {
    type: String,
    trim: true,
  },
  condominio: {
    type: String,
  },
  price: {
    type: Number,
  },
  area: {
    type: Number,
  },
  condominium_fee: {
    type: String,
  },
  iptu: {
    type: String,
  },
  rooms: {
    type: Number,
  },
  bathrooms: {
    type: Number,
  },
  garage: {
    type: Number,
  },
  agent: {
    type: String,
  },
  agent_number: {
    type: String,
  },
  latitude: {
    type: String,
  },
  longitude: {
    type: String,
  },
  property_id: {
    type: Number,
    unique: true,
  },
  url: {
    type: String,
  },
  tp_negocio: {
    type: String,
    enum: ['aluguel', 'venda'],
  },
});

/**
 * @typedef RealState
 */
module.exports = mongoose.model('RealState', realStateSchema);
