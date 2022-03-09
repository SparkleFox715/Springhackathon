
const app = require('express')();
const errs = require('../errors');
const QuestionsModel = require("../models/question");

// POST a new question
app.post('/api/question', async (req, res) => {
    errs.tryAndCatch(async () => {
        // TO-DO know whether or not extraneous stuff that isn't supposed to be saved gets saved
        const questionRecord = new QuestionsModel(req.body); // TO-DO
        const dbRes = await questionRecord.save(); // TO-DO

        res.status(200).end();
    });
});

// GET a random question
app.get('/api/question/:group*', async (req, res) => {
    res.status(200).end(await QuestionsModel.aggregate([
        { $sample : {
            size : 1 , group : req.params.group
        } }
    ]));
});

// GET a specific question
app.get('/api/question/:slug', async (req, res) => {
    res.status(200).end(await QuestionsModel.find({ slug : req.params.slug }));
});

module.exports = app;
