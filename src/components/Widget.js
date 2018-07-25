import React from 'react';
import { deleteWidget, moveDown, moveUp, updateWidget } from '../actions/WidgetActions'
import { connect } from 'react-redux';

const Widget = ({ widget, showPreview, len, deleteWidget, moveDown, moveUp, updateWidget }) => {
    let selectElement
    let name = widget.name
    return (
        <li>
            <div>
                <text>{widget.className} Widget</text>
                <select defaultValue={widget.className} hidden={showPreview}
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
                <input type="text" value={name}
                    onChange={() => {
                        widget.name = name.value
                        updateWidget(widget)}
                    }
                    ref={node => name = node}
                    placeholder="Widget Name" hidden={showPreview}/>
                {widget.className === 'Heading' && <HeadingContainer 
                    hidden={showPreview}
                    widget={widget}/>}
                {widget.className === 'Image' && <ImageContainer 
                    showPreview={showPreview} 
                    widget={widget}/>}
                {widget.className === 'Link' && <Link hidden={showPreview}/>}
                {widget.className === 'List' && <List hidden={showPreview}/>}
                {widget.className === 'Paragraph' && <Paragraph hidden={showPreview}/>}
            </div>
        </li>
    )
}

const stateToPropertiesMapperForWidget = (state) => {
    return {
        showPreview: state.showPreview,
        len: state.widgets.length,
        widget: state.widgets[0]
    }
}

const dispatcherToPropertiesMapperForWidget = dispatch => ({
    deleteWidget: (widget) => deleteWidget(dispatch, widget),
    moveUp: (widget) => moveUp(dispatch, widget),
    moveDown: (widget) => moveDown(dispatch, widget),
    updateWidget: (widget) => updateWidget(dispatch, widget)
})

export const WidgetContainer = connect(stateToPropertiesMapperForWidget, dispatcherToPropertiesMapperForWidget)(Widget)

const Heading = ({ updateWidget, showPreview, widget }) => {
    let size = widget.size
    let text = widget.text
    return(
        <div>
           <div hidden={showPreview}>
            <select value={size}
                ref={node => size = node}
                onChange={() => {
                    widget.size = size.value
                    updateWidget(widget)}
                }>
                <option value={1}>Heading 1</option>
                <option value={2}>Heading 2</option>
                <option value={3}>Heading 3</option>
            </select>
                <input value={text} placeholder='Heading Text'
                    ref={node => text = node}
                    onChange={() => {
                        widget.text = text.value
                        updateWidget(widget)}
                    }/>
            </div>
            <div>
                <h3>Heading Preview</h3>
                {widget.size === '1' && <h1>{widget.text}</h1>} {/*TODO doesnt show initially */}
                {widget.size === '2' && <h2>{widget.text}</h2>}
                {widget.size === '3' && <h3>{widget.text}</h3>}
            </div>
        </div>
    )
}

export const HeadingContainer = connect(stateToPropertiesMapperForWidget, dispatcherToPropertiesMapperForWidget)(Heading)

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
        <image/>
        {/* TODO preview */}
    </div>)
}

export const ImageContainer = connect(stateToPropertiesMapperForWidget, dispatcherToPropertiesMapperForWidget)(Image)

const Link = (props) => (
    <div>
        {/* TODO dynamically update link and text for preview also post on save*/}
        <input placeholder="Link text" hidden={props.showPreview} />
        <input placeholder="Image URL" hidden={props.showPreview} />
        <image/>
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
        <div>
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
        <p>Paragraph text preview</p>
    </div>
)