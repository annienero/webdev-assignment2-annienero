import React from 'react';
import { stateToPropertiesMapperForWidget, dispatcherToPropertiesMapperForWidget } from './Widget'
import { connect } from 'react-redux';

const Image = ({ updateWidget, showPreview, widget }) => {
    let url
    return(
    <div>
        <input placeholder="Image URL" value={widget.src} ref={node => url = node}
            onChange={() => {
                widget.src = url.value
                updateWidget(widget)}
            }
            hidden={showPreview} />
        {/* TODO preview */}
    </div>)
}

export const ImageContainer = connect(stateToPropertiesMapperForWidget, dispatcherToPropertiesMapperForWidget)(Image)