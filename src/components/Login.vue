<template>
    <div class="container my-5">
        <div class="row">
            <div class="col-md-6 mt-5 mx-auto">
                <b-form v-on:submit.prevent="login">
                    <h1 class="h3 mb-3 font-weight-normal">Inicio de sesión</h1>
                    <div class="form-group">
                        <label for="id">Usuario</label>
                        <input type="text" v-model="username" class="form-control" name="username" placeholder="Nombre de usuario">
                    </div>
                    <div class="form-group">
                        <label for="password">Contraseña</label>
                        <input type="password" v-model="password" class="form-control" name="password" placeholder="Contraseña">
                    </div>
                    <button class="btn btn-lg btn-success btn-block" type="submit">Ingresar</button>
                </b-form>
                <router-link to="/register" class="btn btn-lg btn-primary btn-block my-2">Registrarse</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
import EventBus from './EventBus'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },

  methods: {
    login () {
      axios.post('https://edyfica-server.herokuapp.com/login', //herokuapp
      {
        username: this.username,
        password: this.password
      }).then(res => {
        if (res.data.error) {
          console.log(res.data.error);
          return ;
        }
        localStorage.setItem('usertoken', res.data);
        console.log(res)
        this.username= '';
        this.password = '';
        this.emitMethod()
        router.push({ name: 'Home' });
      }).catch(err => {
        console.log(err);
      })
    },
    emitMethod () {
      EventBus.$emit('logged-in', 'loggedin');
    }
  }
}
</script>