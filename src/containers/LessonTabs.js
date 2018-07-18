import React, {Component} from 'react';
import LessonServiceClient from '../services/LessonServiceClient';
import LessonTab from '../components/LessonTab';

export default class LessonTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {courseId: '', moduleId: '', lesson: {title: 'New Lesson'}, lessons: []};
        this.lessonService = LessonServiceClient.instance;
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setLessonTitle = this.setLessonTitle.bind(this);
        this.createLesson = this.createLesson.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
    }

    deleteLesson(lessonId) {
        this.lessonService
          .deleteLesson(lessonId)
          .then(() => {
            this.findAllLessonsForModule(this.state.courseId, this.state.moduleId)
         });
    }

    createLesson() {
        this.lessonService.createLesson(this.state.courseId, 
            this.state.moduleId, JSON.stringify(this.state.lesson))
            .then(() => {
                this.findAllLessonsForModule(this.state.courseId, this.state.moduleId);
             })
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
        this.findAllLessonsForModule(newProps.courseId, newProps.moduleId)
    }

    findAllLessonsForModule(courseId, moduleId) {
        this.lessonService.findAllLessonsForModule(courseId, moduleId)
           .then((lessons) => {this.setLessons(lessons)});
    }

    setLessons(lessons) {
        this.setState({lessons: lessons})
    }
     
    renderLessons() {
        let lessons = this.state.lessons.map((lesson) => {
            return <LessonTab className="nav-item" 
                key={lesson.id} 
                lesson={lesson}
                delete={this.deleteLesson}/>
        });
        return (
            <ul className="nav nav-tabs">{lessons}</ul>
        )
      

        // <ul className="nav nav-tabs">
        //         <li className="nav-item"><a className="nav-link active"
        //             href="/course/{this.state.courseId}/module/{this.state.moduleId}/lesson/{this.state.lessonId}">Active Tab</a></li>
        //         <li className="nav-item"><a className="nav-link"
        //             href="/tab2">Another Tab</a></li>
        //     </ul>
     }
      

    render() { 
        return(
            <div>
                <div>
                    <h4>Lesson Tabs for module {this.state.moduleId}</h4>
                    <input placeholder="New Lesson" value={this.state.lesson.title} onChange={this.setLessonTitle}/>
                    <button onClick={this.createLesson}>Create</button>
                </div>
                {this.renderLessons()}
            </div>
        );
    }
}