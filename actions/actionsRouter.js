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

router.get('/:id', (req, res) => {
    const { id } = req.params;
    getAction(id, res);

    // actionDb.get(id)
    //     .then(action => {
    //         console.log(action);
    //         if (action) {
    //             res.status(200).json(action);
    //         } else {
    //             res.status(404).json({ error: "Action with ID does not exist." });
    //         }
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.status(500).json({ error: "Error getting the action from the database", id: id });
    //     });
});

function getAction(id, res) {
    return actionDb.get(id)
        .then((action) => {
            console.log(action);
            if (action) {
                res.status(200).json(action);
            } else {
                res.status(404).json({ error: "Action with ID does not exist." });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Error getting the action from the database." });
        });
}

module.exports = router;