import React from 'react'
import { connect } from 'react-redux'
import { stateToPropertiesMapperForWidget } from './Widget'
import {updateWidget } from '../actions/WidgetActions'
import './WidgetStyle.css'

const Paragraph = ({ updateWidget, showPreview, widget }) => {
    let text
    return (
        <div>
            <div hidden={showPreview}>
            <label for="paragraph">Text</label>
            <textarea id="paragraph" className="form-control" value={widget.text} 
                placeholder='Paragraph text' 
                hidden={showPreview}
                ref={node => text = node}
                onChange={() => {
                    widget.text = text.value
                    updateWidget(widget)}}></textarea></div>
            <div><p>{widget.text}</p></div>
        </div>
    )
}

export const dispatcherToPropertiesMapperForWidget = dispatch => ({
    updateWidget: (widget) => updateWidget(dispatch, widget)
})
export const ParagraphContainer = connect(stateToPropertiesMapperForWidget, dispatcherToPropertiesMapperForWidget)(Paragraph)