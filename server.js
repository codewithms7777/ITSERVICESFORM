const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB using environment variable
mongoose.connect("mongodb+srv://mscorp7:mscorp7777@mscorp1.d5y2q.mongodb.net/mscorp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define schema and model for IT_SERVICES_FORM collection
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
}, { collection: "IT_SERVICES_FORM" }); // 👈 this ensures collection name

const Contact = mongoose.model("Contact", contactSchema);

// POST route
app.post("/api/contact", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.send("Message saved successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving message.");
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
