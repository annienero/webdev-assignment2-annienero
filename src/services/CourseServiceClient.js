function CourseServiceClient() {
    this.createCourse = createCourse
    this.deleteCourse = deleteCourse
    this.findAllCourses = findAllCourses
    this.findCourseById = findCourseById
    this.updateCourse = updateCourse

    function createCourse(courseObjStr) {
        return fetch('/api/course/', {
            method: 'post',
            body: courseObjStr,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    function deleteCourse(id) {
        return fetch('/api/course/' + id, {
            method: 'delete'
        })
    }

    function findAllCourses(callback) {
        return $.ajax({
            url: '/api/course',
            success: callback
        })
    }

    function findCourseById(id) {
        return fetch('/api/course' + id, {
            method: 'get'
        }).then(function(response) {
            response.json()
        })
    }

    function updateCourse(id, courseObjStr) {
        return fetch('/api/course' + id, {
            method: 'put',
            body: courseObjStr,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(response) {
            return response.json();
        })
    }
}