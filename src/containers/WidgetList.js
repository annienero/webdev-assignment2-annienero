import React, { Component } from 'react';
import { WidgetContainer } from '../components/Widget'
import { findAllWidgets, addWidget, save, moveDown, moveUp, togglePreview } from '../actions/WidgetActions'
import { connect } from 'react-redux';


class WidgetList extends Component {
    constructor(props) {
        super(props)
        this.props.findAllWidgets()
    }
    render() {
        return (
            <div>
                <h1>Widget List</h1>
                <button onClick={this.props.save}>Save</button>
                <label>
                    <input
                        type="checkbox"
                        onChange={this.props.togglePreview}
                        />Preview
                </label>
                <ul>
                    {this.props.widgets.map(widget => (
                        <WidgetContainer key={widget.id} widget={widget} />
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
    save: () => save(dispatch),
    moveUp: () => moveUp(dispatch),
    moveDown: () => moveDown(dispatch),
    togglePreview: () => togglePreview(dispatch)
})

export const App = connect(stateToPropertiesMapper, dispatcherToPropertiesMapper)(WidgetList)
