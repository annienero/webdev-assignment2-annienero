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