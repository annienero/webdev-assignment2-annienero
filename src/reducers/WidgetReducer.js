import {ADD_WIDGET, DELETE_WIDGET, FIND_ALL_WIDGETS, SAVE_WIDGETS,
     SELECT_WIDGET_TYPE, MOVE_DOWN, MOVE_UP, TOGGLE_PREVIEW, UPDATE_WIDGET_NAME} 
     from '../constants/WidgetConstants'

let autoIncrement = 0
export const WidgetReducer = (state = {widgets: [], showPreview: false}, action) => {
    let index
    let newState
    switch(action.type) {
        case UPDATE_WIDGET_NAME:
            newState = {
                widgets: state.widgets.filter((widget) => {
                    if (widget.id === action.id) {
                        widget.name = action.name
                    }
                    return true;
                })
            }
            return JSON.parse(JSON.stringify(newState))
        case SELECT_WIDGET_TYPE:
            newState = {
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
                    {text: 'New Widget', id: autoIncrement++, className: 'Heading', 
                        name: 'New Widget' + state.widgets.length, widgetOrder: state.widgets.length}
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
        case MOVE_DOWN:
            index = state.widgets.indexOf(action.widget)
            state.widgets[index].widgetOrder++
            state.widgets[index + 1].widgetOrder--
            state.widgets.copyWithin(index, index, index + 1)
            return JSON.parse(JSON.stringify(state))
        case MOVE_UP:
            index = state.widgets.indexOf(action.widget)
            state.widgets[index].widgetOrder--
            state.widgets[index - 1].widgetOrder++
            state.widgets.copyWithin(index, index, index - 1)
            return JSON.parse(JSON.stringify(state))
        case TOGGLE_PREVIEW:
            newState = JSON.parse(JSON.stringify(state))
            newState.showPreview = !state.showPreview
            return newState
        default: 
            return state
    }
}