import React from 'react';
import { DELETE_WIDGET, SELECT_WIDGET_TYPE, MOVE_DOWN, MOVE_UP, UPDATE_WIDGET_NAME } from '../constants/WidgetConstants'

import { connect } from 'react-redux';

const Widget = ({ widget, dispatch, showPreview, len }) => {
    let selectElement
    let name = widget.name
    return (
        <li>
            <div>
                <text>{widget.className} Widget</text>
                <select defaultValue={widget.className} hidden={showPreview}
                    onChange={e => dispatch({ type: SELECT_WIDGET_TYPE, id: widget.id, className: selectElement.value })}
                    ref={node => selectElement = node}>
                    <option>Heading</option>
                    <option>Image</option>
                    <option>Link</option>
                    <option>List</option>
                    <option>Paragraph</option>
                </select>
                <button hidden={showPreview}
                    onClick={e => (
                        dispatch({ type: DELETE_WIDGET, id: widget.id })
                    )}
                >Delete</button>
                <button hidden={widget.widgetOrder === 0 || showPreview} onClick={e => (
                    dispatch({ type: MOVE_UP, widget: widget }))}>Move Up</button>
                <button hidden={widget.widgetOrder === len - 1 || showPreview} onClick={e => (
                    dispatch({ type: MOVE_DOWN, widget: widget }))}>Move Down</button>
            </div>
            <div>
                <input type="text" value={name}
                    onChange={e => (
                        dispatch({ type: UPDATE_WIDGET_NAME, id: widget.id, name: name.value}))}
                    ref={node => name = node}
                    placeholder="Widget Name" hidden={showPreview}/>
                {widget.className === 'Heading' && <Heading showPreview={showPreview} />}
                {widget.className === 'Image' && <Image showPreview={showPreview} />}
                {widget.className === 'Link' && <Link showPreview={showPreview} />}
                {widget.className === 'List' && <List showPreview={showPreview} />}
                {widget.className === 'Paragraph' && <Paragraph showPreview={showPreview} />}
            </div>
        </li>
    )
}

export const WidgetContainer = connect()(Widget)


const Heading = (props) => (
    <div>
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
    <div>
        {/* TODO dynamically update image for preview also post on save*/}
        <input placeholder="Image URL" hidden={props.showPreview} />
        <image hidden={!props.showPreview} />
    </div>
)


const Link = (props) => (
    <div>
        {/* TODO dynamically update link and text for preview also post on save*/}
        <input placeholder="Link text" hidden={props.showPreview} />
        <input placeholder="Image URL" hidden={props.showPreview} />
        <image hidden={!props.showPreview} />
    </div>
)


const List = (props) => (
    <div>
        {/* TODO dynamically update text for preview also post on save*/}
        <div hidden={props.showPreview}>
            <select>
                <option>Ordered</option>
                <option>Unordered</option>
            </select>
            <div><textarea placeholder='Enter one list item per line'></textarea></div>
        </div>
        <div hidden={!props.showPreview}>
            <ul>
                <li>list preview</li>
                <li>list preview</li>
            </ul>
        </div>
    </div>
)


const Paragraph = (props) => (
    <div>
        {/* TODO dynamically update text for preview also post on save*/}
        <textarea placeholder='Paragraph text' hidden={props.showPreview}></textarea>
        <p hidden={!props.showPreview}>Paragraph text preview</p>
    </div>
)