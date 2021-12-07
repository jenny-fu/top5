const auth = require('../auth')
const express = require('express')
const Top5ListController = require('../controllers/top5list-controller')
const CommunityController = require('../controllers/community-controller')
const UserController = require('../controllers/user-controller')
const router = express.Router()

router.post('/top5list', auth.verify, Top5ListController.createTop5List)
router.put('/top5list/:id', auth.verify, Top5ListController.updateTop5List)
router.put('/top5list/:id', auth.verify, Top5ListController.updateTop5Likes)
router.put('/top5list/:id', auth.verify, Top5ListController.updateTop5Dislikes)
router.put('/top5list/:id', auth.verify, Top5ListController.updateTop5Views)
router.delete('/top5list/:id', auth.verify, Top5ListController.deleteTop5List)
router.get('/top5list/:id', auth.verify, Top5ListController.getTop5ListById)
router.get('/top5lists', auth.verify, Top5ListController.getTop5Lists)
router.post('/top5listpairs', auth.verify, Top5ListController.getTop5ListPairs)


router.post('/community', auth.verify, CommunityController.createCommunity)
router.get('/community', auth.verify, CommunityController.getCommunities)
router.get('/community/:id', auth.verify, CommunityController.getCommunitiesById)
router.put('/community/:id', auth.verify, CommunityController.updateCommunity)

router.post('/register', UserController.registerUser)
router.post('/login', UserController.loginUser)
router.get('/loggedIn', UserController.getLoggedIn)

module.exports = router