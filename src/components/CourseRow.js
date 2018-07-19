import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap'
import './ModalStyle.css'

export default class CourseRow extends Component {
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
        this.props.delete(this.props.course.id)
        this.handleClose()
    }

    render() {
        return(
                <tr>
                    <td><i className="fa fa-file-text"/></td>
                    <td><Link to={`/course/${this.props.course.id}/edit`}>
                        {this.props.course.title}
                    </Link></td>
                    <td>{this.props.course.created}</td>
                    <td>{this.props.course.modified}</td>
                    <td><i className="fa fa-trash" onClick={this.handleShow}></i>
                        <i className="fa fa-pencil" onClick={() => { 
                        this.props.edit(this.props.course.id)}}></i>
                    </td>
                    <Modal dialogClassName="my-modal" show={this.state.show}>
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title>DELETE LESSON</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to delete this course?</Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.onDeleteClicked} bsStyle="primary">Delete Course</Button>
                            <Button onClick={this.handleClose}>Close</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal>
                </tr>
        )
    }
}