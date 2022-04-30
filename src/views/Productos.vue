<script>
    import Navbar from '@/components/Navbar.vue';
    export default{
        name: 'Article',
        components: {
            Navbar
        }
    }
</script>
<template> 
<Navbar/>

<div class="body-productosMirsa">
    <div class="container-allproducts">

        <div class="product-card">           
            <div class="logo-cart">
                <span class="marca">Ford</span>
            </div>
            <div class="main-images">
                <img id="blue" class="blue active" src="src/assets/img/products/micaPlafonFordEscudoConReversa1F.png" alt="blue">
                <!--<img id="pink" class="pink" src="images/pink.png" alt="blue">-->
                <!--<img id="yellow" class="yellow" src="images/yellow.png" alt="blue">-->
            </div>
            <div class="details-card">
                <span class="product-name">Mica plafon</span>
                <p>Escudo con reversa <br> luhdfglou injfdcgoui ncgñfoiujknvchñinvch</p>
            </div>
            <div class="color-price">
                <div class="color-option">
                    <span class="color">Colour:</span>
                    <div class="circles">
                    <span class="circle blue active"  id="blue"></span>
                    <span class="circle pink " id="pink"></span>
                    <span class="circle yellow " id="yellow"></span>
                    <span class="circle yellow " id="yellow"></span>
                    <span class="circle yellow " id="yellow"></span>
                    <span class="circle yellow " id="yellow"></span>
                </div>
            </div>
            <div class="price">
                <span class="price_num">$125.00</span>
                <!-- <span class="price_letter">Nine dollar only</span> -->
            </div>
            </div>
            <div class="button">
                <!-- <div class="button-add"></div> -->
                <button class="button-add">Añadir Cotización</button>
            </div>
        </div>



    </div>
</div>

</template>

<!-- <script>
   let circle = document.querySelector(".color-option");

   circle.addEventListener("click", (e)=>{
     let target = e.target;
     if(target.classList.contains("circle")){
       circle.querySelector(".active").classList.remove("active");
       target.classList.add("active");
       document.querySelector(".main-images .active").classList.remove("active");
       document.querySelector(`.main-images .${target.id}`).classList.add("active");
     }
   });
</script> -->