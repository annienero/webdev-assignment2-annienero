import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import './ModalStyle.css';
import './LessonTabStyle.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { WidgetReducer } from '../reducers/WidgetReducer'
import { WidgetEditor } from '../containers/WidgetList'

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
        let store = createStore(WidgetReducer)
        return (
            <div>
                <i id="lessonIcon" className="fa fa-trash fa-3x" onClick={this.handleShow}></i>
                <i id="lessonIcon" className="fa fa-pencil fa-3x" 
                    onClick={() => { this.props.edit(this.props.lesson.id) }}></i>
                <Provider store={store}>
                    <WidgetEditor lessonId={this.props.lesson.id}/>
                </Provider>
                <Modal dialogClassName="my-modal" show={this.state.show}>
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title>DELETE LESSON</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to delete this lesson?</Modal.Body>
                        <Modal.Footer>
                            <Button className="btn btn-primary btn-block"
                                onClick={this.onDeleteClicked} bsStyle="primary">Delete Lesson</Button>
                            <Button className="btn btn-primary btn-block"
                                onClick={this.handleClose}>Close</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal>
            </div>
        )
    }
}      
