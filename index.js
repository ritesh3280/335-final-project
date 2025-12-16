const express = require("express");
const app = express();
const path = require("path");
const portNumber = process.env.PORT || 7003;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// MongoDB connection
const mongoURI = process.env.MONGODB_URI || "mongodb+srv://vgandhi_db_user:FXKGiNlHYatqOPCs@songs-db.byy1dii.mongodb.net/pharmacy-app?retryWrites=true&w=majority";
mongoose.connect(mongoURI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "templates"));

// Import routes
const purchaseRoutes = require("./routes/purchaseRoutes");
const searchRoutes = require("./routes/searchRoutes");

// Use routes
app.use("/", purchaseRoutes);
app.use("/", searchRoutes);

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(portNumber, () => {
    console.log(`Server running on port ${portNumber}`);
});