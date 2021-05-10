<template>
  <div>    
    <b-button v-b-toggle.collapse-1>Agregar Articulo</b-button>
    <b-collapse id="collapse-1" class="mt-2">
      <b-card>
        <b-form @submit="addArticle">
          <b-input-group prepend="Nombre" class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-input id="name-input" placeholder="Nombre" v-model="article.name" required></b-form-input>
          </b-input-group>
          <b-input-group prepend="Descripción" class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-text id="desc-input" placeholder="Descripción" v-model="article.description" required></b-form-text>
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
            <Selector v-model="article.area"/>        
          </b-input-group>
          <b-input-group prepend="Proyecto" class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-input id="project-input" placeholder="Proyecto" v-model="article.project" required></b-form-input>
          </b-input-group>
          <b-input-group prepend="Comentarios" class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-text id="comments-input" placeholder="Comentarios" v-model="article.comments" required></b-form-text>
          </b-input-group>
          <b-button type="submit" variant="primary">Agregar</b-button>
        </b-form>
      </b-card>
    </b-collapse> 
    <Selector v-model="selected" @input="getItems(selected)"/>
    <b-table striped :items="items" :fields="fields" :key="tableKey" striped-responsive="sm">
      <template #cell(show_details)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? 'Esconder' : 'Ver'}} Detalles
        </b-button>        
        <b-button size="sm" @click="info(item.id)" class="mr-1">
          Editar
        </b-button>
        <b-button size="sm" @click="deleteArticle(item.id)" class="mr-1" variant="danger">
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
    <b-modal ref="my-modal" title="Editar Articulo">
      <b-form @submit="updateArticle">
          <b-input-group prepend="Nombre" class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-input id="name-input" placeholder="Nombre" v-model="update.name"></b-form-input>
          </b-input-group>
          <b-input-group prepend="Descripción" class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-text id="desc-input" placeholder="Descripción" v-model="update.description"></b-form-text>
          </b-input-group>
          <b-input-group prepend="Cantidad" class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-spinbutton id="quantity-input" v-model="update.amount" min="1" max="100"></b-form-spinbutton>
          </b-input-group>
          <b-input-group prepend="Precio" class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-input id="price-input" placeholder="0.00" type="number" v-model="update.price"></b-form-input>
          </b-input-group>
          <b-input-group prepend="Adquirido en" class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-input id="place-input" placeholder="Lugar" v-model="update.acquiredAt"></b-form-input>
          </b-input-group>
          <b-input-group prepend="Area" class="mb-2 mr-sm-2 mb-sm-0">
            <Selector v-model="update.area"/>        
          </b-input-group>
          <b-input-group prepend="Proyecto" class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-input id="project-input" placeholder="Proyecto" v-model="update.project"></b-form-input>
          </b-input-group>
          <b-input-group prepend="Comentarios" class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-text id="comments-input" placeholder="Comentarios" v-model="update.comments"></b-form-text>
          </b-input-group>
          <b-button type="submit" variant="primary">Actualizar</b-button>
        </b-form>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
import Selector from '@/components/Selector'
export default {
  components:{Selector},
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
        "Detalles"
      ],
      items: [],   
      selected: "",
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
        id:"",
        name: "",
        description:"",
        amount: "",
        price: "",
        acquiredAt: "",
        area: "",
        project: "",
        comments:""
      },
    }
  },
  methods:{
    getItems(area){            
      axios.get(`https://edyfica-server.herokuapp.com/articles/${area}`)
      .then(res => {
        if (res.data.error) {
          console.log(res.data.error);
          return;
        }            
        else {
          this.items = res.data
          this.forceRerender()
        }
          console.log(res)
        }).catch(err => {
          console.log(err);
      })      
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
        else {                    
          this.forceRerender()
        }
          console.log(res)
        }).catch(err => {
          console.log(err);
      })
    },
    updateArticle(){
      if(this.update.name ===""){
        this.update.name = this.article.name
      }
      if(this.update.description===""){
        this.update.description = this.article.description
      }
      if(this.update.amount===""){
        this.update.amount = this.article.amount
      }
      if(this.update.price===""){
        this.update.price = this.article.price
      }
      if(this.update.acquiredAt===""){
        this.update.acquiredAt = this.article.acquiredAt
      }
      if(this.update.area===""){
        this.update.area = this.article.area
      }
      if(this.update.project===""){
        this.update.project = this.article.project
      }
      if(this.update.comments===""){
        this.update.comments = this.article.comments
      }
      axios.post(`https://edyfica-server.herokuapp.com/article/update`,{
        _id:this.update.id,
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
        else {                    
          this.forceRerender()
        }
          console.log(res)
        }).catch(err => {
          console.log(err);
      })
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
        else {                    
          this.forceRerender()
        }
          console.log(res)
        }).catch(err => {
          console.log(err);
      })
    },
    info(id){
      this.update.id = id
      this.$refs['my-modal'].show()
    },
    forceRerender() {
      this.tableKey += 1
    }
  },
}
</script>