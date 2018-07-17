import React, {Component} from 'react';
import CourseRow from '../components/CourseRow'
import CourseServiceClient from '../services/CourseServiceClient'

class CourseList extends Component {
    constructor() {
        super();
        this.courseService = CourseServiceClient.instance;
        this.state = {courses: []};
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
                            <th><input id="titleFld" placeholder="cs4550"/></th>
                            <th><button>Add</button></th>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }  
}

export default CourseList;