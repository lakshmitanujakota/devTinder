const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb://***************@ac-uj2jsaq-shard-00-00.mmgxm0z.mongodb.net:27017,ac-uj2jsaq-shard-00-01.mmgxm0z.mongodb.net:27017,ac-uj2jsaq-shard-00-02.mmgxm0z.mongodb.net:27017/devTinder?ssl=true&replicaSet=atlas-mavy2c-shard-0&authSource=admin&appName=NamesteNodeJs/devTinder"
  );
};
module.exports = { connectDB };
