import React, {Component} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import CourseRow from './components/CourseRow'

export default class CourseManager extends Component {
    render() {
        return (
            <div className="container-fluid">
                <h1>Course Manager</h1>
                <div className="card-deck">
                    <CourseRow/>
                    <CourseRow/>
                </div>
            </div>
        )
    }  
}