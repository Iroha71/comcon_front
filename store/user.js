export const state = () => ({
    id: '',
    email: '',
    name: '',
    nickname: '',
    personal_pronoun: '',
    gold: 0,
    personal_pronouns: [ {name: '私', value: '私'}, {name: '俺', value: '俺'}, {name: '僕', value: '僕'} ]
})

export const mutations = {
    set(state, user){
        state.id = user.id
        state.email = user.email
        state.name = user.name
        state.nickname = user.nickname
        state.personal_pronoun = user.personal_pronoun
        state.gold = user.gold
    },

    clear(state) {
        state.id = ''
        state.email = ''
        state.name = ''
        state.nickname = ''
        state.personal_pronoun = ''
        state.gold = ''
    }
}

const signInPath = 'auth/sign_in'
const signOutPath = 'auth/sign_out'

export const actions = {
    setUser(context, user){
        context.commit('set', user)
    },

    async signIn({commit, dispatch}, {email, password}){
        const userInfo = { email: email, password: password }
        const user = await dispatch('api/request', {method: 'post', endpoint: signInPath, params: userInfo}, {root: true})
        commit('set', user.data.data)
        const headers = { access_token: user.headers['access-token'], client: user.headers['client'], uid: user.headers['uid'] }
        dispatch('auth/setAuth', headers, {root: true})
        dispatch('girl/clearCurrentGirl', null, {root: true})
        dispatch('girl/setCurrentGirl', user.data.data.girl, {root: true})
    },

    async resetPassword({dispatch}, email) {
        const param = { email: email }
        await dispatch('api/request', {method: 'post', endpoint: 'auth/password', params: param}, {root: true})
    },

    async updatePassword({dispatch, commit}, {query, newPassword, confirmPassword}) {
        const password = { password: newPassword, password_confirmation: confirmPassword }
        query.access_token = query['access-token']
        dispatch('auth/setAuth', query, {root: true})
        const user = await dispatch('api/request', {method: 'put', endpoint: 'auth/password', params: password}, {root: true})
        await dispatch('user/signIn', {email: user.data.data.email, password: newPassword}, {root: true})
        return user.data
    },

    async signOut({commit, dispatch}) {
        await dispatch('api/request', {method: 'delete', endpoint: signOutPath, params: null}, {root: true})
        await commit('clear')
        await dispatch('auth/clearAuth', null, {root: true})
        localStorage.removeItem('comcon')
    },

    async signUp({dispatch}, {email, password, name, nickname, pronoun}) {
        const userInfo = { email: email, password: password, name: name, nickname: nickname, personal_pronoun: pronoun }
        const user = await dispatch('api/request', {method: 'post', endpoint: 'auth', params: userInfo}, {root: true})
        return user.data.data.email
    },

    async registLineId({dispatch}, lineId) {
        const lineParam = { line_id: lineId }
        const lineInfo = await dispatch('api/request', {method: 'put', endpoint: 'user/1', params: lineParam}, {root: true})
        return lineInfo.data
    },

    async fetchGold({commit, dispatch}) {
        const gold = await dispatch('api/request', {method: 'get', endpoint: 'user/get_gold', params: null}, {root: true})
        commit('set', {gold: gold.data})
        return gold.data
    }
}

export const getters = {
    name: (state) => state.name,
    email: (state) => state.email,
    nickname: (state) => state.nickname,
    personalPronoun: (state) => state.personal_pronoun,
    gold: (state) => state.gold,
    personalPronouns: (state) => state.personal_pronouns
}