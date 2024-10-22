const MeetUps = require("./Models/meetUp.Models");
const { intializeDatabase } = require("./db/db.connect");

intializeDatabase();

const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// ************* to get all data *************
async function readAllData() {
  try {
    const allData = await MeetUps.find();
    return allData;
  } catch (error) {
    console.log("Error in readind data from database.", error);
  }
}
//(foundAllData.length != 0) is corect.
app.get("/", async (req, res) => {
  try {
    const foundAllData = await readAllData();
    if (foundAllData.length != 0) {
      res.status(200).json(foundAllData);
    } else {
      res.status(404).json({ error: "Error in fetching all data." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data.", error });
  }
});

//****************** to Add new event data ******************
async function addNewData(newMeetUp) {
  try {
    const newData = new MeetUps(newMeetUp);
    const saveData = await newData.save();
    return saveData;
  } catch (error) {
    console.log("Failed connecting to database and adding new data.", error);
  }
}

app.post("/add-meetUp", async (req, res) => {
  try {
    const savedData = await addNewData(req.body);
    res
      .status(201)
      .json({ message: "New MeetUp added Successfully.", MeetUp: savedData });
  } catch (error) {
    res.status(500).json({ error: "Error data not found." });
  }
});

//*************** to get data by Id ***************
async function dataById(meetUpId) {
  try {
    const findData = await MeetUps.findById(meetUpId);
    return findData;
  } catch (error) {
    console.log("Error in connecting to database.", error);
    throw error;
  }
}

app.get("/meetUp/:meetUpId", async (req, res) => {
  try {
    const filteredData = await dataById(req.params.meetUpId);
    if (filteredData) {
      res
        .status(200)
        .json({ message: "Found data successfully.", filteredData });
    } else {
      res.status(404).json({ error: "Failed to find data by id." });
    }
  } catch {
    res.status(500).json({ error: "Error find the data by id." });
  }
});

//*************** to get data by title ***************
async function dataByTitleOrTag(eventTitleOrTag) {
  try {
    const findData = await MeetUps.find({
      $or: [{ title: eventTitleOrTag }, { eventTags: eventTitleOrTag }],
    });
    return findData;
  } catch (error) {
    console.log("Error in connecting to database.", error);
    throw error;
  }
}

app.get("/meetUp/event/title/:eventTitleOrTag", async (req, res) => {
  try {
    const filteredData = await dataByTitleOrTag(req.params.eventTitleOrTag);
    if (filteredData.length > 0) {
      res
        .status(200)
        .json({ message: "Found data successfully.", filteredData });
    } else {
      res.status(404).json({ error: "Failed to find data." });
    }
  } catch {
    res.status(500).json({ error: "Error find the data." });
  }
});

//*************** to get data by tags ***************
// async function dataByTags(meetUpTags) {
//   try {
//     const findData = await MeetUps.find({ eventTags: meetUpTags });
//     return findData;
//   } catch (error) {
//     console.log("Error in connecting to database.", error);
//     throw error;
//   }
// }

// app.get("/meetUp/tags/:meetUpTags", async (req, res) => {
//   try {
//     const filteredData = await dataByTags(req.params.meetUpTags);
//     if (filteredData) {
//       res
//         .status(200)
//         .json({ message: "Found data successfully.", filteredData });
//     } else {
//       res.status(404).json({ error: "Failed to find data by tags." });
//     }
//   } catch {
//     res.status(500).json({ error: "Error find the data by tags." });
//   }
// });

//**************** to get event by Type ****************
async function eventByType(eventType) {
  try {
    const eventTypeData = await MeetUps.find({ typeOfEvent: eventType });
    return eventTypeData;
  } catch (error) {
    console.log("Error connecting to database");
  }
}

app.get("/meetUp/events/:eventType", async (req, res) => {
  try {
    const filteredEventData = await eventByType(req.params.eventType);
    if (filteredEventData) {
      res.status(200).json({
        message: "Event type data found successfully.",
        EventData: filteredEventData,
      });
    } else {
      res.status(404).json({ error: "Failed to get data from database." });
    }
  } catch {
    res.status(500).json({ error: "Error in fetching data." });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running on PORT:-", PORT);
});

module.exports = app;
