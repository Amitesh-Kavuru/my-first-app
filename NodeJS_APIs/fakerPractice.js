const faker = require("faker");
const MongoClient = require("mongodb").MongoClient;
const dbUrl = "mongodb://localhost:27017/mydb";


MongoClient.connect(dbUrl)
  .then((client) => {
    console.log("DB connected!");
    const db = client.db();
    let documents = [];
    for (let i = 0; i < 1000; i++) {
      let doc = {
        sensorId: "SID004",
        sensorLocation: "Master Bedroom",
        monitoringAppliance: "Shower",
        timestamp: faker.date.past(2, new Date()),
        consumption: faker.datatype.number(200),
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
