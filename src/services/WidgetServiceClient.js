let _singleton = Symbol();

export default class WidgetServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if (!this[_singleton]) this[_singleton] = new WidgetServiceClient(_singleton);
        return this[_singleton]
    }

    saveWidgets(lessonId, widgets) {
        return fetch('http://localhost:8080/api/lesson/' + lessonId + '/widget/save', { //TODO no lolhost
            method: 'post',
            body: JSON.stringify(widgets),
            headers: {
                'content-type': 'application/json'
            }
        })
    }

    findAllWidgetsForLesson(lessonId) {
        return fetch('http://localhost:8080/api/lesson/' + lessonId + '/widget') //TODO no localhosts
            .then(function (response) {
                return response.json()
            })
    }
}