<template>
  <div>
    <!--b-table striped :items="items" :fields="fields"></b-table-->
    <b-table-simple>
      <col>
      <col>
      <col>
      <col>
      <col>
      <col>
      <col>
      <b-thead head-variant="dark">
        <b-tr>
          <b-th>Nombre Completo</b-th>
          <b-th>Tiempo de entrada</b-th>
          <b-th>Tiempo de salida</b-th>          
          <b-th>Duración</b-th>
          <b-th>Comentarios Entrada</b-th>
          <b-th>Comentarios Salida</b-th>
          <b-th>Pausas</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="(item) in items" :key="item.full_name">
          <b-th>{{item.full_name}}</b-th>
          <b-td>{{new Date(item.rawEntry).toLocaleTimeString('es-MX',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',hour:"2-digit", minute:"numeric",second:"numeric"})}}</b-td>
          <b-td>{{new Date(item.rawExit).toLocaleTimeString('es-MX',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',hour:"2-digit", minute:"numeric",second:"numeric"})}}</b-td>          
          <b-td>{{item.duration}}</b-td>
          <b-td>{{item.entryComments}}</b-td>
          <b-td>{{item.exitComments}}</b-td>
          <b-tr v-for="pause in item.pauses" :key="pause.reason">            
            <b-td>Razón: {{pause.pauseReason}}</b-td>
            <b-td>Duración: {{pause.pauseDuration}}</b-td>
            <b-td>Desde: {{new Date(pause.rawPauseBegin).toLocaleTimeString()}} Hasta: {{new Date(pause.rawPauseEnd).toLocaleTimeString()}}</b-td>
          </b-tr>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </div>
</template>

<script>

import axios from 'axios'
export default {
  data(){
    return{
      fields:[
        {
          key:'full_name',
          label:'Nombre Completo',
          sortable:true
        },
        {
          key:'entryDayTime',
          label:'Tiempo de entrada',
          sortable:true,
          variant:'primary'
        },
        {
          key:'exitDayTime',
          label:'Tiempo de salida',
          sortable:true,
          variant:'success'
        },
        {
          key:'pauses',
          label:'Pausas',
          sortable:true,
          variant:'success'
        },
        {
          key:'duration',
          label:'Duración',
          sortable:true
        },
        {
          key:'entryComments',
          label: 'Comentarios entrada',          
        },
        {
          key:'exitComments',
          label: 'Comentarios salida'
        }
      ],
      items: [],      
    }
  },
  methods:{
    getItems(){      
      axios.get('https://edyfica-server.herokuapp.com/entries')
      .then(res => {
        if (res.data.error) {
          console.log(res.data.error);
          return;
        }            
        else {
          this.items = res.data
        }
          console.log(res)
        }).catch(err => {
          console.log(err);
        })      
    }
  },
  mounted(){
    this.getItems()
  }
}
</script>

<style>

</style>