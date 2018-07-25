import React from 'react';
import { stateToPropertiesMapperForWidget, dispatcherToPropertiesMapperForWidget } from './Widget'
import { connect } from 'react-redux';

const Link = ({ updateWidget, showPreview, widget }) => {
    let href
    let text
    return (
        <div>
            <input placeholder="Link text"
                value={widget.text}
                ref={node => text = node}
                onChange={() => {
                    widget.text = text.value
                    updateWidget(widget)}}
                hidden={showPreview} />
            <input placeholder="Image URL" 
                value={widget.href}
                ref={node => href = node}
                onChange={() => {
                    widget.href = href.value
                    updateWidget(widget)}}
                hidden={showPreview} />
            <h3>Link Preview</h3>
            <a href={widget.url}>{widget.text}</a> {/* TODO link no click*/}
        </div>
    )
}

export const LinkContainer = connect(stateToPropertiesMapperForWidget, dispatcherToPropertiesMapperForWidget)(Link)