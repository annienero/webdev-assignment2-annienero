import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import CourseList from './CourseList'
import CourseEditor from './CourseEditor'
import ModuleList from './ModuleList'
import './CourseManagerStyle.css';


export default class CourseManager extends Component {
    render() {
        return (
            <Router>
                <div>
                    <h1 id="header">Course Manager</h1>
                    <Route path="/course/list" component={CourseList}></Route>
                    <Route path="/course/:courseId/edit" component={CourseEditor}></Route>
                    <Route path="/course/:courseId/module/:moduleId/"component={ModuleList}/>
                </div>   
            </Router>            
        )
    }  
}
    