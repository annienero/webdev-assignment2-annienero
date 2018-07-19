import React, {Component} from 'react';
import ModuleServiceClient from '../services/ModuleServiceClient';
import ModuleListItem from '../components/ModuleListItem';
import ModuleEditor from './ModuleEditor';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Route} from 'react-router-dom';

export default class ModuleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            moduleId: '',
            module: {title: 'New Module'},
            modules: [],
            buttonText: 'Add'
        }
        this.moduleService = ModuleServiceClient.instance;
        this.renderModules = this.renderModules.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleTitle = this.setModuleTitle.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
        this.onAddUpdateClicked = this.onAddUpdateClicked.bind(this);
        this.editModule = this.editModule.bind(this);
        this.updateModule = this.updateModule.bind(this);
    }
    
    deleteModule(moduleId) {
        this.moduleService
          .deleteModule(moduleId)
          .then(() => {
            this.findAllModulesForCourse(this.state.courseId)
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
            this.setState({modules: modules})});
    }
     
    setModules(modules) {
        this.setState({modules: modules})
    }
     
    setModuleTitle(event) {
        this.setState({ 
            module: {
                title: event.target.value
            }
        })
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
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
           return <ModuleListItem key={module.id} module={module} 
            courseId={this.state.courseId} delete={this.deleteModule} edit={this.editModule}/>
        });
        return (<ul className="list-group">{modules}</ul>)
    }

    editModule(moduleId) { 
        this.setState({
            buttonText: 'Update Title',
            moduleId: moduleId
        }) 
    }
    
    updateModule() { 
        this.moduleService.updateModule(this.state.moduleId, JSON.stringify(this.state.module)).then(() => 
        { 
            this.setState({
                buttonText: 'Add'
            }) 
            this.findAllModulesForCourse(this.state.courseId); 
        })
    }

    render() { 
        return (
            <Router>
                <div class="container">
                    <div class="col-sm-4 col-md-4 col-lg-4">
                        <div class="col-4">
                            <div>
                                <h4>Module List for courseId:
                                    {this.state.courseId}</h4>
                                <ul className="list-group">
                                    <div>   
                                        <input className="form-control" onChange={this.setModuleTitle} placeholder="New Module"/>
                                        <button className="btn btn-primary btn-block"
                                            onClick={this.onAddUpdateClicked}>{this.state.buttonText}</button>
                                    </div>
                                    {this.renderModules()}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-8 col-md-8 col-lg-8">
                        <div class="col-8">
                            <div>
                                <Route path="/course/:courseId/module/:moduleId"
                                    component={ModuleEditor}/>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }   
}