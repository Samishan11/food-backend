const Cartmodel = require('../model/cartModel');
const Foodmodel = require('../model/foodModel');
// add to cart
exports.addtocart = async (req, res) => {
    const food = req.body.food
    const Food = await Foodmodel.findOne({ _id: food })
    console.log(req.body);
    const Cart = new Cartmodel(
        {
            food,
            name: Food.name,
            price: Food.price,
            quantity: req.body.quantity,
            image: Food.image,
            user: req.body.user,
        }).save().then(Cart => {
            console.log(req.body)
            res.json({ 'Cart': Cart })
        }).catch(e => {
            res.json(e)
        })
}

// update cart
exports.updatecart = async (req, res) => {
    try {
        const Cart = await Cartmodel.findOneAndUpdate({ _id: req.params.cartid }, {
            quantity: req.body.quantity,
        },
            { new: true })
        res.json({ 'Cart': Cart })
    } catch (error) {
        res.json(error)
    }
}

// remove cart
exports.removecart = async (req, res) => {
    try {
        const Cart = await Cartmodel.findByIdAndRemove({ _id: req.params.cartid }, {
            user: req.userInfo._id,
        })
        res.json({ message: 'deleted' })
    } catch (error) {
        res.json(error)
    }
}

// get cart
exports.getcart = async (req, res) => {
    try {
        const cart = await Cartmodel.find({
            user: req.userInfo._id,
        }).populate('food')
        res.json({ data: cart, success: true })
    } catch (error) {
        res.json(error)
    }
}

