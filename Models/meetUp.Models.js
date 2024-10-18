const mongoose = require("mongoose");

const MeetUpSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
  typeOfEvent: {
    type: String,
    required: true,
    enum: ["Offline", "Online"],
  },
  eventTopics: [
    {
      type: String,
      required: true,
      enum: [
        "Health",
        "Technology",
        "Education",
        "Business",
        "Leadership",
        "Online Webinar",
        "Hackathon",
        "Yoga",
        "Mental Health",
      ],
    },
  ],
  description: {
    type: String,
    required: true,
  },
  timing: {
    type: String,
    required: true,
  },
  speakers: [
    {
      type: String,
      required: true,
    },
  ],
  speakersImage: [
    {
      type: String,
      required: true,
    },
  ],
  price: {
    type: String,
    default: "Free",
  },
  address: {
    type: String,
    default: "Online",
  },
  dressCode: {
    type: String,
    default: "Casual",
  },
  ageRestriction: {
    type: String,
    default: "Above 18",
  },
  eventPictures: [
    {
      type: String,
      required: true,
    },
  ],
  eventTags: [
    {
      type: String,
      required: true,
    },
  ],
});

const MeetUpInfo = mongoose.model("MeetUpInfo", MeetUpSchema);

module.exports = MeetUpInfo;
