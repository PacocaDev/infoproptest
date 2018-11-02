const httpStatus = require('http-status');
const RealState = require('../models/realState.model');


/**
 * Create new real state records
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const records = await Promise.all(req.body.map(record => {
      const realState = new RealState(record);
      return realState.save();
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
