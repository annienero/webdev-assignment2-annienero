import React, {Component} from 'react';
import ModuleList from '../containers/ModuleList';
import CourseServiceClient from '../services/CourseServiceClient';
import './CourseEditorStyle.css';


class CourseEditor extends Component {
    constructor(props) {
        super(props);
        this.selectCourse = this.selectCourse.bind(this);
        this.state = {courseId: '', courseTitle: ''};
    }

    componentDidMount() {
        this.selectCourse(this.props.match.params.courseId);
    }

    componentWillReceiveProps(newProps){
        this.selectCourse(newProps.match.params.courseId);
    }
     

    selectCourse(courseId) {
        this.setState({courseId: courseId});
        var courseService = CourseServiceClient.instance;
        courseService.findCourseById(courseId).then((course) => {
            this.setState({courseTitle: course.title});
        })
      
    }

    render() {
        return (
            <div>
                <h3>Current Course: {this.state.courseTitle}</h3>
                <ModuleList courseId={this.state.courseId} moduleId={this.state.moduleId} />
            </div>
        )
     }
}

export default CourseEditor;