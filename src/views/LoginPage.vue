<template>
  <ion-page>
    <ion-content>
      <ion-card style="height: 97%;">
        <ion-card-content class="ion-text-center" style="height: 100%;">

          <img src="/pucesdlogo.png" alt="">

          <h1>
            BIBLIOTECA nuevo2
          </h1>
          <p>
            Ingrese su cédula
          </p>

          <ion-input placeholder="xxxxxxxxxx" v-model="cedula"></ion-input>
          <ion-button :disabled="cedula.length == 0" @click="obtenerDatos()"
            style="padding-top: 12px;">INGRESAR</ion-button>

        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject, SQLiteOriginal } from '@ionic-native/sqlite/ngx';
import { alertController } from '@ionic/vue';

const storage = new Storage();

// ... (resto del código)

onMounted(async () => {
  await storage.create();
  user.value = await storage.get('dato');

  if (user.value) {
    MenuPrincipal();
  }
});

// ... (resto del código)


interface Estudiante {
  es_codi: number;
  es_cedu: number;
  es_nomb: string;
  es_apel: string;
  es_correo: string;
}


const user = ref({
  apellidos: "",
  nombres: "",
  cedula: ""
})

const cedula = ref("")

async function obtenerDatos() {
  try {
    // Abrir la base de datos SQLite
    const db: SQLiteObject = await SQLiteOriginal.create({
  name: 'estudiantes.db',
  location: 'default',
});


    // Crear la tabla si no existe (puedes mover esto a la inicialización de tu aplicación)
    await db.executeSql(
      "CREATE TABLE IF NOT EXISTS estudiantes (es_codi INTEGER PRIMARY KEY, es_cedu INTEGER, es_nomb TEXT, es_apel TEXT, es_correo TEXT)",
      []
    );

    // Consultar la base de datos SQLite
    const result = await db.executeSql(
      "SELECT * FROM estudiantes WHERE es_cedu = ?",
      [cedula.value]
    );

    if (result.rows.length > 0) {
      const estudiante = {
        apellidos: result.rows.item(0).es_apel,
        nombres: result.rows.item(0).es_nomb,
        cedula: result.rows.item(0).es_cedu,
      };

      // Almacenar datos en el almacenamiento local
      storage.set('dato', estudiante);
      
      MenuPrincipal();

    } else {
      const alert = await alertController.create({
        header: 'Cédula no válida',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
  } catch (error) {
    console.error("Error al obtener datos del estudiante:", error);
  }
}

async function obtenerDatosEstudiante(): Promise<Estudiante[] | null> {
  try {
    // Obtener datos almacenados localmente
    const estudiantes: Estudiante[] | null = await storage.get('estudiantes');

    return estudiantes || null;
  } catch (error) {
    console.error('Error al obtener datos del estudiante:', error);
    return null;
  }
}

const router = useRouter();

function MenuPrincipal() {
  router.replace({ name: 'tabsp' });
}

</script>

<style scoped>
ion-button {
  --background: #2A9EF9;
}
</style>
