export default class ModuleList extends React.Component {
    constructor() { 
        super();
        this.state = { modules: [
           {title: 'Module 1 - jQuery', id: 123},
           {title: 'Module 2 - React', id: 234},
           {title: 'Module 3 - Redux', id: 345},
           {title: 'Module 4 - Angular', id: 456},
           {title: 'Module 5 - Node.js', id: 567},
           {title: 'Module 6 - MongoDB', id: 678},]
        };
    }
     
    render() { 
        return (
            <ul className="list-group">
                <ModuleListItem/>
                <ModuleListItem/>
            </ul>
        );
    }
}

class ModuleListItem extends React.Component {
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