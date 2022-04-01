<template>
  <div>
    <q-drawer
      overlay
      id="rightDrawer"
      v-model="editorStore.showRightDrawer"
      :width="300"
      bordered
      side="right"
    >
      <div class="absolute-top">
        <q-bar id="qBarTitle">
          <q-icon name="edit" />
          <div><b>编辑</b></div>
          <q-space />
          <!-- <q-btn dense flat icon="close" @click="shRightDrawer" /> -->
        </q-bar>
      </div>
      <q-scroll-area style="height: calc(100% - 32px); margin-top: 32px">
        <EditPanel id="edit" ref="editPanel" :flow="flow" />
      </q-scroll-area>
      <!-- <div class="q-mini-drawer-hide absolute" style="top: 50%; left: -16px">
        <q-btn
          dense
          round
          text-color="grey-7"
          unelevated
          icon="chevron_right"
          @click="shRightDrawer"
          style="z-index: 1"
          class="float-button back-blur"
        />
      </div> -->
    </q-drawer>
    <!-- <div class="q-mini-drawer-hide absolute" style="top: 50%; right: 0px">
      <q-btn
        dense
        round
        text-color="grey-7"
        unelevated
        icon="chevron_left"
        @click="shRightDrawer"
        style="z-index: 1; margin-top: 25px"
        class="float-button back-blur"
      />
    </div> -->
  </div>
</template>

<script>
import { getCurrentInstance, computed, ref, defineComponent } from 'vue';
import MiniMap from './MiniMap.vue';
import EditPanel from './EditPanel.vue';
import { useEditorStore } from 'src/stores/editor';

export default defineComponent({
  components: {
    MiniMap,
    EditPanel,
  },
  props: {
    showRightDrawer: {
      type: Boolean,
    },
    flow: {
      type: Object,
    },
  },
  setup(props) {
    const _this = getCurrentInstance();
    const editorStore = useEditorStore();

    const editPanel = ref();

    const shRightDrawer = () => {
      _this.parent.parent.proxy.shRightDrawer();
    };

    const nodeClickResponse = node => {
      editPanel.value.nodeClickResponse(node);
    };

    const nodeMouseMoveResponse = node => {
      editPanel.value.nodeMouseMoveResponse(node);
    };

    const edgeClickResponse = edge => {
      editPanel.value.edgeClickResponse(edge);
    };

    const blankClickResponse = () => {
      editPanel.value.blankClickResponse();
    };

    return {
      shRightDrawer,
      editPanel,
      nodeClickResponse,
      nodeMouseMoveResponse,
      edgeClickResponse,
      blankClickResponse,
      editorStore,
    };
  },
});
</script>

<style scoped>
@import url('../X6Editor.css');
</style>
