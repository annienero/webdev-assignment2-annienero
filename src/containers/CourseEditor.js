import React, {Component} from 'react';
import ModuleList from '../containers/ModuleList';

class CourseEditor extends Component {
    constructor(props) {
        super(props);
        this.selectCourse = this.selectCourse.bind(this);
        this.state = {courseId: ''};
    }

    componentDidMount() {
        this.selectCourse(this.props.match.params.courseId);
    }

    componentWillReceiveProps(newProps){
        this.selectCourse(newProps.match.params.courseId);
    }
     

    selectCourse(courseId) {
        this.setState({courseId: courseId});
    }

    render() {
        return (
            <div>
                <h3>Course {this.state.courseId}</h3>
                <ModuleList courseId={this.state.courseId} moduleId={this.state.moduleId} />
            </div>
        )
     }
}

export default CourseEditor;