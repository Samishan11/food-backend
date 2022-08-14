const OrderModel = require('../model/orderModel');
const CartModel = require('../model/cartModel')
// order 
exports.order = async (req, res) => {
    try {
        const Order = await new OrderModel(req.body);
        Order.save()
       if(Order){
        var a = await CartModel.deleteMany({ user: req.body.user })
        console.log(req.userInfo._id)
       }
        res.json({ 'Order': data })
    } catch (error) {
        res.json(error)
    }
}

// update order 
exports.updateorder = async (req, res) => {
    try {
        const Orderupdate = await OrderModel.findOneAndUpdate({ _id: req.params.orderid },
            {
                $set: req.body
            },
            { new: true }
        )
        res.json(Orderupdate)
    } catch (error) {
        res.json(error)
    }
}

// show order 
exports.showorder = async (req, res) => {
    try {
        const order_ = await OrderModel.find({ user: req.userInfo._id }).populate('user').populate("foods.food").sort('-order_at');
        res.json(order_)
    } catch (error) {
        res.json(error)
    }
}
exports.showAllorder = async (req, res) => {
    try {
        const order_ = await OrderModel.find().populate('user').populate("foods.food").sort('-order_at');
        res.json(order_)
    } catch (error) {
        res.json(error)
    }
}

// get income monthly
exports.income = async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    try {
        const Orderupdate = await OrderModel.aggregate([
            { $match: { order_at: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: "$order_at" },
                    sales: "$total_price",
                },
            },
            {
                $group: {
                    _id: "$month",
                    totalprice: { $sum: "$sales" },
                },
            },
        ])
        res.json(Orderupdate)
    } catch (error) {
        res.json(error)
    }
}
