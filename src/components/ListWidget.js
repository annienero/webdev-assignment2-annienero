import React from 'react';
import { stateToPropertiesMapperForWidget, dispatcherToPropertiesMapperForWidget } from './Widget'
import { connect } from 'react-redux';

const List = ({ updateWidget, showPreview, widget }) => {
    let selectElement
    let text
    return (
        <div>
            {/* TODO preview only shows after i update listtype also not sure if listtype work in db*/}
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

