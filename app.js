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

///------ -- - - -- - - -- - - - -- -- ---- --
///------ -- - - -- - - -- - - - -- -- ---- --

///------ -- - - -- - - -- - - - -- -- ---- --
///------ -- - - -- - - -- - - - -- -- ---- --

///------ -- - - -- - - -- - - - -- -- ---- --

const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const port = process.env.PORT || 2000;

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "audio") {
      cb(null, "./uploads/audio/");
    } else if (file.fieldname === "photo") {
      cb(null, "./uploads/photo/");
    } else {
      cb({ message: "Invalid field" }, null);
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Enable CORS - Allow all origins
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const upload = multer({ storage: storage });

app.post("/start-recording", (req, res) => {
  res.status(200).send("Recording started");
});

// Modified endpoint to handle both audio and photo uploads
app.post(
  "/stop-recording-upload",
  upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "photo", maxCount: 1 },
  ]),
  (req, res) => {
    if (!req.files || !req.files["audio"] || !req.files["photo"]) {
      return res.status(400).send("Both audio and photo files are required");
    }
    // Logic to handle the uploaded audio and photo files
    // Access files using req.files['audio'][0] and req.files['photo'][0]
    res.status(200).send("Recording stopped and files uploaded successfully");
  }
);

app.get("/", (req, res) => {
  res.send("Welcome to the audio and photo recording API");
});

app.use(
  "/uploads/audio",
  express.static(path.join(__dirname, "uploads/audio"))
);
app.use(
  "/uploads/photo",
  express.static(path.join(__dirname, "uploads/photo"))
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


//