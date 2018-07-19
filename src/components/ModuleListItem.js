import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import './ModalStyle.css';
import './ModuleListItemStyle.css';

export default class ModuleListItem extends React.Component {
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
        this.props.delete(this.props.module.id)
        this.handleClose()
    }
    render() {
        var liStyle = {
            background: '#FFFFFF'
        };
        if (this.props.isSelected || this.state.hover_flag) {
            liStyle['background'] = '#88AAFF'
        }
        return (
            <div>
                <li className="list-group-item" style={liStyle}>
                    <Link onClick={this.props.onClick} to={`/course/${this.props.courseId}/module/${this.props.module.id}`}>{this.props.module.title}</Link>
                    <i id="moduleIcon" className="fa fa-trash" onClick={this.handleShow}></i>
                    <i id="moduleIcon" className="fa fa-pencil" onClick={() => { this.props.edit(this.props.module.id) }}></i>
                </li>
                <Modal dialogClassName="my-modal" show={this.state.show}>
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title>DELETE MODULE</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to delete this module?</Modal.Body>
                        <Modal.Footer>
                            <Button className="btn btn-primary btn-block"
                                onClick={this.onDeleteClicked} bsStyle="primary">Delete Module</Button>
                            <Button className="btn btn-primary btn-block"
                                onClick={this.handleClose}>Close</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal>
            </div>
        )
    }
}      
