import React, {Component} from 'react';
import CourseRow from '../components/CourseRow'
import CourseServiceClient from '../services/CourseServiceClient'

class CourseList extends Component {
    constructor() {
        super();
        this.courseService = CourseServiceClient.instance;
        this.state = {courses: []};
        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);
    }
    componentDidMount() {
        this.courseService.findAllCourses()
            .then(courses => {
                this.setState({courses: courses});
        });
    }
     
    courseRows() {
        var rows = this.state.courses.map(function(course) {
            return <CourseRow course={course} key={course.id}/>
        });
        return rows
    }

    titleChanged(event) { 
        this.setState({
            course: { title: event.target.value }
        });     
    }

    createCourse() { 
        this.courseService.createCourse(JSON.stringify(this.state.course))
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Created</th>
                            <th>Modified</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.courseRows()}
                        <tr>
                            <th><input onChange={this.titleChanged} placeholder="cs4550"/></th>
                            <th><button onClick={this.createCourse}>Add</button></th>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }  
}

export default CourseList;