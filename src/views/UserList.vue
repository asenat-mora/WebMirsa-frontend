<template>
  <div class="body-register-marca">
    <div class="register-container-marca">
        <header>USUARIOS</header>
        <form class="form-register-marca">
            <div class="form-first">
                <div class="details-marca">
                   <!--  <span class="title">DETALLES DE MARCA</span> -->
                    <div class="fields">

                      <EasyDataTable :headers="headers" :items="items">
                        <template #item-team="{ teamName, teamUrl }">
                          <a :href="teamUrl">{{ teamName }}</a>
                        </template>
                        <template #item-indicator.weight="item">
                          {{ item.indicator.weight }} (lbs)
                        </template>
                      </EasyDataTable>



                    </div>
                </div>
                <!-- <div class="details-btns">
                    <button type="button" class="cancelbtn" @click="goBack($event)">
                        <span class="btnCancelar">Volver</span>
                    </button>
                    <button class="savebtn" type="submit">
                        <span class="btnGuardar">Registrar</span>
                    </button>
                </div> -->
            </div>
        </form>
    </div>
</div>
</template>

<script lang="ts" setup>
  import type { Header, Item } from "vue3-easy-data-table";
  
  const headers: Header[] = [
    { text: "Nombre", value: "nombre" },
    { text: "Apellidos", value: "apellidos" },
    { text: "Correo", value: "correo" },
    { text: "Rol", value: "rol" },
    { text: "Operation", value: "operation"},

/* 
    { text: "TEAM", value: "team"},
    { text: "NUMBER", value: "number"},
    { text: "POSITION", value: "position"},
    { text: "HEIGHT", value: "indicator.height"},
    { text: "WEIGHT", value: "indicator.weight", sortable: true},
    { text: "LAST ATTENDED", value: "lastAttended"},
    { text: "COUNTRY", value: "country"},
    { text: "Operation", value: "operation"}, */
  ];
  
  const items: Item[] = [
      { "id": 1, "nombre": "Yun", "apellidos": "Stephen Curry", "correo": "yunelgato♦gmail.com", "rol": "admi"},
     /*  { "id": 1, "nombre": "Stephen Curry", "teamName": "GSW", "teamUrl": "https://www.nba.com/team/1610612744/warriors", "number": 30, "position": 'G', indicator: {"height": '6-2', "weight": 185}, "lastAttended": "Davidson", "country": "USA"},
      { "id": 2, "nombre": "Lebron James", "teamName": "LAL", "teamUrl": "https://www.nba.com/team/1610612747/lakers", "number": 6, "position": 'F', indicator: {"height": '6-9', "weight": 250}, "lastAttended": "St. Vincent-St. Mary HS (OH)", "country": "USA"},
      { "id": 3, "nombre": "Kevin Durant", "teamName": "BKN", "teamUrl": "https://www.nba.com/team/1610612751/nets", "number": 7, "position": 'F', indicator: {"height": '6-10', "weight": 240}, "lastAttended": "Texas-Austin", "country": "USA"},
      { "id": 4, "nombre": "Giannis Antetokounmpo", "teamName": "MIL", "teamUrl": "https://www.nba.com/team/1610612749/bucks", "number": 34, "position": 'F', indicator: {"height": '6-11', "weight": 242}, "lastAttended": "Filathlitikos", "country": "Greece"}, */
    ];

  </script>