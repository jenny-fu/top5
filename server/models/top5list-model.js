const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Top5ListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [String], required: true },
        published: {type: Boolean, required: true},
        pubDate: {type: String, required: false},
        ownerEmail: {type: String, required: true}, //uses email
        ownerName: {type: String, required: true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
