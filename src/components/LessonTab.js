import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import './lessontabstyle.css';


export default class LessonTab extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            bgColor: 'white',
            show: false
        };
        this.onTabClicked = this.onTabClicked.bind(this)
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

    onTabClicked() {
        this.setState({
            bgColor: 'blue'
        })
    }

    onDeleteClicked() {
        this.props.delete(this.props.lesson.id)
        this.handleClose()
    }
     
    render() {
        return (
            <div>
            <li className="nav-item" onClick={this.onTabClicked}>
            <a className="nav-link active" style={{backgroundColor:this.state.bgColor}}>
                        {this.props.lesson.title}
                    <button onClick={this.handleShow}>DELETE</button>
                    <button onClick={() => 
                    {this.props.edit(this.props.lesson.id)}}
                    >EDIT</button>
             </a>
             </li>
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
         </div>
        )
    }
}      
