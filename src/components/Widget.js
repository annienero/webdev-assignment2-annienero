import React from 'react';
import { DELETE_WIDGET, SELECT_WIDGET_TYPE, MOVE_DOWN, MOVE_UP } from '../constants/WidgetConstants'

import { connect } from 'react-redux';

const Widget = ({ widget, dispatch, showPreview, len }) => {
    let selectElement
    return (
        <li>
             <div>
                {widget.className === 'Heading' && <Heading showPreview={showPreview}/>}
                {widget.className === 'Image' && <Image showPreview={showPreview}/>}
                {widget.className === 'Link' && <Link showPreview={showPreview}/>}
                {widget.className === 'List' && <List showPreview={showPreview}/>}
                {widget.className === 'Paragraph' && <Paragraph showPreview={showPreview}/>}
            </div>
            {/* maybe move idfk */}
            <div hidden={showPreview}>
                <select defaultValue={widget.className} onChange={e => dispatch({ type: SELECT_WIDGET_TYPE, id: widget.id, className: selectElement.value })} ref={node => selectElement = node}>
                    <option>Heading</option>
                    <option>Image</option>
                    <option>Link</option>
                    <option>List</option>
                    <option>Paragraph</option>
                </select>
                <button onClick={e => (
                    dispatch({ type: DELETE_WIDGET, id: widget.id })
                )}>Delete</button>
                <button hidden={widget.order === 0} onClick={e => (
                    dispatch({ type: MOVE_UP, widget: widget }))}>Move Up</button>
                <button hidden={widget.order === len} onClick={e => (
                    dispatch({ type: MOVE_DOWN, widget: widget }))}>Move Down</button>
            </div>
        </li>
    )
}

export const WidgetContainer = connect()(Widget)


const Heading = (props) => (
    <div>
        <h2>Heading Widget</h2>
        <select hidden={props.showPreview}>
            <option>Heading 1</option>
            <option>Heading 2</option>
            <option>Heading 3</option>
        </select>
        <div hidden={props.showPreview}>
            <input placeholder='Heading Text'></input>
        </div>
        <h1 hidden={!props.showPreview}>Heading Preview</h1> 
        {/* TODO dynamically update heading TYPE and text for preview also post on save*/}
    </div>
)


const Image = (props) => (
    <h2>Imgage Widget</h2>
)


const Link = (props) => (
    <h2>Link Widget</h2>
)


const List = (props) => (
    <div>
        <h2>List Widget</h2>
        <select>
            <option>Ordered</option>
            <option>Unordered</option>
        </select>
    </div>
)


const Paragraph = (props) => (
    <div>
{/* TODO dynamically update text for preview also post on save*/}
        <h2>Paragraph Widget</h2>
        <textarea placeholder='Paragraph text' hidden={props.showPreview}></textarea>
        <p hidden={!props.showPreview}>Paragraph text preview</p>
    </div>
)