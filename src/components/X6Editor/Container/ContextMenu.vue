<template>
  <q-menu target="#container" touch-position context-menu>
    <q-list dense style="min-width: 100px" v-if="choiceType == 'node'">
      <q-item clickable v-close-popup>
        <q-item-section @click="$emit('deleteNode')">删除</q-item-section>
      </q-item>
      <q-separator />
      <!-- <q-item clickable v-close-popup>
        <q-item-section @click="$emit('nodeSetting')">配置</q-item-section>
      </q-item> -->
      <q-item clickable v-close-popup>
        <q-item-section @click="$emit('showNode')">查看数据</q-item-section>
      </q-item>
      <q-separator />
      <q-item clickable v-close-popup>
        <q-item-section @click="$emit('addNode')">添加节点</q-item-section>
      </q-item>
    </q-list>

    <q-list dense style="min-width: 100px" v-if="choiceType == 'edge'">
      <q-item clickable v-close-popup>
        <q-item-section @click="$emit('deleteEdge')">删除</q-item-section>
      </q-item>
      <q-separator />
      <q-item clickable v-close-popup>
        <q-item-section @click="$emit('showEdge')">查看数据</q-item-section>
      </q-item>
    </q-list>

    <q-list dense style="min-width: 100px" v-if="choiceType == 'blank'">
      <q-item clickable v-close-popup>
        <q-item-section @click="$emit('showData')">查看数据</q-item-section>
      </q-item>
      <q-separator />
      <q-item clickable>
        <q-item-section>更多</q-item-section>
        <q-item-section side>
          <q-icon name="keyboard_arrow_right" />
        </q-item-section>
        <q-menu anchor="top end" self="top start">
          <q-list dense style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-item-section @click="$emit('refresh')">清空</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    choiceType: {
      type: String,
    },
  },
  setup() {
    // const _this = getCurrentInstance();

    // const showNode = () => {
    //   _this.proxy.showNode();
    // };
    // const nodeSetting = () => {
    //   _this.proxy.nodeSetting();
    // };
    // const deleteNode = () => {
    //   _this.proxy.undo();
    // };
    // const deleteEdge = () => {
    //   _this.proxy.deleteEdge();
    // };
    // const undo = () => {
    //   _this.proxy.undo();
    // };
    // const redo = () => {
    //   _this.proxy.redo();
    // };
    // const showData = () => {
    //   _this.proxy.showData();
    // };
    // const downloadData = () => {
    //   _this.proxy.downloadData();
    // };
    // const refresh = () => {
    //   _this.proxy.refresh();
    // };

    return {
      // showNode,
      // nodeSetting,
      // deleteNode,
      // deleteEdge,
      // undo,
      // redo,
      // showData,
      // downloadData,
      // refresh,
    };
  },
});
</script>

<style scoped>
@import url('../X6Editor.css');
</style>
