<template>
<Navbar/>
<div class="body-register-marca">
   <div class="register-container-marca">
      <header>Marcas</header>
        <form class="form-register-marca" action = "#" @submit.prevent="">
            <div class="form-first">
                <div class="details-marca">
                    <span class="title">Editar Marca</span>
                    <div class="fields">
                        <div class="input-field-text-area">
                            <label>Seleccionada</label>
                            <select v-model="brandSelected" @change="loadName">
                                <option selected disabled >Seleccione una marca</option>
                                <option v-for="brand in brands" :value = "brand.id_marca">
                                    {{brand.nombre_marca}}
                                </option>
                            </select>
                        </div>
                        <div class="input-field">

                            <label>Nombre</label>
                            <input type="text" placeholder="Nombre de la marca" required v-model="brandName">
                        </div>
                    </div>
                </div>
                <div class="details-btns">
                    <button class="deletebtn" @click="deleteBrand">
                        <span class="btnEliminar">Eliminar</span>
                    </button>
                    <button class="updatelbtn" @click="editBrand">
                        <span class="btnActualizar">Actualizar</span>       
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>
</template>

<script>
    import Navbar from '@/components/Navbar.vue';
    import axios from 'axios';
    import { ref , onBeforeMount} from 'vue';
    export default{
        name: 'BrandEdit',
        components: {
            Navbar
        },
        setup(){
            var brandSelected = ref(null);
            var brandName = ref(null);
            const brands = ref(null);

            function getAllBrands(){
                axios.get(import.meta.env.VITE_API_URL + '/api/brand')
                .then(response => {
                    brands.value = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
            }

            function loadName (){
                brandName.value = brands.value.filter(brand => brand.id_marca == brandSelected.value)[0].nombre_marca;
            }

            function deleteBrand(){
                axios.delete(import.meta.env.VITE_API_URL + '/api/brand/' + brandSelected.value)
                .then(response => {
                    alert("¡Registro eliminado!");
                    getAllBrands();
                    brandSelected.value= null;
                    brandName.value = null;
                })
                .catch(error => {
                    console.log(error);
                    alert("¡Error en el registro!");
                });
            }

            function editBrand(){
                axios.patch(import.meta.env.VITE_API_URL + '/api/brand/' + brandSelected.value,
                {
                    name: brandName.value
                }
                )
                .then(response => {
                    alert("¡Registro actualizado!");
                    getAllBrands();
                    brandSelected.value= null;
                    brandName.value = null;
                })
                .catch(error => {
                    console.log(error);
                    alert("¡Error en el registro!");
                });
            }

            onBeforeMount(() => {
                getAllBrands();
            })

            return{
                brandSelected,
                brandName,
                brands,
                getAllBrands,
                loadName,
                deleteBrand,
                editBrand
            }
        }
    }
</script>