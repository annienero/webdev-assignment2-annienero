import React, {Component} from 'react';
import ModuleServiceClient from '../services/ModuleServiceClient';
import ModuleListItem from '../components/ModuleListItem';

//TODO edit modules
export default class ModuleList extends Component {
    constructor(props) {
        super(props);
        this.state = {courseId: '',
            module: {title: ''},
            modules: []
        }
        this.moduleService = ModuleServiceClient.instance;
        this.renderModules = this.renderModules.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleTitle = this.setModuleTitle.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
        this.createModule = this.createModule.bind(this);
    }

    deleteModule(moduleId) {
        this.moduleService
          .deleteModule(moduleId)
          .then(() => {
            this.findAllModulesForCourse
              (this.state.courseId)
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

    createModule() {
        this.moduleService.createModule(this.state.courseId, JSON.stringify(this.state.module)).then(() => {
            this.findAllModulesForCourse
               (this.state.courseId);
         })
    }

    renderModules() {
        let modules = this.state.modules.map((module) => {
           return <ModuleListItem key={module.id} module={module} delete={this.deleteModule}/>
        });
        return (<ul>{modules}</ul>)
    }
     
    render() { 
        return (
            <ul className="list-group">
                <div>
                    <h4>Module List for courseId:
                        {this.state.courseId}</h4>
                    <input onChange={this.setModuleTitle} value={this.state.module.title}/>
                    <button onClick={this.createModule}>Create</button>
                </div>
                {this.renderModules()}
            </ul>
        );
    }   
}