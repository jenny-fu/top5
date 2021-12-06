const auth = require('../auth');
const Community = require('../models/community-model');


createCommunity = (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Community List',
        })
    }

    const top5List = new Community(body);
    console.log("creating Community: " + JSON.stringify(top5List));
    if (!top5List) {
        return res.status(400).json({ success: false, error: err })
    }

    top5List
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                community: top5List,
                message: 'Community List Created!'
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Community List Not Created!'
            })
        })
}

getCommunitiesById = async (req, res) => {
    await Community.findById({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        return res.status(200).json({ success: true, top5List: list })
    }).catch(err => console.log(err))
}
getCommunities = async (req, res) => {
    await Top5List.find({}, (err, top5Lists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        return res.status(200).json({ success: true, data: top5Lists })
    }).catch(err => console.log(err))
}
updateCommunity = async (req, res) => {
    const body = req.body
    console.log("updateTop5List: " + JSON.stringify(body));
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Community.findOne({ _id: req.params.id }, (err, top5List) => {
        console.log("communityfound: " + JSON.stringify(top5List));
        if (err) {
            return res.status(404).json({
                err,
                message: 'Community not found!',
            })
        }

        top5List.items = body.items;
        top5List
            .save()
            .then(() => {
                console.log("SUCCESS!!!");
                return res.status(200).json({
                    success: true,
                    id: top5List._id,
                    message: 'Community List updated!',
                })
            })
            .catch(error => {
                console.log("FAILURE: " + JSON.stringify(error));
                return res.status(404).json({
                    error,
                    message: 'Community List not updated!',
                })
            })
    })
}

module.exports = {
    createCommunity,
    getCommunitiesById,
    getCommunities,
    updateCommunity,
}