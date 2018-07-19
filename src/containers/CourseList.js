import React, {Component} from 'react';
import CourseRow from '../components/CourseRow'
import CourseServiceClient from '../services/CourseServiceClient'
import './CourseManagerStyle.css';

class CourseList extends Component {
    constructor() {
        super();
        this.courseService = CourseServiceClient.instance;
        this.state = {courses: [], courseId: '', course: {title: 'New Course'}, buttonText: 'Add'};
        this.selectCourse = this.selectCourse.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.onAddUpdateClicked = this.onAddUpdateClicked.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.editCourse = this.editCourse.bind(this);
        this.updateCourse = this.updateCourse.bind(this);
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

    editCourse(courseId) { 
        this.setState({
            buttonText: 'Update Title',
            courseId: courseId
        }) 
    }
    
    updateCourse() { 
        this.courseService.updateCourse(this.state.courseId, JSON.stringify(this.state.course)).then(() => 
        { 
            this.setState({
                buttonText: 'Add'
            }) 
            this.findAllCourses(); 
        })
    }

    findAllCourses() {
        this.courseService.findAllCourses()
        .then(courses => {
            this.setState({courses: courses});
        });
    }
     
    courseRows() {
        var rows = this.state.courses.map(course =>
            <CourseRow course={course} key={course.id} delete={this.deleteCourse} edit={this.editCourse}/>
        )
        return rows
    }

    titleChanged(event) { 
        this.setState({
            course: { title: event.target.value }
        });     
    }

    onAddUpdateClicked() {
        if (this.state.buttonText === 'Add') {
            this.courseService.createCourse(JSON.stringify(this.state.course)).then(() => 
            { this.findAllCourses(); }
            )
        } else {
            this.updateCourse()
        }

    }

    render() {
        return (
            <div class="container">
                <div id="addCourse">
                    <th scope="col"><input className="form-control" onChange={this.titleChanged} placeholder="New Course"/></th>
                    <th scope="col"><button className="btn btn-primary btn-block"
                        onClick={this.onAddUpdateClicked}>{this.state.buttonText}</button></th>
                </div>

                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Title</th>
                            <th scope="col">Created</th>
                            <th scope="col">Modified</th>
                            <th/>
                            <th/>
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