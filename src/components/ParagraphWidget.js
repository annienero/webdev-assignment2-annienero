import React from 'react'
import { connect } from 'react-redux'
import { stateToPropertiesMapperForWidget } from './Widget'
import {updateWidget } from '../actions/WidgetActions'

const Paragraph = ({ updateWidget, showPreview, widget }) => {
    // TODO put preview in way cuter text box or something rn just goes off page
    let text
    return (
        <div>
            <textarea value={widget.text} 
                placeholder='Paragraph text' 
                hidden={showPreview}
                ref={node => text = node}
                onChange={() => {
                    widget.text = text.value
                    updateWidget(widget)}}></textarea>
            <p>{widget.text}</p>
        </div>
    )
}

export const dispatcherToPropertiesMapperForWidget = dispatch => ({
    updateWidget: (widget) => updateWidget(dispatch, widget)
})
export const ParagraphContainer = connect(stateToPropertiesMapperForWidget, dispatcherToPropertiesMapperForWidget)(Paragraph)