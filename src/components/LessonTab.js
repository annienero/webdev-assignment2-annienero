import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import './ModalStyle.css';


export default class LessonTab extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            show: false
        };
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.onDeleteClicked = this.onDeleteClicked.bind(this)
     }

    handleClose() {
        this.setState({ show: false });
    }
    
    handleShow() {
        this.setState({ show: true });
    }

    onDeleteClicked() {
        this.props.delete(this.props.lesson.id)
        this.handleClose()
    }
     
    render() {
        return (
            <li className="nav-item" onClick={this.props.onClick}>
            <a className={this.props.active}>
                        {this.props.lesson.title}
                    <button onClick={this.handleShow}>DELETE</button>
                    <button onClick={() => 
                    {this.props.edit(this.props.lesson.id)}}
                    >EDIT</button>
             </a>
             <Modal dialogClassName="my-modal" show={this.state.show}>
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>DELETE LESSON</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this lesson?</Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.onDeleteClicked} bsStyle="primary">Delete Lesson</Button>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
             </li>
             
        )
    }
}      
