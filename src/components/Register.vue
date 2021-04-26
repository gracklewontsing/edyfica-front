<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <form v-on:submit.prevent="register">
          <h1 class="h3 mb-3 font-weight-normal">Módulo de registro</h1>
          <div class="form-group">
            <label for="username">Nombre de usuario</label>
            <input type="text" v-model="username" class="form-control" name="username" placeholder="Introduzca su nombre de usuario">
          </div>          
          <div class="form-group">
            <label for="full_name">Nombre completo</label>
            <input type="text" v-model="full_name" class="form-control" name="full_name" placeholder="Introduzca su nombre completo">
          </div>
          <div class="form-group">
            <label for="area">Area de trabajo</label>
            <input type="text" v-model="area" class="form-control" name="area" placeholder="Especifique su área o lugar de trabajo">
          </div>
          <div class="form-group">
            <label for="last_name">Contraseña</label>
            <input type="password" v-model="password" class="form-control" name="password" placeholder="Introduzca una contraseña">
          </div>
          <button class="btn btn-lg btn-primary btn-block" type="submit" >Registrarse</button>
        </form>
        <b-alert
          :show="dismissCountdown"          
          variant="warning"
          @dismissed="dismissCountdown=0"
          @dismiss-count-down="countDownChanged"
        >
          {{creationResponse}} <br>
          <p>Usted será redirigido en {{ dismissCountdown }} segundos...</p>
          <b-progress
            variant="warning"
            :max="dismissSecs"
            :value="dismissCountdown"
            height="4px"
          ></b-progress>
        </b-alert>
        <b-alert
          :show="error"  
          dismissible        
          variant="danger"
          @dismissed="error=false"
        >
          {{creationResponse}}
        </b-alert>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'

export default {
  data () {
    return {
      full_name: '',
      username: '',
      area: '',
      password: '',
      creationResponse:'',
      dismissSecs:10,
      dismissCountdown:0,
      error:false
    }
  },

  methods: {
    register () {
      axios.post('https://edyfica-server.herokuapp.com/register', {
        full_name: this.full_name,
        password: this.password,
        area: this.area,
        username: this.username
      }).then((response) => {       
        console.log(response) 
        this.error = false
        this.creationResponse = response.data.status + ", favor de regresar a la pagina de ingreso o esperar a ser redirigido/a."
        this.showAlert()
      }).catch((err) => {
        this.creationResponse = "Ocurrió un error, usuario ya registrado o error interno: " + err.response.data
        this.error = true
        console.log(err.response)
      })
    },
    countDownChanged(dismissCountdown) {
      this.dismissCountdown = dismissCountdown
      if(this.dismissCountdown === 0) 
        router.push({ name: 'Login' });
    },
    showAlert() {
      this.dismissCountdown = this.dismissSecs      
    }
  }
}
</script>