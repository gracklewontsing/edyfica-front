<template>
  <div id="app">          
    <Nav class="p-5"/> 
    <router-view :key="$route.fullPath"/>        
  </div>
</template>

<script>

import Nav from "@/components/Nav"
export default {
  name:'app',
  components: {    
    Nav
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
