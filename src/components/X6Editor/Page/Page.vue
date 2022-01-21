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
/* eslint-disable */
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
      _this.parent.ctx.showNode();
    };
    const nodeSetting = () => {
      _this.parent.ctx.nodeSetting();
    };
    const deleteNode = () => {
      _this.parent.ctx.undo();
    };
    const deleteEdge = () => {
      _this.parent.ctx.deleteEdge();
    };
    const undo = () => {
      _this.parent.ctx.undo();
    };
    const redo = () => {
      _this.parent.ctx.redo();
    };
    const showData = () => {
      _this.parent.ctx.showData();
    };
    const downloadData = () => {
      _this.parent.ctx.downloadData();
    };
    const refresh = () => {
      _this.parent.ctx.refresh();
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
/* eslint-disable */
</script>
