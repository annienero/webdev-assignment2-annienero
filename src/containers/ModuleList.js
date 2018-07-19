import React, { Component } from 'react';
import ModuleServiceClient from '../services/ModuleServiceClient';
import ModuleListItem from '../components/ModuleListItem';
import ModuleEditor from './ModuleEditor';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './CourseManagerStyle.css';


export default class ModuleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            moduleId: '',
            module: { title: 'New Module' },
            modules: [],
            buttonText: 'Add',
            selectedItem: null
        }
        this.moduleService = ModuleServiceClient.instance;
        this.renderModules = this.renderModules.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleTitle = this.setModuleTitle.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
        this.onAddUpdateClicked = this.onAddUpdateClicked.bind(this);
        this.editModule = this.editModule.bind(this);
        this.updateModule = this.updateModule.bind(this);
        this.moduleClicked = this.moduleClicked.bind(this);
    }

    moduleClicked(id) {
        this.setState({ selectedItem: id });
    }

    deleteModule(moduleId) {
        const location = "https://webdev-assignment2.herokuapp.com/course/" + this.state.module.id + "/edit";
        window.location.href = location;
        this.moduleService
            .deleteModule(moduleId)
            .then(() => {
                this.setState({ selectedItem: null },
                    this.findAllModulesForCourse(this.state.courseId));
            });
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.courseId);
        this.findAllModulesForCourse(newProps.courseId)
    }

    findAllModulesForCourse(courseId) {
        this.moduleService
            .findAllModulesForCourse(courseId)
            .then((modules) => {
                this.setState({ modules: modules })
            });
    }

    setModules(modules) {
        this.setState({ modules: modules })
    }

    setModuleTitle(event) {
        this.setState({
            module: {
                title: event.target.value
            }
        })
    }

    setCourseId(courseId) {
        this.setState({ courseId: courseId });
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
    }

    onAddUpdateClicked() {
        if (this.state.buttonText === 'Add') {
            this.moduleService.createModule(this.state.courseId, JSON.stringify(this.state.module)).then(() => {
                this.findAllModulesForCourse(this.state.courseId);
            })
        } else {
            this.updateModule()
        }
    }

    renderModules() {
        let modules = this.state.modules.map((module) => {
            var selected = this.state.selectedItem == module.id;
            return <ModuleListItem key={module.id} module={module}
                onClick={this.moduleClicked.bind(this, module.id)} isSelected={selected}
                courseId={this.state.courseId} delete={this.deleteModule} edit={this.editModule} />
        });
        return (<ul className="list-group">{modules}</ul>)
    }

    editModule(moduleId) {
        this.moduleService.findModuleById(moduleId)
            .then(module => {
                this.setState({
                    buttonText: 'Update Title',
                    moduleId: moduleId,
                    module: { title: module.title }
                })
            })
    }

    updateModule() {
        this.moduleService.updateModule(this.state.moduleId, JSON.stringify(this.state.module)).then(() => {
            this.setState({
                buttonText: 'Add',
                module: { title: 'New Module' }
            })
            this.findAllModulesForCourse(this.state.courseId);
        })
    }

    render() {
        return (
            <Router>
                <div className="container">
                    <div className="col-sm-4 col-md-4 col-lg-4">
                        <ul className="list-group">
                            <div class="input-group">
                                <input type="text" class="form-control" id="addElement"
                                    value={this.state.module.title}
                                    onChange={this.setModuleTitle} placeholder="New Module"/>
                                <span class="input-group-btn">
                                    <button class="btn btn-primary" type="button"
                                    onClick={this.onAddUpdateClicked}>
                                        {this.state.buttonText}</button>
                                </span>
                            </div>
                            {this.renderModules()}
                        </ul>
                    </div>
                    <div className="col-sm-8 col-md-8 col-lg-8">
                        <div>
                            <Route path="/course/:courseId/module/:moduleId/"
                                component={ModuleEditor} />
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}