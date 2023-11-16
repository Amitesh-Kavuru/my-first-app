const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const dbUrl = "mongodb://localhost:27017/mydb";

const corsOptions = {
  origin: "http://localhost:3000",
};
let db;
MongoClient.connect(dbUrl)
  .then((client) => {
    db = client.db();
    console.log("DB Connected.");
  })
  .catch((err) => console.error("DB Connection error", err));

app.use(cors(corsOptions));
app.use(bodyParser.json());

// get available sensors
app.get("/api/sensors/", (req, res) => {
  let aggregateQuery = [
    {
      $group: {
        _id: "$sensorId",
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ];
  db.collection("sensorData")
    .aggregate(aggregateQuery)
    .toArray()
    .then((result) => {
      console.log("Sensor fetched.");
      console.log(result);
      res.status(200);
      res.send(result);
    })
    .catch((err) => console.error("Fetch error", err));
});
app.get("/api/sensorsdetails/", (req, res) => {
  let aggregateQuery = [
    {
      $group: {
        _id: "$sensorLocation",
        recentRecord: { $last: "$$ROOT" },
      },
    },
    {
      $replaceRoot: { newRoot: "$recentRecord" },
    },
  ];
  db.collection("sensorData")
    .aggregate(aggregateQuery)
    .toArray()
    .then((result) => {
      console.log("Sensor fetched.");
      console.log(result);
      res.status(200);
      res.send(result);
    })
    .catch((err) => console.error("Fetch error", err));
});
// get sensor details
app.get("/api/sensors/:sensorId/details", (req, res) => {
  const sensorId = req.params.sensorId;
  db.collection("sensorData")
    .findOne({ sensorId: sensorId })
    .then((result) => {
      console.log("Sensor details fetched.");
      console.log(result);
      res.status(200);
      res.send({
        sensorLocation: result.sensorLocation,
        monitoringAppliance: result.monitoringAppliance,
      });
    });
});

// get data for total consumption for circle indicator
app.get(
  "/api/sensors/:sensorId/filter/:filter/timestamp/:timestamp",
  (req, res) => {
    let currentTS = req.params.timestamp;
    currentTS = new Date(currentTS);
    let filter = req.params.filter;
    let sensorId = req.params.sensorId;
    let nextTS;
    let aggregateQuery;
    if (filter === "day") {
      currentTS.setHours(5, 30, 0, 0);
      nextTS = new Date(currentTS);
      nextTS.setDate(nextTS.getDate() + 1);
      aggregateQuery = [
        {
          $match: {
            sensorId: sensorId,
            timestamp: {
              $gte: currentTS,
              $lt: nextTS,
            },
          },
        },
        {
          $group: {
            _id: {
              day: { $dayOfMonth: "$timestamp" },
              month: { $month: "$timestamp" },
              year: { $year: "$timestamp" },
            },
            totalConsumption: { $sum: "$consumption" },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ];
    } else if (filter === "month") {
      currentTS.setDate(1);
      currentTS.setHours(5, 30, 0, 0);
      nextTS = new Date(currentTS);
      nextTS.setMonth(nextTS.getMonth() + 1);
      aggregateQuery = [
        {
          $match: {
            sensorId: sensorId,
            timestamp: {
              $gte: currentTS,
              $lt: nextTS,
            },
          },
        },
        {
          $group: {
            _id: {
              month: { $month: "$timestamp" },
              year: { $year: "$timestamp" },
            },
            totalConsumption: { $sum: "$consumption" },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ];
    } else if (filter === "year") {
      currentTS.setDate(1);
      currentTS.setMonth(1);
      currentTS.setHours(5, 30, 0, 0);
      nextTS = new Date(currentTS);
      nextTS.setFullYear(nextTS.getFullYear() + 1);
      aggregateQuery = [
        {
          $match: {
            sensorId: sensorId,
            timestamp: {
              $gte: currentTS,
              $lt: nextTS,
            },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$timestamp" },
            },
            totalConsumption: { $sum: "$consumption" },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ];
    }
    console.log("Query : ", aggregateQuery);
    db.collection("sensorData")
      .aggregate(aggregateQuery)
      .toArray()
      .then((result) => {
        console.log("Records fetched.");
        console.log(result);
        res.status(200);
        res.send(result);
      })
      .catch((err) => console.error("Find error occurred."));
  }
);

// get data for graph
app.get(
  "/api/sensors/:sensorId/graphData/filter/:filter/timestamp/:timestamp",
  (req, res) => {
    let sensorId = req.params.sensorId;
    let filter = req.params.filter;
    let currentTS = req.params.timestamp;
    currentTS = new Date(currentTS);
    let nextTS;
    let aggregateQuery;
    if (filter === "day") {
      currentTS.setHours(5, 30, 0, 0);
      nextTS = new Date(currentTS);
      nextTS.setDate(nextTS.getDate() + 1);
      aggregateQuery = [
        {
          $match: {
            sensorId: sensorId,
            timestamp: {
              $gte: currentTS,
              $lt: nextTS,
            },
          },
        },
        {
          $group: {
            _id: {
              hour: { $hour: "$timestamp" },
              day: { $dayOfMonth: "$timestamp" },
              month: { $month: "$timestamp" },
              year: { $year: "$timestamp" },
            },
            totalConsumption: { $sum: "$consumption" },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ];
    } else if (filter === "month") {
      currentTS.setDate(1);
      currentTS.setHours(5, 30, 0, 0);
      nextTS = new Date(currentTS);
      nextTS.setMonth(nextTS.getMonth() + 1);
      aggregateQuery = [
        {
          $match: {
            sensorId: sensorId,
            timestamp: {
              $gte: currentTS,
              $lt: nextTS,
            },
          },
        },
        {
          $group: {
            _id: {
              day: { $dayOfMonth: "$timestamp" },
              month: { $month: "$timestamp" },
              year: { $year: "$timestamp" },
            },
            totalConsumption: { $sum: "$consumption" },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ];
    } else if (filter === "year") {
      currentTS.setDate(1);
      currentTS.setMonth(1);
      currentTS.setHours(5, 30, 0, 0);
      nextTS = new Date(currentTS);
      nextTS.setFullYear(nextTS.getFullYear() + 1);
      aggregateQuery = [
        {
          $match: {
            sensorId: sensorId,
            timestamp: {
              $gte: currentTS,
              $lt: nextTS,
            },
          },
        },
        {
          $group: {
            _id: {
              month: { $month: "$timestamp" },
              year: { $year: "$timestamp" },
            },
            totalConsumption: { $sum: "$consumption" },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ];
    }

    db.collection("sensorData")
      .aggregate(aggregateQuery)
      .toArray()
      .then((result) => {
        console.log("Records fetched.");
        console.log(result);
        res.status(200);
        res.send(result);
      });
  }
);

// details to edit sensor device
app.get("/api/sensors/:sensorId/device-details", (req, res) => {
  const sensorId = req.params.sensorId;
  db.collection("sensorData")
    .findOne({ sensorId: sensorId })
    .then((result) => {
      console.log("Sensor details fetched.");
      console.log(result);
      res.status(200);
      res.send({
        sensorId: result.sensorId,
        sensorLocation: result.sensorLocation,
        monitoringAppliance: result.monitoringAppliance,
      });
    });
});

app.listen(5000, () => console.log("Server Started."));
