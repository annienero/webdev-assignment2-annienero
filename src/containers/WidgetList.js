import React, {Component} from 'react';
import {WidgetContainer} from '../components/Widget'
import {findAllWidgets, addWidget, save} from '../actions/WidgetActions'
import {connect} from 'react-redux';


class WidgetList extends Component {
    constructor(props) {
        super(props)
        this.props.findAllWidgets()
    }
    render() {
        return(
            <div>
             <h1>Widget List</h1>
             <button onClick={this.props.save}>Save</button>
             <ul>
                 {this.props.widgets.map(widget => (
                    <WidgetContainer key={widget.id} widget={widget}/>
                ))}
            </ul>
            <button onClick={this.props.addWidget}>Add Widget</button>
        </div>
        )
    }
}

const stateToPropertiesMapper = (state) => (
    {
        widgets: state.widgets
    }
)
const dispatcherToPropertiesMapper = dispatch => ({
    findAllWidgets: () => findAllWidgets(dispatch),
    addWidget: () => addWidget(dispatch),
    save: () => save(dispatch)
})

export const App = connect(stateToPropertiesMapper, dispatcherToPropertiesMapper)(WidgetList)
