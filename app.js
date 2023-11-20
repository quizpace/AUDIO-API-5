const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const port = process.env.PORT || 2000; // Use the environment port if available

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/"); // Updated path to refer to the 'uploads' folder in the main project directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Endpoint for starting recording (simulated)
app.post("/start-recording", (req, res) => {
  // Logic to start recording (if using a frontend, this will trigger recording on the client-side)
  res.status(200).send("Recording started");
});

// Endpoint for stopping recording and uploading
app.post("/stop-recording-upload", upload.single("audio"), (req, res) => {
  // Logic to stop recording and handle the uploaded file
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }
  // Process the uploaded file, you can save it to a database or perform other actions
  res.status(200).send("Recording stopped and file uploaded successfully");
});

// Define the root path handler
app.get("/", (req, res) => {
  res.send("Welcome to the audio recording API");
});

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//--------

// const express = require("express");
// const multer = require("multer");
// const path = require("path");

// const app = express();
// const port = process.env.PORT || 2000; // Use the environment port if available

// // Multer configuration for file upload
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads/"); // Updated path to refer to the 'uploads' folder in the main project directory
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// // Enable CORS - Allow all origins
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

// const upload = multer({ storage: storage });

// // Endpoint for starting recording (simulated)
// app.post("/start-recording", (req, res) => {
//   // Logic to start recording (if using a frontend, this will trigger recording on the client-side)
//   res.status(200).send("Recording started");
// });

// // Endpoint for stopping recording and uploading
// app.post("/stop-recording-upload", upload.single("audio"), (req, res) => {
//   // Logic to stop recording and handle the uploaded file
//   if (!req.file) {
//     return res.status(400).send("No file uploaded");
//   }
//   // Process the uploaded file, you can save it to a database or perform other actions
//   res.status(200).send("Recording stopped and file uploaded successfully");
// });

// // Define the root path handler
// app.get("/", (req, res) => {
//   res.send("Welcome to the audio recording API");
// });

// // Serve uploaded files
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

//------

// const express = require("express");
// const multer = require("multer");
// const path = require("path");

// const app = express();
// const port = process.env.PORT || 2000;

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

// const upload = multer({ storage: storage });

// app.post("/start-recording", (req, res) => {
//   res.status(200).send("Recording started");
// });

// app.post("/stop-recording-upload", upload.single("audio"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send("No file uploaded");
//   }

//   // Set the content type explicitly to indicate an audio file
//   res.set("Content-Type", "audio/wav");

//   // Send the uploaded file as a response
//   res.status(200).sendFile(req.file.path);
// });

// app.get("/", (req, res) => {
//   res.send("Welcome to the audio recording API");
// });

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
