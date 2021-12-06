const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommunitySchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: Map, required: true }, //{item name: votes}
        update: {type: Date, required: true},
        views: {type: Number, required: true},
        likes: {type: Number, required: false},
        dislikes: {type: Number, required: false}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Community', CommunitySchema)
