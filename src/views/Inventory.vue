<template>
  <div>    
    <b-button v-b-toggle.collapse-1 class="my-4">{{collapsed ? "Cerrar Formato": "Agregar Articulo"}}</b-button>
    <b-collapse id="collapse-1" class="mt-2" v-model="collapsed">
      <b-card>        
          <b-input-group prepend="Nombre" class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-input id="name-input" placeholder="Nombre" v-model="article.name" required></b-form-input>
          </b-input-group>
          <b-input-group prepend="Descripción" class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-input id="desc-input" placeholder="Descripción" v-model="article.description" required></b-form-input>
          </b-input-group>
          <b-input-group prepend="Cantidad" class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-spinbutton id="quantity-input" v-model="article.amount" min="1" max="100"></b-form-spinbutton>
          </b-input-group>
          <b-input-group prepend="Precio" class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-input id="price-input" placeholder="0.00" type="number" v-model="article.price" required></b-form-input>
          </b-input-group>
          <b-input-group prepend="Adquirido en" class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-input id="place-input" placeholder="Fecha" v-model="article.acquiredAt" required></b-form-input>
          </b-input-group>
          <b-input-group prepend="Area" class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-select v-model="article.area" :options="options"/>        
          </b-input-group>
          <b-input-group prepend="Proyecto" class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-input id="project-input" placeholder="Proyecto" v-model="article.project" required></b-form-input>
          </b-input-group>
          <b-input-group prepend="Comentarios" class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-input id="comments-input" placeholder="Comentarios" v-model="article.comments" required></b-form-input>
          </b-input-group>
          <b-button @click="addArticle" variant="primary">Agregar</b-button>        
      </b-card>
    </b-collapse>     
    <br>    
    <b-form-select v-model="selected" :options="options" @input="getItems(selected)" class="my-2 w-75"></b-form-select>
    <b-table class="mx-2" striped :items="items" :fields="fields" :key="tableKey" striped-responsive="sm">
      <template #cell(show_details)="row">
        <b-button block size="sm" @click="row.toggleDetails" class="mr-1 my-1">
          {{ row.detailsShowing ? 'Esconder' : 'Ver'}} Detalles
        </b-button>        
        <b-button block size="sm" @click="info(row.item)" class="mr-1 my-1">
          Editar
        </b-button>
        <b-button block size="sm" @click="deleteArticle(row.item._id)" class="mr-1 my-1" variant="danger">
          Borrar
        </b-button>
      </template>      

      <template #row-details="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Cantidad:</b></b-col>
            <b-col>{{ row.item.amount }}</b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Precio:</b></b-col>
            <b-col>{{ row.item.price }}</b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Fecha de Adquicisión:</b></b-col>
            <b-col>{{ row.item.acquiredAt }}</b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Proyecto:</b></b-col>
            <b-col>{{ row.item.project }}</b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Comentarios:</b></b-col>
            <b-col>{{ row.item.comments }}</b-col>
          </b-row>
          
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Fecha de Creación:</b></b-col>
            <b-col>{{ row.item.updatedAt }}</b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Fecha de Actualizacion:</b></b-col>
            <b-col>{{ row.item.updatedAt }}</b-col>
          </b-row>

          <b-button size="sm" @click="row.toggleDetails">Esconder Detalles</b-button>
        </b-card>
      </template>
    </b-table>
    <b-button @click="download" class="my-4">Exportar listado</b-button>
    <b-modal ref="my-modal" title="Editar Articulo">      
      <b-input-group prepend="Nombre" class="mb-2 mr-sm-2 mb-sm-0">
        <b-form-input id="name-input" placeholder="Nombre" v-model="update.name"></b-form-input>
      </b-input-group>
      <b-input-group prepend="Descripción" class="mb-2 mr-sm-2 mb-sm-0">
        <b-form-input id="desc-input" placeholder="Descripción" v-model="update.description"></b-form-input>
      </b-input-group>
      <b-input-group prepend="Cantidad" class="mb-2 mr-sm-2 mb-sm-0">
        <b-form-spinbutton id="quantity-input" v-model="update.amount" min="1" max="100"></b-form-spinbutton>
      </b-input-group>
      <b-input-group prepend="Precio" class="mb-2 mr-sm-2 mb-sm-0">
        <b-form-input id="price-input" placeholder="0.00" type="number" v-model="update.price"></b-form-input>
      </b-input-group>
      <b-input-group prepend="Adquirido en" class="mb-2 mr-sm-2 mb-sm-0">
        <b-form-input id="place-input" placeholder="Fecha" v-model="update.acquiredAt"></b-form-input>
      </b-input-group>
      <b-input-group prepend="Area" class="mb-2 mr-sm-2 mb-sm-0">
        <b-form-select v-model="update.area" :options="options"/>        
      </b-input-group>
      <b-input-group prepend="Proyecto" class="mb-2 mr-sm-2 mb-sm-0">
        <b-form-input id="project-input" placeholder="Proyecto" v-model="update.project"></b-form-input>
      </b-input-group>
      <b-input-group prepend="Comentarios" class="mb-2 mr-sm-2 mb-sm-0">
        <b-form-input id="comments-input" placeholder="Comentarios" v-model="update.comments"></b-form-input>
      </b-input-group>
      <b-button @click="updateArticle" variant="primary">Actualizar</b-button>        
    </b-modal>    
  </div>
</template>

<script>
import axios from 'axios'
export default {
  components:{},
  data(){
    return{
      fields:[
        {
          key:'name',
          label:'Articulo',
          sortable:true
        },
        {
          key:'description',
          label:'Descripción',
          sortable:true,          
        },
        { key: 'show_details', label: 'Detalles' }
      ],
      items: [],   
      collapsed:false,
      selected: null,
      tableKey: 0,
      article: {
        name: "",
        description:"",
        amount: 0,
        price: 0,
        acquiredAt: "",
        area: "",
        project: "",
        comments:""
      },
      update: {
        _id:"",
        name: "",
        description:"",
        amount: "",
        price: "",
        acquiredAt: "",
        area: "",
        project: "",
        comments:""
      },
      options: [
        {value:null, text:"Seleccione una area", disabled:true},
        {value:'direccion', text:"Dirección"},
        {value:'computo-direccion', text:"Dirección, equipo de computo"},
        {value:'biblioteca', text:"Biblioteca"},        
        {value:'talleres-edificio-2', text:"Talleres educativos Edificio 2"},
        {value:'planta-baja-edificio-2', text:"Planta Baja, Edificio 2"},
        {value:'oficina-varias', text:"Oficina Varias, Edificio 1"},
        {value:'bodega-cancha', text:"Bodega de cancha"},
        {value:'cocina-talleres', text:"Cocina de talleres"},
        {value:'edificio-1-planta-baja', text:"Planta Baja, Edificio 1"},
        {value:'recepcion', text:"Recepción"},
        {value:'consultorio', text:"Consultorio"},
        {value:'cocina-edificio-1', text:"Cocina, Edificio 1"},
        {value:'salon-multiusos', text:"Salón multiusos"},
        {value:'limpieza', text:"Limpieza"},
        {value:'bodega-salon-multiusos', text:"Bodega, Salón Multiusos"},
        {value:'bodega-debajo-escaleras', text:"Bodega debajo de las escaleras"},
        {value:'baño-operativo', text:"Baño de operativo"},
        {value:'afuera', text:"Afuera"},
        {value:'sala-computo-1', text:"Salon de Computacion 1"},
        {value:'sala-computo-2', text:"Salon de Computacion 2"}
      ]   
    }
  },
  methods:{
    forceRerender() {
      this.tableKey += 1
    },
    getItems(area){            
      axios.get(`https://edyfica-server.herokuapp.com/articles/${area}`)
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
      this.forceRerender()
    },
    addArticle(){
      axios.post(`https://edyfica-server.herokuapp.com/article/create`,{
        name:this.article.name,
        amount:this.article.amount,
        description:this.article.description,
        price:this.article.price,
        acquiredAt:this.article.acquiredAt,
        area:this.article.area,
        project:this.article.project,
        comments:this.article.comments
      })
      .then(res => {
        if (res.data.error) {
          console.log(res.data.error);
          return;
        }                    
        console.log(res)
        }).catch(err => {
          console.log(err);
      })
      this.forceRerender()
    },
    updateArticle(){
      axios.post(`https://edyfica-server.herokuapp.com/article/update`,{
        _id:this.update._id,
        name:this.update.name,
        amount:this.update.amount,
        description:this.update.description,
        price:this.update.price,
        acquiredAt:this.update.acquiredAt,
        area:this.update.area,
        project:this.update.project,
        comments:this.update.comments
      })
      .then(res => {
        if (res.data.error) {
          console.log(res.data.error);
          return;
        }            
        this.$refs['my-modal'].hide()        
        console.log(res)
        }).catch(err => {
          console.log(err);
      })
      this.forceRerender()
    },
    deleteArticle(id){
       axios.post(`https://edyfica-server.herokuapp.com/article/delete`,{
         _id:id
       })
       .then(res => {
        if (res.data.error) {
          console.log(res.data.error);
          return;
        }                                
        
        console.log(res)
        }).catch(err => {
          console.log(err);
      })
      this.forceRerender()
    },
    info(item){
      this.update = item            
      console.log(item)
      this.$refs['my-modal'].show()
    },
    JSON2CSV(){
      var array = this.items;
      var str = '';
      var line = '';      
      for (var i = 0; i < array.length; i++) {
       line = '';
        for (var index in array[i]) {
          var value = array[i][index] + "";
          line += '"' + value.replace(/"/g, '""') + '",';
        }
        line = line.slice(0, -1);
        str += line + '\r\n';
      }
      return str;
    },
    download(){
      var csv = this.JSON2CSV();
       var downloadLink = document.createElement("a");
    var blob = new Blob(["\ufeff", csv]);
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "data.csv";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    }
  },
}
</script>