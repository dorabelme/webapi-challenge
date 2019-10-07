import React, { useState, useEffect } from 'react';
import axios from "axios";
import ProjectCard from "./Card.js";
import '../App.css';


function Project() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/projects")
            .then(res => {
                console.log(res);
                setProjects(res.data)
            })
            .catch(err => {
                console.log(err)
            });
    }, []);


    return (
        <div className="cards">
            {projects.map(project => <ProjectCard id={project.id} project={project} />)}
        </div>
    )
}

export default Project;
