import React from 'react';
import { stateToPropertiesMapperForWidget, dispatcherToPropertiesMapperForWidget } from './Widget'
import { connect } from 'react-redux';

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

export const ParagraphContainer = connect(stateToPropertiesMapperForWidget, dispatcherToPropertiesMapperForWidget)(Paragraph)
