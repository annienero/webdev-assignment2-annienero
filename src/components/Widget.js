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

const List = ({ updateWidget, showPreview, widget }) => {
    let selectElement
    let text
    return (
        <div>
            {/* TODO preview only shows after i update listtype*/}
            <div hidden={showPreview}>
                <select value={widget.listType}
                        ref={node => selectElement = node}
                        onChange={() => {
                            widget.listType = selectElement.value
                            updateWidget(widget)}
                    }>
                    <option value='ORDERED'>Ordered</option>
                    <option value='UNORDERED'>Unordered</option>
                </select>
                <div><textarea value={widget.text}
                    placeholder='Enter one list item per line'
                    ref={node => text = node}
                    onChange={() => {
                        widget.text = text.value
                        updateWidget(widget)}
                }></textarea></div>
            </div>
            <div>
                {widget.listType === 'UNORDERED' &&
                    <ul>
                        {widget.text.split('\n').map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
            
                }
                {widget.listType === 'ORDERED' &&
                    <ol>
                        {widget.text.split('\n').map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ol>
            
                }
            </div>
        </div>
    )
}

export const ListContainer = connect(stateToPropertiesMapperForWidget, dispatcherToPropertiesMapperForWidget)(List)

const Paragraph = ({ updateWidget, showPreview, widget }) => { {/* TODO put preview in way cuter text box or something rn just goes off page*/}
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
