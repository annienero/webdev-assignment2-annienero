import React, { Component } from 'react';
import LessonServiceClient from '../services/LessonServiceClient';
import LessonTab from '../components/LessonTab';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tabs, Tab } from 'react-bootstrap';
import './CourseManagerStyle.css';


export default class LessonTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '', moduleId: '', lessonId: '',
            lesson: { title: 'New Lesson' }, lessons: [], buttonText: 'Add'
        };
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
        this.setState({
            lesson: {
                title: event.target.value
            }
        })
    }


    setCourseId(courseId) {
        this.setState({ courseId: courseId });
    }

    setModuleId(moduleId) {
        this.setState({ moduleId: moduleId });
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.courseId);
        this.setModuleId(newProps.moduleId);
        this.findAllLessonsForModule(newProps.courseId, newProps.moduleId)
    }

    findAllLessonsForModule(courseId, moduleId) {
        this.lessonService.findAllLessonsForModule(courseId, moduleId)
            .then((lessons) => { this.setLessons(lessons) });
    }

    setLessons(lessons) {
        this.setState({ lessons: lessons })
    }

    editLesson(lessonId) {
        this.lessonService.findLessonById(lessonId)
            .then(lesson => {
                this.setState({
                    buttonText: 'Update Title',
                    lessonId: lessonId,
                    lesson: { title: lesson.title }
                })
            })
    }

    updateLesson() {
        this.lessonService.updateLesson(this.state.lessonId, JSON.stringify(this.state.lesson)).then(() => {
            this.setState({
                buttonText: 'Add',
                lesson: { title: 'New Lesson' }
            })
            this.findAllLessonsForModule(this.state.courseId, this.state.moduleId);
        })
    }

    onTabSelected(lessonId) {
        this.setState({
            lessonId: lessonId
        })
        this.renderLessons()
    }

    renderLessons() {
        var i = 0;
        let lessons = this.state.lessons.map((lesson) => {
            i++;
            return <Tab eventKey={i} title={lesson.title}>
                <LessonTab
                    lesson={lesson}
                    delete={this.deleteLesson}
                    edit={this.editLesson} />
            </Tab>
        });

        return (
            <Tabs defaultActiveKey={1}>{lessons}</Tabs>
        )
    }

    render() {
        return (
            <div>
                <div className="form-check-inline" id="addElement">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="New Lesson" value={this.state.lesson.title} onChange={this.setLessonTitle} />
                        <span class="input-group-btn">
                            <button class="btn btn-primary" type="button"
                            onClick={this.onAddUpdateClicked}>{this.state.buttonText}</button>
                        </span>
                    </div>
                    
                </div>
                {this.renderLessons()}
            </div>
        );
    }
}