const router = require("express").Router();
const db = require("../models");
const fs = require("fs");
const path = require("path");

// route to get to homepage
router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// route to get to stats page
router.get("/stats", function(req, res){
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});

// route to get to exercise page to begin a workout
router.get("/exercise", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

module.exports = router;