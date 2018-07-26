import React, { Component } from 'react';
import { WidgetContainer } from '../components/Widget'
import { findAllWidgets, addWidget, save, togglePreview } from '../actions/WidgetActions'
import { connect } from 'react-redux';
import './WidgetListStyle.css'


class WidgetList extends Component {
    constructor(props) {
        super(props)
        this.props.findAllWidgets(this.props.lessonId)
    }
    render() {
        let widgets = this.props.widgets.sort((widget1, widget2) => widget1.widgetOrder > widget2.widgetOrder)
        return (
            <div id="widgetlist">
                <h1>Widget List</h1>
                <button id="checkbox" className="btn btn-primary" onClick={() => this.props.save(this.props.lessonId)}>Save</button>
                    <label>
                        <input
                            type="checkbox"
                            onChange={this.props.togglePreview}
                            /> Preview
                    </label>
                <ul className="list-unstyled">
                    {widgets.map(widget => (
                        <WidgetContainer key={widget.id} 
                            widget={widget}/>
                    ))}
                </ul>
                <button className="btn btn-primary" onClick={this.props.addWidget}>Add Widget</button>
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
    findAllWidgets: (id) => findAllWidgets(dispatch, id),
    addWidget: () => addWidget(dispatch),
    save: (id) => save(dispatch, id),
    togglePreview: () => togglePreview(dispatch)
})

export const WidgetEditor = connect(stateToPropertiesMapperForWidgetList, dispatcherToPropertiesMapperForWidgetList)(WidgetList)
