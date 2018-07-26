import {ADD_WIDGET, FIND_ALL_WIDGETS, SAVE_WIDGETS,
     MOVE_UP, MOVE_DOWN, DELETE_WIDGET, TOGGLE_PREVIEW ,
     UPDATE_WIDGET} from '../constants/WidgetConstants'
import WidgetServiceClient from '../services/WidgetServiceClient'

export const findAllWidgets = (dispatch, id) => {
    let widgetService = WidgetServiceClient.instance
    widgetService.findAllWidgetsForLesson(id)
    .then(widgets => {
        dispatch({
            type: FIND_ALL_WIDGETS,
            widgets: widgets
        })
    })
}

export const addWidget = dispatch => {
    dispatch({type: ADD_WIDGET})
}

export const save = (dispatch, id) => {
    dispatch({type: SAVE_WIDGETS, id: id})
}

export const moveUp = (dispatch, widget) => {
    dispatch({type: MOVE_UP, widget: widget})
}

export const moveDown = (dispatch, widget) => {
    dispatch({type: MOVE_DOWN, widget: widget})
}

export const deleteWidget = (dispatch, widget) => {
    dispatch({type: DELETE_WIDGET, id: widget.id})
}  

export const togglePreview = (dispatch) => {
    dispatch({type: TOGGLE_PREVIEW})
}

export const updateWidget = (dispatch, widget) => {
    dispatch({ type: UPDATE_WIDGET, widget: widget })
}

   