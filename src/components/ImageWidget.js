import React from 'react';
import {updateWidget } from '../actions/WidgetActions'
import { stateToPropertiesMapperForWidget } from './Widget'
import { connect } from 'react-redux';

const Image = ({ updateWidget, showPreview, widget }) => {
    let url
    return(
    <div>
        <label for="name">Image URL</label>
        <input id="name" className="form-control" placeholder="Image URL" 
            value={widget.src} ref={node => url = node}
            onChange={() => {
                widget.src = url.value
                updateWidget(widget)}
            }
            hidden={showPreview} />
        <div><img src={widget.src}/></div>
    </div>)
}

export const dispatcherToPropertiesMapperForWidget = dispatch => ({
    updateWidget: (widget) => updateWidget(dispatch, widget)
})
export const ImageContainer = connect(stateToPropertiesMapperForWidget, dispatcherToPropertiesMapperForWidget)(Image)