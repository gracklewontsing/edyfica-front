<template>
  <div>
    <b-table striped :items="items" :fields="fields"></b-table>
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
        }
      ],
      items: [],      
    }
  },
  methods:{
    getItems(){
      axios.get('https://edyfica-server.herokuapp.com//entries')
      .then(res => {
        if (res.data.error) {
          console.log(res.data.error);
          return ;
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