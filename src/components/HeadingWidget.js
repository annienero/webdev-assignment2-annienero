import React from 'react'
import { connect } from 'react-redux'
import { stateToPropertiesMapperForWidget } from './Widget'
import {updateWidget } from '../actions/WidgetActions'
import './WidgetStyle.css'

const Heading = ({ updateWidget, showPreview, widget }) => {
    let size
    let headingText
    return(
        <div>
           <div hidden={showPreview}>
            <select value={widget.size}
                ref={node => size = node}
                onChange={() => {
                    widget.size = size.value
                    updateWidget(widget)}
                }>
                <option value={1}>Heading 1</option>
                <option value={2}>Heading 2</option>
                <option value={3}>Heading 3</option>
            </select>
                <input value={widget.text} placeholder='Heading Text'
                    ref={node => headingText = node}
                    onChange={() => {
                        widget.text = headingText.value
                        updateWidget(widget)}
                    }/>
            </div>
            <div>
                <h3>Heading Preview</h3>
                {widget.size === 1 && <h1>{widget.text}</h1>}
                {widget.size === 2 && <h2>{widget.text}</h2>}
                {widget.size === 3 && <h3>{widget.text}</h3>}
            </div>
        </div>
    )
}

export const dispatcherToPropertiesMapperForWidget = dispatch => ({
    updateWidget: (widget) => updateWidget(dispatch, widget)
})
export const HeadingContainer = connect(stateToPropertiesMapperForWidget, dispatcherToPropertiesMapperForWidget)(Heading)