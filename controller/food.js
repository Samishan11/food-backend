const FoodModel = require('../model/foodModel')

// add food
exports.addfood = async (req, res) => {
    try {
        const Food = await new FoodModel({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            catagory: req.body.catagory,
            image: req.file?.path
        })
        Food.save()
        res.json({ 'Foods': Food })
    } catch (error) {
        res.json(error)
    }
}

// update food 
exports.updatefood = async (req, res) => {
    try {
        const Foodupdate = await FoodModel.findOneAndUpdate({ _id: req.params.foodid }, {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            catagory: req.body.catagory,
            image: req.file?.path
        },
            { new: true }
        )
        res.json(Foodupdate)
    } catch (error) {
        res.json(error)
    }
}

// star rating food 
exports.starRating = async (req, res) => {

    const food_ = await FoodModel.findById(req.params.foodid)
    var totalrating = food_.rating?.reduce((sum, curr) => sum + Number(curr.rating ? curr.rating : 0), 0)
    const user = req.body.user
    var filter = food_.rating.find(val => val.user === user)
    let abc;
    food_.rating.filter(val => {
        if (val.user === user) {
            abc = val.rating
        }
    })
    if (!filter) {
        food_.totalrating = (totalrating + req.body.rating) / (food_.rating.length >= 1 ? food_.rating.length + 1 : 1)
        const Foodupdate = await FoodModel.findOneAndUpdate({ _id: req.params.foodid }, {
            $push: {
                rating: req.body
            }
        }
        )
       return res.json(Foodupdate)
    } else {
        for (var i in food_.rating) {
            if (food_.rating[i].user === user) {
                food_.rating[i] = req.body
                food_.totalrating = (totalrating - abc + req.body.rating) / (food_.rating.length)
            }
        }
    }
    food_.save()
}
// exports.starRating = async (req, res) => {

//     const food_ = await FoodModel.findById(req.params.foodid)
//     const user = req.body.user
//     var filter = food_.rating.filter(val => val.user === user)
//     if (filter[0]?.user === undefined) {
//         const Foodupdate = await FoodModel.findOneAndUpdate({ _id: req.params.foodid }, {
//             $push: {
//                 rating: req.body
//             }
//         },
//             { new: true }
//         )
//         console.log("new", Foodupdate);
//         res.json(Foodupdate)
//     } else {
//         for (var i in food_.rating) {
//             if(food_.rating[i].user === user){
//                 food_.rating[i].rating = req.body.rating
//                 console.log(food_.rating[i]);
//                 break;
//             }

//         }

//     }
// }

//  get all foods
exports.getfood = async (req, res) => {
    try {
        let Food;
        const name = req.query.name;
        const catagory = req.query.catagory;
        if (name) {
            Food = await FoodModel.find({ name: name })
        } else if (catagory) {
            Food = await FoodModel.find({
                catagory: {
                    $in: [catagory]
                }
            })
        } else {
            Food = await FoodModel.find()
        }
        res.json(Food)
    } catch (error) {
        res.json(error)
    }
}
//  food detail
exports.fooddetail = async (req, res) => {
    try {
        const Food = await FoodModel.findOne({ _id: req.params.food })
        res.json(Food)
    } catch (error) {
        res.json(error)
    }
}
