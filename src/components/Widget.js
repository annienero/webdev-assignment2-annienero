import React from 'react';
import { deleteWidget, moveDown, moveUp, updateWidget } from '../actions/WidgetActions'
import { connect } from 'react-redux';
import { LinkContainer } from './LinkWidget'
import { ParagraphContainer } from './ParagraphWidget'
import { ListContainer } from './ListWidget'
import { HeadingContainer } from './HeadingWidget'
import { ImageContainer } from './ImageWidget'

const Widget = ({ widget, showPreview, len, deleteWidget, moveDown, moveUp, updateWidget }) => {
    let selectElement
    let name
    return (
        <li>
            <div>
                <h2>{widget.className} Widget</h2>
                <select value={widget.className} hidden={showPreview}
                    onChange={() => {
                        widget.className = selectElement.value
                        updateWidget(widget)}
                    }
                    ref={node => selectElement = node}>
                    <option>Heading</option>
                    <option>Image</option>
                    <option>Link</option>
                    <option>List</option>
                    <option>Paragraph</option>
                </select>
                <button hidden={showPreview}
                    onClick={() => deleteWidget(widget)}
                    >Delete</button>
                <button hidden={widget.widgetOrder === 0 || showPreview} 
                    onClick={() => moveUp(widget)}>Move Up</button>
                <button hidden={widget.widgetOrder === len - 1 || showPreview} 
                    onClick={() => moveDown(widget)}>Move Down</button>
            </div>
            <div>
                <input type="text" value={widget.name}
                    onChange={() => {
                        widget.name = name.value
                        updateWidget(widget)}
                    }
                    ref={node => name = node}
                    placeholder="Widget Name" hidden={showPreview}/>
                {widget.className === 'Heading' && 
                    <HeadingContainer showPreview={showPreview} widget={widget}/>}
                {widget.className === 'Image' && 
                    <ImageContainer showPreview={showPreview} widget={widget}/>}
                {widget.className === 'Link' && 
                    <LinkContainer widget={widget} showPreview={showPreview}/>}
                {widget.className === 'List' && 
                    <ListContainer widget={widget} showPreview={showPreview}/>}
                {widget.className === 'Paragraph' && 
                    <ParagraphContainer widget={widget} showPreview={showPreview}/>}
            </div>
        </li>
    )
}

export const stateToPropertiesMapperForWidget = (state) => {
    return {
        showPreview: state.showPreview,
        len: state.widgets.length
    }
}

export const dispatcherToPropertiesMapperForWidget = dispatch => ({
    deleteWidget: (widget) => deleteWidget(dispatch, widget),
    moveUp: (widget) => moveUp(dispatch, widget),
    moveDown: (widget) => moveDown(dispatch, widget),
    updateWidget: (widget) => updateWidget(dispatch, widget)
})

export const WidgetContainer = connect(stateToPropertiesMapperForWidget, dispatcherToPropertiesMapperForWidget)(Widget)
