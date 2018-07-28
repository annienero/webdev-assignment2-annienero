import React from 'react'
import { connect } from 'react-redux'
import { stateToPropertiesMapperForWidget } from './Widget'
import {updateWidget } from '../actions/WidgetActions'
import './WidgetStyle.css'

const List = ({ updateWidget, showPreview, widget }) => {
    let selectElement
    let text
    return (
        <div>
            <div hidden={showPreview}>
                <label for="listType">List Type</label>
                <select id="listType" value={widget.listType}
                        ref={node => selectElement = node}
                        onChange={() => {
                            widget.listType = selectElement.value
                            updateWidget(widget)}
                    }>
                    <option value='ORDERED'>Ordered</option>
                    <option value='UNORDERED'>Unordered</option>
                </select>
                <div>
                    <label for="list">List Items</label>
                    <textarea id="list" className="form-control" value={widget.text}
                    placeholder='Enter one list item per line'
                    ref={node => text = node}
                    onChange={() => {
                        widget.text = text.value
                        updateWidget(widget)}
                }></textarea>
            </div>
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

export const dispatcherToPropertiesMapperForWidget = dispatch => ({
    updateWidget: (widget) => updateWidget(dispatch, widget)
})
export const ListContainer = connect(stateToPropertiesMapperForWidget, dispatcherToPropertiesMapperForWidget)(List)
