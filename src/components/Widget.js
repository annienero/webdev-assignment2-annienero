import React from 'react';
import {DELETE_WIDGET, SELECT_WIDGET_TYPE} from '../constants/WidgetConstants'

import {connect} from 'react-redux';

const Widget = ({widget, dispatch}) => {
    let selectElement
    return(
        <li>{widget.className}
            <select defaultValue={widget.className} onChange={e => dispatch({type: SELECT_WIDGET_TYPE, id: widget.id, className: selectElement.value})} ref={node => selectElement = node}>
                <option>Heading</option>
                <option>Image</option>
                <option>Link</option>
                <option>List</option>
                <option>Paragraph</option>
            </select>
            <button onClick={e => (
                dispatch({type: DELETE_WIDGET, id: widget.id})
            )}>Delete</button>
        </li>
    )
}

export const WidgetContainer = connect()(Widget)