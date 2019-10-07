import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Card, Icon, Image, Button, Modal, Header, List } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './projectCard.scss';

function ProjectCard(props) {
    const [actions, setActions] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/projects/${props.id}/actions`)
            .then(res => {
                console.log(res);
                setActions(res.data)
            })
            .catch(err => {
                console.log(err)
            });
    }, []);

    return (
        <Card>
            <Card.Content>
                <Card.Header>{props.project.name}</Card.Header>
                <Card.Meta>{props.project.description}</Card.Meta>
                <Modal trigger={<Button>Actions</Button>}>
                    <Modal.Header>Actions</Modal.Header>
                    <Modal.Content image>
                        <Image wrapped size='medium' src='https://blog.hubspot.com/hubfs/To_Do_List.png' />
                        <Modal.Description>
                            <Header>Description:{actions.map(action => <List.Item>{action.description}</List.Item>)}</Header>
                            <List>
                                {actions.map(action => <List.Item>{action.notes}</List.Item>)}
                            </List>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </Card.Content>
            <Card.Content extra>
                <a>
                    <Icon name='like' />
                    Likes
                </a>
                <a>
                    <Icon name='share alternate' />
                    Shares
                </a>
            </Card.Content>
        </Card>
    )
}

export default ProjectCard;
