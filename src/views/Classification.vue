
<script setup>
    import Navbar from '@/components/Navbar.vue';
</script>

<template>
<Navbar/>
<div class="body-register-category">
   <div class="register-container-category">
      <header>Gestor de categorias</header>
        <form class="form-register-category" action="#">
            <div class="form-first">
                <div class="details-category">
                    <span class="title">Detalle</span>
                    <div class="fields">
                        <div class="input-field">
                            <label>Nombre</label>
                            <input type="text" placeholder="tipo de articulo" required>
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
                    <button class="savebtn">
                        <span class="btnGuardar">Guardar</span> 
                    </button>
                    <button class="cancelbtn">
                        <span class="btnCancelar">Cancelar</span>
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>
</template>