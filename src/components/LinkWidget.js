import React from 'react'
import { connect } from 'react-redux'
import { stateToPropertiesMapperForWidget } from './Widget'
import {updateWidget } from '../actions/WidgetActions'


const Link = ({ updateWidget, showPreview, widget }) => {
    let href
    let text
    return (
        <div>
            <div hidden={showPreview}>
            <label for="name">Link Text</label>
            <input id="name" className="form-control" placeholder="Link text"
                value={widget.text}
                ref={node => text = node}
                onChange={() => {
                    widget.text = text.value
                    updateWidget(widget)}}/>
            <label for="url">Link URL</label>
            <input id="url" className="form-control" placeholder="Link URL" 
                value={widget.href}
                ref={node => href = node}
                onChange={() => {
                    widget.href = href.value
                    updateWidget(widget)}}/></div>
            <a href={widget.href}>{widget.text}</a>
        </div>
    )
}

export const dispatcherToPropertiesMapperForWidget = dispatch => ({
    updateWidget: (widget) => updateWidget(dispatch, widget)
})
export const LinkContainer = connect(stateToPropertiesMapperForWidget, dispatcherToPropertiesMapperForWidget)(Link)