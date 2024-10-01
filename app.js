const express = require("express");;
const app = express();
const cors = require("cors");
const router = require('./routes/allRoutes');
const mongoose = require("mongoose");


app.use(express.json());
app.use(cors());
app.use(router);





// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("*********🛡️🛡️  Sucessfully Connected  MongoDB 🛡️🛡️ **********"))
  .catch((err) => console.error("!!!!!!!!! Mongodb Connection Failure !!!!!!!!!!", err));



const PORT = 8003; // port number

app.listen(PORT, () => {
    console.log(`🛡️🛡️ Server started on port 🛡️🛡️  ${PORT}`);
  });