const mongoose = require("mongoose");
mongoose
  .connect(process.env.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch();
