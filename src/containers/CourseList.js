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
           return <CourseRow course={course}/>
        });
        return rows
    }
     
    render() {
        return (
            <div>
                <h1>Course List</h1>
                {/* <div>
                    <table>
                        <thead><tr><th>Title</th></tr></thead>
                        <tbody>
                            {this.courseRows()}
                        </tbody>
                    </table>
                </div> */}
            </div>
        )
    }  
}

export default CourseList;