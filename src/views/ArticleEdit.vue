<script>
    import Navbar from '@/components/Navbar.vue';
    export default{
        name: 'ArticleEdit',
        components: {
            Navbar
        }
    }
</script>


<template>
<Navbar/>
<div class="body-register-product">


<div class="register-container-product">
        <header>Producto</header>
        <form class="form-register-product" action="#">
            <div class="form-first">


                <div class="field-search">
                    <div class="input-field-search">
                        <label>Codigo</label>
                        <input type="text" placeholder="Codigo del producto">  
                    </div>
                    <div class="button-search">
                        <button class="searchbtn">
                            <span class="btnBuscar">Buscar</span>
                        </button>
                    </div>
                </div>


                <div class="details-product">
                    <span class="title">Detalles del producto</span>              
                    <div class="fields">
                        <div class="input-field">
                            <label>Nombre</label>
                            <input type="text" placeholder="Producto" required>
                        </div>
                        <div class="input-field">
                            <label>Codigo</label>
                            <input type="text" placeholder="Codigo de producto" required>
                        </div>
                        <div class="input-field">
                            <label>Precio</label>
                            <input type="text" placeholder="Precio unitario" required>
                            <!-- <input type="number" placeholder="Modelo de producto" required> -->
                        </div>
                        <div class="input-field">
                            <label>Modelo</label>
                            <select required>
                                <option disabled selected>Selecciona un modelo</option>
                                <option>modelo1</option>
                                <option>modelo2</option>
                                <option>modelo3</option>
                            </select>
                        </div>
                        <div class="input-field">
                            <label>Marca</label>
                            <select required>
                                <option disabled selected>Selecciona una marca</option>
                                <option>Chevrolet</option>
                                <option>Dina</option>
                                <option>Ford</option>
                            </select>
                        </div>
                        <div class="input-field">
                            <label>Categoria</label>
                            <select required>
                                <option disabled selected>Selecciona una Categoria</option>
                                <option>Calavera</option>
                                <option>Plafon</option>
                                <option>Frontal</option>
                            </select>
                        </div>
                        <div class="input-field">
                            <label>Proveedor</label>
                            <select required>
                                <option disabled selected>Proveedor del producto</option>
                                <option>Mirsa</option>
                                <option>proveedor2</option>
                                <option>proveedor3</option>
                            </select>
                        </div>
                        <div class="input-field">
                            <label>Estatus</label>
                            <select required>
                                <option disabled selected>Visibilidad del articulo</option>
                                <option>Activo</option>
                                <option>Ocultar</option>
                            </select>
                        </div> 
                        <div class="input-field-checkbox-colors">
                            <label>Color</label>
                            <div class="checkbox-container">
                                <input class="checkbox-colors" type="checkbox" id="cbox" value="oranje">Naranja<br>
                                <input class="checkbox-colors" type="checkbox" id="cbox" value="red">Rojo<br>
                                <input class="checkbox-colors" type="checkbox" id="cbox" value="silver">Plateado<br>
                                <input class="checkbox-colors" type="checkbox" id="cbox" value="orande-red">Naranga/rojo<br>
                            </div>
                        </div>
                        <div class="input-field-text-area">
                            <label>Descripción</label>
                            <textarea type="text" class="text-area-register" name="descripcionRegister" placeholder="Descripción del producto" required></textarea>
                        </div>
                        <div class="input-field-image">
                            <label>Imagen</label>
                            <div class="p-image">
                                <i class="ri-pencil-line upload-button"></i>
                                <input class="file-upload" type="file" accept="image/*"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="details-btns">
                    <button class="deletebtn">
                        <span class="btnEliminar">Eliminar</span>
                    </button>
                    <button class="updatelbtn">
                        <span class="btnActualizar">Actualizar</span>
                    </button>        
                    <button class="cancelbtn">
                        <span class="btnCancelar">Cancelar</span>
                    </button>
                    <button class="savebtn">
                        <span class="btnGuardar">Guardar</span> 
                    </button>
                    
                </div>
            </div>
        </form>
    </div>
    
</div>
</template>
