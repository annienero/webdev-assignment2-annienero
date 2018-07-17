function ModuleServiceClient() {
    this.createModule = createModule
    this.deleteModule = deleteModule
    this.findAllModules = findAllModules
    this.findModuleById = findModuleById
    this.findAllModulesForCourse = findAllModulesForCourse
    this.updateModule = updateModule

    function createModule(cid, moduleObjStr) {
        return fetch('/api/course/' + cid + '/module/', {
            method: 'post',
            body: moduleObjStr,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    function deleteModule(id) {
        return fetch('/api/module/' + id, {
            method: 'delete'
        })
    }

    function findAllModules(callback) {
        return $.ajax({
            url: '/api/module',
            success: callback
        })
    }

    function findModuleById(id) {
        return fetch('/api/module' + id, {
            method: 'get'
        }).then(function(response) {
            response.json()
        })
    }

    function findAllModulesForCourse(cid) {
        return fetch('/api/course/' + cid + '/module', {
            method: 'get'
        }).then(function(response) {
            response.json()
        })
    }

    function updateModule(id, moduleObjStr) {
        return fetch('/api/module' + id, {
            method: 'put',
            body: moduleObjStr,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(response) {
            return response.json();
        })
    }
}