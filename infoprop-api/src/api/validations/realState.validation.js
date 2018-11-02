const Joi = require('joi');

module.exports = {

  // POST /v1/real-state
  create: {
    body: Joi.array().items({
      logradouro: Joi.string(),
      numero: Joi.number().integer().positive(),
      bairro: Joi.string(),
      municipio: Joi.string(),
      estado: Joi.string(),
      cep: Joi.string(),
      lat: Joi.number().required(),
      lng: Joi.number().required(),
      tp_negocio: Joi.string().valid('aluguel', 'venda'),
      preco: Joi.number().required(),
      data: Joi.date().required(),
    })
  }
};
