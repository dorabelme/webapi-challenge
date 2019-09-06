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

router.get('/:id', (req, res) => {
    const { id } = req.params;
    getProject(id, res);
    // projectDb.get(id)
    //     .then(project => {
    //         console.log(project);
    //         if (project) {
    //             res.status(200).json(project);
    //         } else {
    //             res.status(404).json({ error: "Project with ID does not exist."});
    //         }
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.status(500).json({ error: "Error getting the project from the database", id: id});
    //     });
});


// POST request for projects
router.post('/', (req, res) => {
    console.log(req.body);
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).json({ error: "Requires name and description." });
    }
    projectDb.insert({ name, description })
        .then(({ id }) => {
            getProject(id, res)
            // projectDb.get(id)
            //     .then(project => {
            //         console.log(project);
            //         if (project) {
            //             res.status(201).json(project);
            //         } else {
            //             res.status(404).json({error: "Project with ID does not exist."})
            //         }
            //     })
            //     .catch(err => {
            //         console.log(err);
            //         res.status(500).json({ error: "Server error retrieving project."});
            //     });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Server error inserting project." });
        });
});


// DELETE request for projects
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    projectDb.remove(id)
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


// PUT request for projects
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    if (!name && !description) {
        return res.status(400).json({ error: 'Requires name and description.' });
    }
    projectDb.update(id, { name, description })
        .then(updated => {
            console.log(updated);
            if (updated) {
                getProject(id, res);
                // projectDb.get(id)
                //     .then(project => res.status(200).json(project))
                //     .catch(err => {
                //         console.log(err);
                //         res.status(500).json({ error: "Error retrieving project."});
                //     });
            } else {
                res.status(404).json({ error: "Project with ID is not found." });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Server error updating project." });
        });
});


// GET actions for a project
router.get('/:project_id/actions', (req, res) => {
    const { project_id } = req.params;
    projectDb.get(project_id)
        .then((project) => {
            if (project) {
                projectDb.getProjectActions(project_id)
                    .then(actions => {
                        res.status(200).json(actions);
                    })
            } else {
                res.status(404).json({ error: "Project with ID does not exist." });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Server error getting project actions." });
        });
});

function getProject(id, res) {
    return projectDb.get(id)
        .then((project) => {
            console.log(project);
            if (project) {
                res.status(200).json(project);
            } else {
                res.status(404).json({ error: "Project with ID does not exist." });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Error getting the project from the database." });
        });
}



module.exports = router;