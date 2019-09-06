const express = require("express");
const projectDb = require("../data/helpers/projectModel.js");

const router = express.Router();

// GET requests for projects
router.get('/', (req, res) => {
    projectDb.get()
        .then(projects => res.status(200).json(projects))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The projects information could not be retrieved." });
        });
});


module.exports = router;