import React, {Component} from 'react';
import LessonServiceClient from '../services/LessonServiceClient';

export default class LessonTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {courseId: '', moduleId: '', lesson: {title: ''}};
        this.lessonService = LessonServiceClient.instance;
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setLessonTitle = this.setLessonTitle.bind(this);
        this.createLesson = this.createLesson.bind(this);
    }

    createLesson() {
        alert(JSON.stringify(this.state.lesson))
        this.lessonService.createLesson(this.state.courseId, this.state.moduleId, JSON.stringify(this.state.lesson));
    }
     
    setLessonTitle(event) {
        this.setState({lesson: {
            title: event.target.value
        }})
    }
     
    
    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }
    
    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);
     }
     componentWillReceiveProps(newProps){
        this.setCourseId(newProps.courseId);
        this.setModuleId(newProps.moduleId);
     }

    render() { 
        return(
            <div>
                <div>
                    <h4>Lesson Tabs for module {this.state.moduleId}</h4>
                    <input placeholder="New Lesson" value={this.state.lesson.title} onChange={this.setLessonTitle}/>
                    <button onClick={this.createLesson}>Create</button>
                </div>
            <ul className="nav nav-tabs">
                <li className="nav-item"><a className="nav-link active"
                    href="/course/{this.state.courseId}/module/{this.state.moduleId}/lesson/{this.state.lessonId}">Active Tab</a></li>
                <li className="nav-item"><a className="nav-link"
                    href="/tab2">Another Tab</a></li>
            </ul>
            </div>
        );
    }
}