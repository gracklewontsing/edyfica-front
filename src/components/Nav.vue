<template>
  <!-- eslint-disable -->
  <div>
    <b-navbar toggleable="lg" class="navbar fixed-top navbar-dark bg-dark">      
      <div class="container justify-content-center">
        <router-link to="/" class="navbar-brand" href="/">
          <strong class="">Edyfica</strong>
        </router-link>
        <b-navbar-toggle
          class="navbar-toggler"
          type="button"
          target="navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </b-navbar-toggle>
        <b-collapse class="mr-auto" id="navbarNav" is-nav>
          <b-navbar-nav class="mx-auto">            
            <router-link v-if="admin==='yes'" class="nav-link" to="/admin">Admin</router-link>     
            <router-link v-if="auth==='loggedin'" class="nav-link" to="/inventory">Inventario</router-link>     
            <router-link v-if="auth==''" class="nav-link" to="/login">Ingresar</router-link>
            <router-link v-if="auth==''" class="nav-link" to="/register">Registrarse</router-link>
            <a v-if="auth=='loggedin'" class="nav-link" href="" v-on:click="logout">Cerrar Sesión</a>             
          </b-navbar-nav>          
        </b-collapse>    
      </div>  
    </b-navbar>
  </div>
</template>
<script>
import EventBus from './EventBus'
import VueJwtDecode from 'vue-jwt-decode'
export default {
  name: "Nav",
  data () {
    return {
      auth: '',
      user: '',         
      admin: ''   
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('usertoken');
    },    
    onSubmit(){
      // empty, just to avoid warnings
    }
  },
  mounted () {    
    EventBus.$on('logged-in', status => { 
      this.auth = status;
      if (this.auth === "loggedin"){
      let token = localStorage.getItem("usertoken");
      if (token) {
        let decoded = VueJwtDecode.decode(token);
        this.user = decoded;    
        if(decoded.isAdmin === true){
          this.admin="yes"
        }
      }  
    }
    })
    let token = localStorage.getItem("usertoken");
    if (token) {
      EventBus.$emit('logged-in', 'loggedin'); 
    }  
  }
};
</script>

<style scoped lang="scss">
.navbar .navbar-nav {
  float: none;
  vertical-align: top;
}
.navbar .navbar-collapse {
  text-align: center;
}
</style>
