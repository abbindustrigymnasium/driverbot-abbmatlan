
<template>
<v-btn color="primary" dark @click.stop="dialog = true">Anslutningsalternativ</v-btn>
      <v-btn target="_blank" @click="Switch=!Switch">
        <span v-if="Switch!==true" class="mr-2">Buttons 1</span>
        <span v-else class="mr-2">Buttons 2</span>
      </v-btn>
</template>>