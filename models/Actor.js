const {Schema, model, Types} = require('mongoose')


const schema = new Schema({
    firstName:{type: String, require: true},
    lastName: {type: String, required: true},
    films: [{type: Types.ObjectId, ref: 'Film'}]
})

module.exports= model('Actor', schema)
