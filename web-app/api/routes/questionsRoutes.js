
const app = require('express')();
const QuestionsModel = require("../models/question");

app.post('/api/question', async (req, res) => {
    try {
        const questionRecord = new QuestionsModel(req.body);
        const dbRes = await questionRecord.save();
        res.status(200).end();
    } catch(error) {
        console.error(error);
        response.status(500).send(error);
    }
});

// a random question
app.get('/api/question', async (req, res) => {
    res.status(200).end(await QuestionsModel.find({}));
});

// a specific question
app.get('/api/question/:slug', async (req, res) => {
    res.status(200).end(await QuestionsModel.find({ slug : req.params.slug }));
});

module.exports = app;
