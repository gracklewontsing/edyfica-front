<template>
  <div>
    <b-form-select :options="options"></b-form-select>
  </div>
</template>

<script>
export default {
  name: "Selector",
  data() {
    return {      
      options: [
        {value:null, text:"Seleccione una area"},
        {value:'direccion', text:"Dirección"},
        {value:'computo-direccion', text:"Dirección, equipo de computo"},
        {value:'biblioteca', text:"Biblioteca"},
        {value:'df-comunicacion-dc', text:"DF-Comunicacion-DC"},
        {value:'talleres-edificio-2', text:"Talleres educativos Edificio 2"},
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
  }
}
</script>

<style>

</style>