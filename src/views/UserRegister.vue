<template>
<div class="register-body">
    <div class="register-container">
        <header>REGISTRO DE USUARIO</header>
        <!-- <h1 class="register-title">REGISTRO DE USUARIO</h1> -->
        <form class="register-form">
            <ul>
                <li>
                  <select>
                    <option selected disabled>Perfil de usuario</option>
                    <option>Administrador</option>
                    <option>Capturista</option>   
                  </select>
                </li>
                <li>
                  <div class="grid grid-2">
                    <input type="text" placeholder="Nombre" required>  
                    <input type="text" placeholder="Apellidos" required>
                </div>
                </li>
                <li>
                  <div class="grid grid-2">
                    <input type="email" placeholder="Correo electronico" required>  
                    <input type="email" placeholder="Correo secundario" required>  
                  </div>
                </li> 
                <li>
                    <div class="grid grid-2">
                        <!-- <label for="password" class="form-label">Password</label> -->
                        <input type="password" name="cboPassword" placeholder="Contraseña" required/>
                        <input type="password" name="cboPassword" placeholder="Confirmar Contraseña" required/>
                    </div>
                </li>                      
            </ul>
            <div class="flex-container-register">
                <div class="g-recaptcha" data-sitekey="6LepvhcfAAAAAPG4wxKOA31RLVzjMA9oJySbN2ru"></div><!-- clave del sitio -->
                <button class="btn-register" type="submit" value="Register" onclick="Registrar()">Registrar</button>
            </div>            
        </form>       
    </div>
</div>

</template>