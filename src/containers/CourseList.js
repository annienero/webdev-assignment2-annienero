import React, {Component} from 'react';
import CourseRow from '../components/CourseRow'
import CourseServiceClient from '../services/CourseServiceClient'


// TODO  Each course row displays 4 columns:  the title of the course, 
// the owner of the course, the date and time last modified. 
// An icon is shown to the left of the title.

class CourseList extends Component {
    constructor() {
        super();
        this.courseService = CourseServiceClient.instance;
        this.state = {courses: [], courseId: ''};
        this.selectCourse = this.selectCourse.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
    }

    componentDidMount() {
        this.findAllCourses()
    }

    selectCourse(courseId) {
        this.setState({courseId: courseId});
    }
     
    deleteCourse(courseId) { 
        this.courseService.deleteCourse(courseId).then(() => 
        { this.findAllCourses(); })
    }

    findAllCourses() {
        this.courseService.findAllCourses()
        .then(courses => {
            this.setState({courses: courses});
        });
    }
     
    courseRows() {
        var rows = this.state.courses.map(course =>
            <CourseRow course={course} key={course.id} delete={this.deleteCourse}/>
        )
        return rows
    }

    titleChanged(event) { 
        this.setState({
            course: { title: event.target.value }
        });     
    }

    createCourse() {
        //TODO doesnt work
        if (this.state.course.name === '') {
            this.setState({
                course: { title: 'New Course' }
            });    
        }
        this.courseService.createCourse(JSON.stringify(this.state.course)).then(() => 
            { this.findAllCourses(); }
        )
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th><input className="form-control" onChange={this.titleChanged} placeholder="cs4550"/></th>
                            <th><button onClick={this.createCourse}>Add</button></th>
                        </tr>
                        <tr>
                            <th>Title</th>
                            <th>Created</th>
                            <th>Modified</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.courseRows()}
                    </tbody>
                </table>
            </div>
        )
    }  
}

export default CourseList;