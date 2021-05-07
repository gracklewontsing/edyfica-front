<template>
<!-- eslint-disable -->
  <div class="home">
    <b-row class="m-5">
      <b-col v-if="isEntering==='yes'">
        <b-button variant="primary" @click="entry">Registrar entrada</b-button>
      </b-col>
    </b-row>
    <b-row class="m-5" v-if="isEntering==='no'">
      <b-col v-if="isPausing==='yes'">
        <b-button v-b-toggle.pauseCollapse>Registrar pausa</b-button>
        <b-collapse id="pauseCollapse" class="  mt-2">
          <b-form v-on:submit="pause">                    
            <div class="form-group">
              <b-input-group prepend="Razón">
                <b-form-input type="text" v-model="reason" class="form-control" name="reason" placeholder="Razón para la pausa"></b-form-input>
              </b-input-group>
            </div>
            <div class="form-group">
              <button class="btn btn-warning btn-block" type="submit">Registrar pausa</button>
            </div>
          </b-form>
        </b-collapse>
      </b-col>
      <b-col v-if="isPausing==='no'">
        <b-button @click="pauseOut">Terminar pausa</b-button>       
      </b-col>
    </b-row>
    <b-row>
      <b-col v-show="(isEntering === 'no' )&& (isPausing === 'yes')">
        <b-button variant="danger" @click="exit">Registrar Salida</b-button>
      </b-col>
    </b-row>

    <h1>Instrucciones</h1>
    <p>Presionar el boton 'Registrar Entrada' para iniciar la asistencia.</p>
    <p>El boton 'Registrar Entrada' desaparece cuando ya ha sido registrada la asistencia.</p>
    <p>Los demás botones también desaparecen dependiendo de su estado de asistencia.</p>
    <p>Para registrar pausas, se deben registrar cuando se ha registrado la entrada, y requiere especificar la razón de la pausa.</p>
    <p>Las pausas necesitan registrar sus horas de termino, de lo contrario no podra registrar entradas, salidas, u otras pausas</p>
    <p>Para registrar el final de la pausa, se presiona el botón al momento que termina su pausa.</p>
    <p>Para registrar la salida, no debe de haber pausas sin terminar, y debe presionar el botón de terminar salida.</p>
    <p>Habiendo registrado la salida, se rehabilita el botón de 'Registrar entrada'. Esto significa que su salida ha sido registrada, y puede cerrar sesión hasta su proximo turno. </p>
  </div>
</template>

<script>
import axios from 'axios'
import VueJwtDecode from "vue-jwt-decode";
export default {
  name: "Home",
  components: {        
  },
  data() {
    return {
      isEntering: "yes",
      isPausing: "no",      
      reason: '',
      full_name: ''
    }
  },
  methods:{
    extractUser() {
      let token = localStorage.getItem("usertoken");
      if (token) {
        let decoded = VueJwtDecode.decode(token);        
        this.full_name = decoded.full_name        
        console.log(decoded)
      }
    },
    pause(){                             
        axios.post('https://edyfica-server.herokuapp.com/pauseIn', //herokuapp
          {
            pauseReason:this.reason,
            full_name: this.full_name            
          }).then(res => {
            if (res.data.error) {
              console.log(res.data.error);
              return ;
            }            
            console.log(res)                                    
          }).catch(err => {
            console.log(err);
          })                
        localStorage.isPausing = "no"
        window.location.reload()                                      
    },
    pauseOut(){
      axios.post('https://edyfica-server.herokuapp.com/pauseOut',
          {
            full_name:this.full_name
          }).then(res => {
            if (res.data.error) {
                console.log(res.data.error);
                return ;
              }            
            console.log(res)                                    
          }).catch(err => {
              console.log(err);
          })        
        localStorage.isPausing = "yes"        
        window.location.reload() 
    },
    entry(){
      axios.post('https://edyfica-server.herokuapp.com/entry',
        {
          full_name:this.full_name
        }).then(res => {
          if (res.data.error) {
              console.log(res.data.error);
              return ;
            }            
          console.log(res)
          localStorage.isEntering = "no"
          localStorage.isPausing = "yes"
          window.location.reload()
        }).catch(err => {
            console.log(err);
        })                
    },
    exit(){
      axios.post('https://edyfica-server.herokuapp.com/exit',
        {
          full_name:this.full_name
        }).then(res => {
          if (res.data.error) {
              console.log(res.data.error);
              return ;
            }            
          console.log(res)
          localStorage.isEntering = "yes"
          localStorage.isPausing = "no"
          window.location.reload()
        }).catch(err => {
            console.log(err);
        })                
    }
  },
  mounted(){
    this.extractUser()
    if(localStorage.isEntering){this.isEntering = localStorage.isEntering}
    if(localStorage.isPausing) {this.isPausing = localStorage.isPausing }
    console.log("entrando: "+this.isEntering)   
    console.log("pausando: " +this.isPausing)
  }
};
</script>
