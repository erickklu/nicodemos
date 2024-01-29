<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">

        <ion-tab-button @click="Info()" tab="tab2">
          <ion-icon aria-hidden="true" :icon="informationOutline" />
          <ion-label>Acerca de</ion-label>
        </ion-tab-button>

      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { personOutline, informationOutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';
const router = useRouter()

async function Info() {
  router.push({ name: 'Info' })
}

</script>
