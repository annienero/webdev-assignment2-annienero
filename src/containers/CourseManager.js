import React, {Component} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

class CourseCard extends Component {
    render() {
        return(
            <div className="card" styles={{width: '18rem'}}>
                <img className="card-img-top"
                    src="https://picsum.photos/300/200"/>
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Card text.</p>
                    <a href="#" className="btn btn-primary">More...</a>
                </div>
            </div>)
    }
}

export default class CourseManager extends Component {
    render() {
        return (
            <div className="container-fluid">
                <h1>Course Manager</h1>
                <div className="card-deck">
                    <CourseCard/>
                    <CourseCard/>
                </div>
            </div>
        )
    }  
}

export default class ModuleListItem extends React.Component {
    render() {
        return (
            <li className="list-group-item">
                {this.props.title} // for dynamic setting
                <i className="fa fa-trash"></i>
                <i className="fa fa-pencil"></i>
            </li>
        );
    }
}

export default class ModuleList extends React.Component {
    render() { 
        return (
            <ul className="list-group">
                <ModuleListItem/>
                <ModuleListItem/>
            </ul>
        );
    }
}
export default class LessonTabs extends React.Component {
    render() { 
        return(
            <ul class="nav nav-tabs">
                <li class="nav-item"><a class="nav-link active"
                    href="#">Active Tab</a></li>
                <li class="nav-item"><a class="nav-link"
                    href="#">Another Tab</a></li>
            </ul>
);}}