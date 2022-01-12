// TODO: confirm these are working!
const router = require("express").Router();
const db = require("../models");


// Aggregate function to add totalDuration
router.get("/api/workouts", (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ])
    .then((workouts) => {
      res.json(workouts);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// Route to add sort
router.get("/api/workouts/range", (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises:duration" },
      },
    },
  ])
    .sort({ _id: -1 })
    .limit(10)
    .then((stats) => {
      res.json(stats);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// Create a new workout
router.post("/api/workouts", ({ body }, res) => {
  console.log(body);
  db.Workout.create({})
    .then((newWorkout) => {
      res.json(newWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// Route to add exercise to current workout
router.put("/api/workouts/:id", (req, res) => {
  db.Workout.findByIdAndUpdate(
    req.params.id,
    { $push: { exercises: req.body } },
    { new: true }
  )
    .then((updateWorkout) => {
      res.json(updateWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// Route to delete a workout
// router.delete("/api/workouts/:id", (req, res) => {
//   db.Workout.findByIdAndDelete(req.params.id)
//     .then((results) => {
//       res.json(results);
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });
// });

module.exports = router;
