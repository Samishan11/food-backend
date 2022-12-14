const express = require("express");
const router = express.Router();
const auth = require('../middleware/verify')
const authAdmin = require('../middleware/admin')
const {order , updateorder, showorder , income, showAllorder} = require('../controller/order')

router.post('/order', auth?.verifyUser, order)
router.put('/updateorder/:orderid',authAdmin?.verifyAdmin,updateorder)
router.get('/showorder', auth?.verifyUser, showorder)
router.get('/showallorder', showAllorder)
router.get('/income', income)

module.exports = router;