export const state = () => ({
    currentGirl: ''
})

export const mutations = {
    setCurrentGirl(state, girl){
        state.currentGirl = girl
    },
    clearCurrentGirl(state) {
        state.currentGirl = ''
    }
}

export const actions = {
    setCurrentGirl(context, girl){
        context.commit('setCurrentGirl', girl)
    },
    clearCurrentGirl(context) {
        context.commit('clearCurrentGirl')
    },
    async index({dispatch}, isFirst) {
        const param = { is_first: isFirst }
        const girls = await dispatch('api/request', {method: 'get', endpoint: 'girl', params: param}, {root: true})
        return girls.data
    },
    async updateCurrentGirl({dispatch, commit}, girlId) {
        const param = { girl_id: girlId }
        const user = await dispatch('api/request', {method: 'put', endpoint: `user/1`, params: param}, {root: true})
        await dispatch('user/setUser', user.data, {root: true})
        await commit('setCurrentGirl', user.data.girl)
    },
    async unlock({dispatch}, girlId) {
        const param = { girl_id: girlId }
        const girls = await dispatch('api/request', {method: 'post', endpoint: `user_girl`, params: param}, {root: true})
        return girls.data
    },

    async getSerifu({dispatch}, { girlId, situation }) {
        const serifu = await dispatch('api/request', {method: 'get', endpoint: `serifu/${girlId}`, params: {situation: situation}}, {root: true})
        return serifu.data
    },

    async getSerifuSet({dispatch}, { girlId, situations }) {
        const params = { girl_id: girlId, situation: situations }
        const serifuSet = await dispatch('api/request', {method: 'get', endpoint: 'serifu', params: params}, {root: true})
        return serifuSet.data
    }
}

export const getters = {
    currentGirl: (state) => state.currentGirl
}