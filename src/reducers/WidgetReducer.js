import {ADD_WIDGET, DELETE_WIDGET, FIND_ALL_WIDGETS, SAVE_WIDGETS, SELECT_WIDGET_TYPE} from '../constants/WidgetConstants'

let autoIncrement = 0
export const WidgetReducer = (state = {widgets: []}, action) => {
    switch(action.type) {
        case SELECT_WIDGET_TYPE:
            let newState = {
                widgets: state.widgets.filter((widget) => {
                    if (widget.id === action.id) {
                        widget.className = action.className
                    }
                    return true;
                })
            }
            return JSON.parse(JSON.stringify(newState))
        case SAVE_WIDGETS:
            fetch('http://localhost:8080/api/lesson/62/widget/save', { //TODO eventually ACTUALLY do this for each lesson
                method: 'post',
                body: JSON.stringify(state.widgets),
                headers: {
                    'content-type': 'application/json'
                }
            }).then
            return state
        case ADD_WIDGET:
            return {
                widgets: [
                    ...state.widgets,
                    {text: 'New Widget', id: autoIncrement++, className: 'Paragraph'}
                ]
            }
        case DELETE_WIDGET:
            return {
                widgets: state.widgets.filter(widget => (
                    widget.id !== action.id
                ))
            }
        case FIND_ALL_WIDGETS:
            return {
                widgets: action.widgets
            }
        default: 
            return state
    }
}
