<template>
    <div class="root">
        <b-loading is-full-page :active.sync="$store.getters['api/isLoading']">
            <flower-spinner
                :animation-duration="1500"
                :size="70"
                color="#EA5B52" />
        </b-loading>
        <div class="hero is-fullheight">
            <nuxt />
        </div>
    </div>
</template>

<script>
import { FlowerSpinner } from 'epic-spinners'
export default {
    components: {
        FlowerSpinner
    }
}
</script>

<style lang="scss" scoped>
.hero {
    overflow: hidden;
    max-height: 100vh;
}
</style>