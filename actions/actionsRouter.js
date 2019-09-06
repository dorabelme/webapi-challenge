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


// POST requests for actions
router.post('/', (req, res) => {
    console.log(req.body);
    const { project_id, description, notes } = req.body;
    if (!project_id || !description || !notes) {
        return res.status(400).json({ error: "Requires project_id, description, and notes." });
    }
    actionDb.insert({ project_id, description, notes })
        .then(({ id }) => {
            getAction(id, res)
            // actionDb.get(id)
            //     .then(action => {
            //         console.log(action);
            //         if (action) {
            //             res.status(201).json(action);
            //         } else {
            //             res.status(404).json({ error: "Action with ID does not exist." })
            //         }
            //     })
            //     .catch(err => {
            //         console.log(err);
            //         res.status(500).json({ error: "Server error retrieving action." });
            //     });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Server error inserting action." });
        });
});


// DELETE request for actions
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    actionDb.remove(id)
        .then(deleted => {
            console.log(deleted);
            if (deleted) {
                res.status(204).end();
            } else {
                res.status(404).json({ error: "Project with ID does not exist." });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Server error deleting project." });
        });
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