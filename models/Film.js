const {Schema, model, Types} = require('mongoose')


const FormatsFilm = Object.freeze({
    VHS:   Symbol("VHS"),
    DVD:  Symbol("DVD"),
    BLURAY: Symbol("Blu-Ray")
});

const schema = new Schema({
    name:{type: String, require: true, unique: true},
    format: {type: String, require: true, required: true},
    release: {type: String,  required: true},
    stars:[{ type:Types.ObjectId, ref: 'Actor'}]
})


module.exports= model('Film', schema)
