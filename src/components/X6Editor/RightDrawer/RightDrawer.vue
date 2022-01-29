<template>
  <div>
    <q-drawer
      id="rightDrawer"
      v-model="showRightDrawerCom"
      show-if-above
      :width="300"
      :breakpoint="500"
      bordered
      side="right"
    >
      <q-bar id="qBarTitle">
        <q-icon name="edit" />
        <div><b>编辑</b></div>
        <q-space />
        <q-btn dense flat icon="close" @click="shRightDrawer" />
      </q-bar>
      <EditPanel id="edit" ref="editPanel" :flow="flow" />
      <div class="q-mini-drawer-hide absolute" style="top: 50%; left: -16px">
        <q-btn
          dense
          round
          text-color="grey-7"
          unelevated
          icon="chevron_right"
          @click="shRightDrawer"
          style="z-index: 1"
          class="float-button blur"
        />
      </div>
      <!-- <EditPanel id="edit" ref="editPanel" style="height: calc(100% - 270px)" /> -->
      <!-- <MiniMap id="minimap" /> -->
    </q-drawer>
    <div class="q-mini-drawer-hide absolute" style="top: 50%; right: 0px">
      <q-btn
        dense
        round
        text-color="grey-7"
        unelevated
        icon="chevron_left"
        @click="shRightDrawer"
        style="z-index: 1; margin-top: 25px"
        class="float-button blur"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { getCurrentInstance, computed, ref } from 'vue';
import MiniMap from './MiniMap.vue';
import EditPanel from './EditPanel.vue';

export default {
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

    const editPanel = ref();

    const showRightDrawerCom = computed(() => {
      return props.showRightDrawer;
    });

    const shRightDrawer = () => {
      _this.parent.proxy.shRightDrawer();
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
      showRightDrawerCom,
      editPanel,
      nodeClickResponse,
      nodeMouseMoveResponse,
      edgeClickResponse,
      blankClickResponse,
    };
  },
};
/* eslint-disable */
</script>
