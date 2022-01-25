<!--
 * @Author: your name
 * @Date: 2021-05-06 08:49:23
 * @LastEditTime: 2021-08-12 14:16:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \gridservice-admin-oidc-support-ts-vue3-grammar-update\src\layouts\MainLayout.vue
-->
<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="my-header">
      <q-toolbar>
        <q-toolbar-title class="text-black">
          <q-avatar>
            <q-icon name="map" size="28px" />
          </q-avatar>
          X6Editor
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container class="my-page-container">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped>
.my-header {
  background: #f1f4f6;
  border-top: 1px solid #c9c9c9;
  border-bottom: 1px solid #c9c9c9;
}
.my-page-container {
  background: #f1f4f6;
  min-height: 100vh;
}
</style>
