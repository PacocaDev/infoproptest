const httpStatus = require('http-status');
const RealState = require('../models/realState.model');
const moment = require('moment');

const buildRecord = (record) => {
  const obj = {
    property_id: record.property_d,
    date: moment(record.date, 'DD/MM/YYYY'),
    tp_negocio: record.url && record.url.toLowerCase().indexOf('venda') > -1 ? 'venda' : 'aluguel',
  };
  return Object.assign(record, obj);
};

/**
 * Create new real state records
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const records = await Promise.all(req.body.map((record) => {
      if (!(record.latitude && record.longitude && record.property_d)) return {};
      const obj = buildRecord(record);
      return RealState.findOneAndUpdate({ property_id: obj.property_id }, obj, { upsert: true });
    }));
    res.status(httpStatus.CREATED);
    res.json(records);
  } catch (error) {
    next(error);
  }
};

/**
 * List real state records
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const records = await RealState.find();
    res.json(records);
  } catch (error) {
    next(error);
  }
};
