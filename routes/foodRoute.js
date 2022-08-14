const express = require("express");
const router = express.Router();
const auth  = require('../middleware/admin')
const upload = require('../upload/upload')
const {addfood,updatefood,getfood ,fooddetail, starRating} = require('../controller/food')

router.post('/addfood', upload.single('image') , addfood)
router.put('/updatefood/:foodid', upload.single('image') , updatefood)
router.put('/rating-rating/:foodid', starRating)
router.get('/getallfood', getfood)
router.get('/fooddetail/:food', fooddetail)

module.exports = router;