import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import CourseList from './CourseList'

export default class CourseManager extends Component {
    render() {
        return (
            <div>
                <h1>Course Manager</h1>
                <div><CourseList/></div>
            </div>                  
        )
    }  
}
    