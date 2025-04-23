const mongoose = require("mongoose");
const mongo_URL = process.env.MONGO_URL;

async function main(){
  await mongoose.connect(mongo_URL);
}
  main().then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err, "DB connection ERROR");
  });


