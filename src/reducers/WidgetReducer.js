import {ADD_WIDGET, DELETE_WIDGET, FIND_ALL_WIDGETS, SAVE_WIDGETS} from '../constants/WidgetConstants'

let autoIncrement = 0
export const WidgetReducer = (state = {widgets: []}, action) => {
    switch(action.type) {
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
                    {text: 'New Widget', id: autoIncrement++}
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
