<template>
  <div>
    <q-page>
      <div id="container">
        <ContextMenu />
      </div>
    </q-page>
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue';
import ContextMenu from './ContextMenu.vue';

export default {
  components: {
    ContextMenu,
  },
  props: {
    choiceType: {
      type: String,
    },
  },
  setup() {
    const _this = getCurrentInstance();

    const showNode = () => {
      _this.parent.proxy.showNode();
    };
    const nodeSetting = () => {
      _this.parent.proxy.nodeSetting();
    };
    const deleteNode = () => {
      _this.parent.proxy.undo();
    };
    const deleteEdge = () => {
      _this.parent.proxy.deleteEdge();
    };
    const undo = () => {
      _this.parent.proxy.undo();
    };
    const redo = () => {
      _this.parent.proxy.redo();
    };
    const showData = () => {
      _this.parent.proxy.showData();
    };
    const downloadData = () => {
      _this.parent.proxy.downloadData();
    };
    const refresh = () => {
      _this.parent.proxy.refresh();
    };

    return {
      showNode,
      nodeSetting,
      deleteNode,
      deleteEdge,
      undo,
      redo,
      showData,
      downloadData,
      refresh,
    };
  },
};
</script>

<style scoped>
@import url('../X6Editor.css');
</style>
