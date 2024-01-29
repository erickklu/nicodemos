<template>
  <ion-page>
    <ion-header>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-card style="height: 97%;" >
        <ion-card-content>
          <div style="padding-left: 0%; padding-right: 0%; height: 800px;">
            <h1 style="color: black;">Datos de Usuario</h1>
            <div style="padding-top: 15%; text-align: center; justify-content: center;">

              <ion-card>
                <ion-card-content>
                  <h5 style="font-weight: bold;">APELLIDOS: </h5><span v-text="user.apellidos"></span>
                  <hr>
                  <h5 style="font-weight: bold;">NOMBRES: </h5><span v-text="user.nombres"></span>
                  <hr>
                  <h5 style="font-weight: bold;">CÉDULA: </h5><span v-text="user.cedula"></span>
                  <hr>
                </ion-card-content>
              </ion-card>
              
              <img :src="Qr" alt="" style="height: 400px;">

              <ion-button @click="Login()">Cambiar de usuario</ion-button>

            </div>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonCard, IonCardContent, IonButton } from '@ionic/vue';
import { ref, onMounted, reactive } from 'vue';
import { Storage } from '@ionic/storage';
import { useRouter } from 'vue-router';
import qr from 'qrcode';

const store = new Storage();
let Qr = ref("")

onMounted(async () => {
  await store.create();
  console.log('ingresado');

  try {
    const datos = await store.get('dato');

    user.value.apellidos = datos.es_apel;
    user.value.nombres = datos.es_nomb;
    user.value.cedula = datos.es_cedu;
    user.value.correo = datos.es_correo;

    let stJson = JSON.stringify(user.value);
    qr.toDataURL(stJson, function (err, code) {
    if (err) return;
      Qr.value = code
    });
    
  } catch (error) {
    console.error("Error al recuperar datos:", error);
  }
});

const user = ref({
  apellidos: "",
  nombres: "",
  cedula: "",
  correo: ""
});

const router = useRouter();

async function Login() {
  router.replace({ name: 'Login' });
  await store.clear();
}

</script>

<style scoped>
ion-button {
  --background: #2A9EF9;
}

ion-fab-button {
  --background: white;
  --color: rgb(79, 79, 79);
}
</style>
