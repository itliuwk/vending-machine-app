<template>
    <div id="app">
        <transition name="van-fade">
          <router-view ></router-view>
        </transition>
    </div>
</template>

<script>


    export default {
        name: 'app',
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        height: 100vh;
    }

    /*.right-slide-enter,*/
    /*.right-slide-leave-active {*/
    /*  opacity: 0;*/
    /*  transform: translateX(-100PX);*/
    /*}*/


    /*.right-slide-leave-active,*/
    /*.right-slide-enter-active {*/
    /*  transform: translate(0%, 0);*/
    /*  transition: all .5s;*/
    /*}*/
</style>
