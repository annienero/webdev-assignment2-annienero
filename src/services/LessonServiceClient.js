function LessonServiceClient() {
    this.createLesson = createLesson
    this.deleteLesson = deleteLesson
    this.findAllLessons = findAllLessons
    this.findLessonById = findLessonById
    this.findAllLessonsForModule = findAllLessonsForModule
    this.updateLesson = updateLesson

    function createLesson(cid, mid, lessonObjStr) {
        return fetch('/api/course/' + cid + '/module/' + mid + '/lesson', {
            method: 'post',
            body: lessonObjStr,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    function deleteLesson(id) {
        return fetch('/api/lesson/' + id, {
            method: 'delete'
        })
    }

    function findAllLessons(callback) {
        return $.ajax({
            url: '/api/lesson',
            success: callback
        })
    }

    function findLessonById(id) {
        return fetch('/api/lesson' + id, {
            method: 'get'
        }).then(function(response) {
            response.json()
        })
    }

    function findAllLessonsForModule(cid, mid) {
        return fetch('/api/course/' + cid + '/module/' + mid + '/lesson', {
            method: 'get'
        }).then(function(response) {
            response.json()
        })
    }

    function updateLesson(id, lessonObjStr) {
        return fetch('/api/lesson' + id, {
            method: 'put',
            body: lessonObjStr,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(response) {
            return response.json();
        })
    }
}