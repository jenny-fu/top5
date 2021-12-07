const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Top5ListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [String], required: true },
        published: {type: Boolean, required: true},
        pubDate: {type: Date, required: true},
        views: {type: Number, required: true},
        ownerEmail: {type: String, required: true},
        ownerName: {type: String, required: true},
        likes: {type: Number, required: false},
        dislikes: {type: Number, required: false},
        comments: {type: [Object], require: false}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
