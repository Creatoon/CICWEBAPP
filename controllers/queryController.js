const Query = require('../models/queryModel');
const factory = require('./../controllers/handlerFactory');
const catchAsync = require('./../utils/catchAsync');
const queryEmail = require('./../utils/queryEmail');

exports.createQuery = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const doc = await Query.create(req.body);

  const userMessage = `NAME :- ${req.body.name} having an EMAIL ID :- ${req.body.email} and a CONTACT NUMBER :- ${req.body.phone} have a QUERY :- "${req.body.query}"`;

  queryEmail.email(userMessage);

  res.status(201).json({
    status: 'success',
    data: {
      doc
    }
  });
});

exports.getQuery = factory.getOne(Query);
exports.getAllQueries = factory.getAll(Query);

// Do NOT update passwords with this!
exports.updateQuery = factory.updateOne(Query);
exports.deleteQuery = factory.deleteOne(Query);
