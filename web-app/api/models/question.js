
const mongoose = require("mongoose");

const QuestionsSchema = new mongoose.Schema(
	{
		slug : {
            type : mongoose.Schema.Types.ObjectId,
            index : true,
            required : true ,
            unique : true,
            auto: true,
        },
		type : { type : String, enum : ['MCQ','FRQ'], required : true },
        group : { type : String, required : true}, // [subject]/[unit]
        textContent : { type : String, required : true},
        answers : [
            {
                textContent : { type : String, required : true },
                isCorrect : { type : Boolean, required : true },
            }
        ],
	},
//	{ collection : 'questions' } // Mongoose makes collections by default, so this line isn't needed.
);
QuestionsSchema.index({ slug : 1 }, { unique : true });
const QuestionsModel = mongoose.model('Questions', QuestionsSchema);

module.exports = QuestionsModel;
