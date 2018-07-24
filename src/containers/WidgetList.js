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
        let widgets = this.props.widgets.sort((widget1, widget2) => widget1.widgetOrder > widget2.widgetOrder)
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
                    
                    {widgets.map(widget => (
                        <WidgetContainer key={widget.id} 
                            widget={widget}/>
                    ))}
                </ul>
                <button onClick={this.props.addWidget}>Add Widget</button>
            </div>
        )
    }
}

const stateToPropertiesMapperForWidgetList = (state) => {
    return {
        widgets: state.widgets,
        showPreview: state.showPreview
    }
}
const dispatcherToPropertiesMapperForWidgetList = dispatch => ({
    findAllWidgets: () => findAllWidgets(dispatch),
    addWidget: () => addWidget(dispatch),
    save: () => save(dispatch),
    togglePreview: () => togglePreview(dispatch)
})

export const WidgetEditor = connect(stateToPropertiesMapperForWidgetList, dispatcherToPropertiesMapperForWidgetList)(WidgetList)
