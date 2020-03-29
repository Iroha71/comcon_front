export const actions = {
    async insertTask({dispatch}, taskInfo) {
        const task = await dispatch('api/request', {method: 'post', endpoint: 'task', params: taskInfo}, {root: true})
        return task
    },

    async indexAll({dispatch}) {
        const tasks = await dispatch('api/request', {method: 'get', endpoint: 'task', params: null}, {root: true})
        return tasks.data
    },

    async index({dispatch}, groupId) {
        const tasks = await dispatch('api/request', {method: 'get', endpoint: 'task', params: groupId}, {root: true})
        return tasks.data
    },

    async custom({dispatch}, {groupId, column, sign, value, orderColumn, orderSign}) {
        const params = { group_id: groupId, column: column, sign: sign, value: value, order_column: orderColumn, order_sign: orderSign }
        const tasks = await dispatch('api/request', {method: 'get', endpoint: 'task/custom', params: params}, {root: true})
        return tasks.data
    },

    async show({dispatch}, taskId) {
        const task = await dispatch('api/request', {method: 'get', endpoint: `task/${taskId}`, params: null}, {root: true})
        return task
    },

    async countNotFinishTasks({dispatch}) {
        const taskCount = await dispatch('api/request', {method: 'get', endpoint: 'task/count_not_finish_tasks', params: null}, {root: true})
        return taskCount.data
    },

    async update({dispatch}, {taskId, changeContent}) {
        const task = await dispatch('api/request', {method: 'put', endpoint: `task/${taskId}`, params: changeContent}, {root: true})
        return task
    },

    async updateStatus({dispatch}, {taskId, status}) {
        const statusInfo = { status: status }
        const updatedStatus = await dispatch('api/request', {method: 'put', endpoint: `task/${taskId}/update_status`, params: statusInfo}, {root: true})
        if(updatedStatus.data.status == '完了') {
            dispatch('user/setUser', updatedStatus.data.user, {root: true})
        }
        return updatedStatus.data
    },

    async destroy({dispatch}, taskId) {
        const deleted = await dispatch('api/request', {method: 'delete', endpoint: `task/${taskId}`, params: null}, {root: true})
        return deleted.data
    }
}