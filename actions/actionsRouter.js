const express = require("express");
const actionDb = require("../data/helpers/actionModel.js");

const router = express.Router();

// GET requests for actions
router.get('/', (req, res) => {
    actionDb.get()
        .then(actions => res.status(200).json(actions))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The actions information could not be retrieved." });
        });
});

module.exports = router;