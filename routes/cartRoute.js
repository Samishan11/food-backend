const express = require("express");
const router = express.Router();
const auth = require('../middleware/verify')
const {addtocart , updatecart ,getcart , removecart} = require('../controller/cart')

router.post('/addtocart', auth?.verifyUser, addtocart)
router.get('/getcart', auth?.verifyUser, getcart)
router.delete('/removecart/:cartid', auth?.verifyUser, removecart)
router.put('/updatecart/:cartid', auth?.verifyUser, updatecart)

module.exports = router;