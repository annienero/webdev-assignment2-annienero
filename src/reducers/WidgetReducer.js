import {ADD_WIDGET, DELETE_WIDGET, FIND_ALL_WIDGETS, SAVE_WIDGETS,
     MOVE_DOWN, MOVE_UP, TOGGLE_PREVIEW, UPDATE_WIDGET} 
     from '../constants/WidgetConstants'
import WidgetServiceClient from '../services/WidgetServiceClient'

let autoIncrement = 0
export const WidgetReducer = (state = {widgets: [], showPreview: false}, action) => {
    let widgetService = WidgetServiceClient.instance
    let index
    let newState
    switch(action.type) {
        case SAVE_WIDGETS:
            widgetService.saveWidgets(action.id, state.widgets)
            return state //TODO async               
        case ADD_WIDGET:
            return {
                widgets: [
                    ...state.widgets,
                    {id: autoIncrement++, className: 'Heading', 
                        name: 'New Widget', widgetOrder: state.widgets.length}
                ]
            }
        case DELETE_WIDGET:
            let newWidgets = []
            let order = 0
            state.widgets.forEach(widget => {
                if (widget.id !== action.id) {
                    widget.widgetOrder = order++
                    newWidgets.push(widget)
                }
            })
            return {
                widgets: newWidgets
            }
        case FIND_ALL_WIDGETS:
        return {
            widgets: action.widgets
        }
            // newWidgets = []
            // widgetService.findAllWidgetsForLesson(action.id)
            // .then((widgets) => { 
            //     newWidgets = widgets
            // }) 
            // return {
            //     widgets: newWidgets
            // }
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
        case UPDATE_WIDGET:
            newState = {
                widgets: state.widgets.filter((widget) => {
                    if (widget.id === action.widget.id) {
                        widget = action.widget
                    }
                    return true;
                })
            }
            return JSON.parse(JSON.stringify(newState))
        default: 
            return state
    }
}