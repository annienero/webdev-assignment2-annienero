import React from 'react';
import {DELETE_WIDGET, SELECT_WIDGET_TYPE, MOVE_DOWN, MOVE_UP} from '../constants/WidgetConstants'

import {connect} from 'react-redux';

const Widget = ({widget, dispatch}) => {
    let selectElement
    return(
        <li>
            <select defaultValue={widget.className} onChange={e => dispatch({type: SELECT_WIDGET_TYPE, id: widget.id, className: selectElement.value})} ref={node => selectElement = node}>
                <option>Heading</option>
                <option>Image</option>
                <option>Link</option>
                <option>List</option>
                <option>Paragraph</option>
            </select>
            {/* maybe move idfk */}
            <button onClick={e => (
                dispatch({type: DELETE_WIDGET, id: widget.id})
            )}>Delete</button>
            <button onClick={e => (
                dispatch({type: MOVE_UP, widget: widget}))}>Move Up</button>
            <button onClick={e => (
                dispatch({type: MOVE_DOWN, widget: widget}))}>Move Down</button>
            <div>
                {widget.className === 'Heading' && <Heading/>}
                {widget.className === 'Image' && <Image/>}
                {widget.className === 'Link' && <Link/>}
                {widget.className === 'List' && <List/>}
                {widget.className === 'Paragraph' && <Paragraph widget={widget}/>}
            </div>
        </li>
    )
}

export const WidgetContainer = connect()(Widget)


const Heading = () => (
    <div>
        <h2>Heading</h2>
        <select>
            <option>Heading 1</option>
            <option>Heading 2</option>
            <option>Heading 3</option>
        </select>
    </div>
)


const Image = () => (
    <h2>Imgage</h2>
)


const Link = () => (
    <h2>Link</h2>
)


const List = () => (
    <div>
        <h2>List</h2>
        <select>
            <option>Ordered</option>
            <option>Unordered</option>
        </select>
    </div>
)


const Paragraph = () => (
    <div>
        <h2>Paragraph</h2>
        <textarea></textarea>
    </div>
)