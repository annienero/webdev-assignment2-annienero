import React from 'node_modules/@types/react';
import {DELETE_WIDGET} from './constants/WidgetConstants'

import {connect} from 'node_modules/@types/react-redux';

export const Widget = ({widget, dispatch}) => (
    <li>{widget.text}
        <button onClick={e => (
            dispatch({type: DELETE_WIDGET, id: widget.id})
        )}>Delete</button>
    </li>
)

export const WidgetContainer = connect()(Widget)