import React, {Component} from 'react';
import LessonServiceClient from '../services/LessonServiceClient';
import LessonTab from '../components/LessonTab';
import 'bootstrap/dist/css/bootstrap.min.css'

export default class LessonTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {courseId: '', moduleId: '', lessonId: '', 
            lesson: {title: 'New Lesson'}, lessons: [], buttonText: 'Add'};
        this.lessonService = LessonServiceClient.instance;
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setLessonTitle = this.setLessonTitle.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
        this.onAddUpdateClicked = this.onAddUpdateClicked.bind(this);
        this.editLesson = this.editLesson.bind(this);
        this.updateLesson = this.updateLesson.bind(this);
        this.onTabSelected = this.onTabSelected.bind(this);
    }

    deleteLesson(lessonId) {
        this.lessonService
          .deleteLesson(lessonId)
          .then(() => {
            this.findAllLessonsForModule(this.state.courseId, this.state.moduleId)
         });
    }

    onAddUpdateClicked() {
        if (this.state.buttonText === 'Add') {
            this.lessonService.createLesson(this.state.courseId, 
                this.state.moduleId, JSON.stringify(this.state.lesson))
                .then(() => {
                    this.findAllLessonsForModule(this.state.courseId, this.state.moduleId);
            })
        } else {
            this.updateLesson()
        }
        
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

    editLesson(lessonId) { 
        this.setState({
            buttonText: 'Update Title',
            lessonId: lessonId
        }) 
    }
    
    updateLesson() { 
        this.lessonService.updateLesson(this.state.lessonId, JSON.stringify(this.state.lesson)).then(() => 
        { 
            this.setState({
                buttonText: 'Add'
            }) 
            this.findAllLessonsForModule(this.state.courseId, this.state.moduleId); 
        })
    }

    onTabSelected(lessonId) {
        this.setState({
            lessonId: lessonId
        })
        this.renderLessons
    }
     
    renderLessons() {
        let lessons = this.state.lessons.map((lesson) => {
            return <LessonTab className="nav-item" 
                key={lesson.id} 
                lesson={lesson}
                delete={this.deleteLesson}
                edit={this.editLesson}/>
        });

        //"nav-link" or "nav-link active"
        return (
            <ul className="nav nav-tabs">{lessons}</ul>
        )
     }
      

    render() { 
        return(
            <div>
                <div>
                    <h4>Lesson Tabs for module {this.state.moduleId}</h4>
                    <input placeholder="New Lesson" value={this.state.lesson.title} onChange={this.setLessonTitle}/>
                    <button onClick={this.onAddUpdateClicked}>{this.state.buttonText}</button>
                </div>
                {this.renderLessons()}
            </div>
        );
    }
}