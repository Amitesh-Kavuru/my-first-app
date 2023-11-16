const MongoClient = require("mongodb").MongoClient;
const dbUrl = "mongodb://localhost:27017/mydb";

MongoClient.connect(dbUrl)
  .then((client) => {
    console.log("DB connected!");
    const db = client.db();
    let documents = [];
    let current = new Date();
    console.log(current);
    for (let i = 0; i < 31; i++) {
      let tempData = new Date(current.setHours(current.getHours() + 1));
      let doc = {
        sensorId: "SID003",
        sensorLocation: "Guest Room",
        monitoringAppliance: "Shower",
        timestamp: tempData,
        consumption: Math.floor(Math.random() * 101),
      };
      documents.push(doc);
    }
    console.log(documents);
    db.collection("sensorData")
      .insertMany(documents)
      .then((result) => {
        console.log(result);
        console.log("Documents inserted");
      })
      .catch((err) => console.error("Insert error", err));
  })
  .catch((err) => console.error("Connection error", err));

// {
//   sensorId: "SID001",
//   sensorLocation: "Guest Room",
//   monitoringAppliance: "Shower",
//   timestamp: DATE,
//   consumption: VALUE,
// },
