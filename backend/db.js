const mongoose = require("mongoose");
const username = "ssguggutor128";
const password = "Dabeli128";
const cluster = "cluster0";
const dbname = "shopping-websiter";
const clusterSuff = "wpytuo5";
const connectDb = async () => {
  const uri = `mongodb+srv://${username}:${password}@${cluster}.${clusterSuff}.mongodb.net/${dbname}?retryWrites=true&w=majority`;

  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on("error", (error) => {
    console.log(error);
  });
  db.once("open", () => {
    console.log("connected successfully");
  });
};

module.exports = connectDb;
