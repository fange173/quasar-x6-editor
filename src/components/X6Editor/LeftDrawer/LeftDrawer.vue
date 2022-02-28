<template>
  <div>
    <q-drawer
      id="leftDrawer"
      v-model="showLeftDrawerCom"
      show-if-above
      :width="300"
      :breakpoint="500"
      bordered
      side="left"
    >
      <!-- <div id="titleBar">组件库</div> -->
      <q-bar id="qBarTitle">
        <q-icon name="inventory" />
        <div><b>组件库</b></div>
        <q-space />
        <q-btn dense flat icon="close" @click="shLeftDrawer" />
      </q-bar>
      <div class="q-pa-md">
        <q-input outlined dense ref="filterRef" v-model="filter">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
          <template v-slot:append>
            <q-icon v-if="filter !== ''" name="clear" class="cursor-pointer" @click="resetFilter" />
          </template>
        </q-input>
        <q-tree
          :nodes="nodeList"
          node-key="id"
          :filter="filter"
          :filter-method="filterMethod"
          no-nodes-label="没有节点数据！"
          no-results-label="没有找到相关节点！"
          default-expand-all
          class="q-pt-sm"
        >
          <template v-slot:default-header="prop">
            <div class="row items-center node-label" v-if="prop.node.icon">
              <q-icon :name="prop.node.icon" class="q-mr-sm" />
              <div>{{ prop.node.data.name }}</div>
            </div>
            <div
              class="node"
              v-else
              @mousedown="startDrag($event, prop)"
              @touchstart.stop="startDrag($event, prop)"
            >
              <div class="left-side">
                <span class="material-icons status-icons" style="color: #808080;">
                  task
                </span>
              </div>
              <div class="center">
                {{ prop.node.data.name }}
              </div>
              <div class="right-side">
                <span class="material-icons status-icons">
                  tune
                </span>
              </div>
              <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">
                <!-- <div class="row">
                  <div class="col-3 text-"><strong>externalId：</strong></div>
                  <div class="col-9">{{ prop.node.id }}</div>
                </div> -->
                <div class="row">
                  <div class="col-3"><strong>name：</strong></div>
                  <div class="col-9">{{ prop.node.data.name }}</div>
                </div>
                <div class="row">
                  <div class="col-3"><strong>appUseCase：</strong></div>
                  <div class="col-9">{{ prop.node.data.appUseCase }}</div>
                </div>
                <div class="row">
                  <div class="col-3"><strong>cpuCores：</strong></div>
                  <div class="col-9">{{ prop.node.data.cpuCores }}</div>
                </div>
                <!-- <div class="row">
                  <div class="col-3"><strong>status：</strong></div>
                  <div class="col-9">{{ prop.node.data.status }}</div>
                </div> -->
              </q-tooltip>
            </div>
          </template>
        </q-tree>
      </div>
      <div class="q-mini-drawer-hide absolute" style="top: 50%; right: -16px">
        <q-btn
          dense
          round
          text-color="grey-7"
          unelevated
          icon="chevron_left"
          @click="shLeftDrawer"
          style="z-index: 1"
          class="float-button back-blur"
        />
      </div>
    </q-drawer>
    <div class="q-mini-drawer-hide absolute" style="top: 50%; left: 0px">
      <q-btn
        dense
        round
        text-color="grey-7"
        unelevated
        icon="chevron_right"
        @click="shLeftDrawer"
        style="z-index: 1; margin-top: 25px"
        class="float-button back-blur"
      />
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, computed, ref } from 'vue';

export default {
  props: {
    showLeftDrawer: {
      type: Boolean,
    },
  },
  setup(props) {
    const _this = getCurrentInstance();

    // 连接桩
    const ports = {
      groups: {
        top: {
          position: 'top',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#c2c8d5',
              strokeWidth: 1.5,
              fill: '#fff',
            },
          },
        },
        bottom: {
          position: 'bottom',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#c2c8d5',
              strokeWidth: 1.5,
              fill: '#fff',
            },
          },
        },
      },
      items: [
        {
          group: 'top',
        },
        {
          group: 'bottom',
        },
      ],
    };
    const nodeList = ref([
      {
        id: 'Simulation',
        data: { name: 'Simulation脚本' },
        icon: 'flag',
        children: [
          {
            id: 'Simulation1', // String，节点的唯一标识
            shape: 'default-node',
            data: {
              name: 'Simulation1脚本',
              cpuCores: '4',
              appUseCase: 'ab08ad37-055b-b368-58aa-037620228cf8',
              status: 'default',
              htc: false,
            },
            ports: { ...ports },
          },
          {
            id: 'Simulation2',
            shape: 'default-node',
            data: {
              name: 'Simulation2脚本',
              cpuCores: '4',
              appUseCase: 'f30223f0-a215-4402-38ba-067a917b095d',
              status: 'default',
              htc: false,
            },
            ports: { ...ports },
          },
          {
            id: 'Simulation3',
            shape: 'default-node',
            data: {
              name: 'Simulation3脚本',
              cpuCores: '4',
              appUseCase: 'c0121580-1097-418f-14be-170e474fb8d3',
              status: 'default',
              htc: false,
            },
            ports: { ...ports },
          },
          {
            id: 'Simulation4',
            shape: 'default-node',
            data: {
              name: 'Simulation4脚本',
              cpuCores: '4',
              appUseCase: 'f4f1357b-1bfc-6797-5030-b9822d910e73',
              status: 'default',
              htc: false,
            },
            ports: { ...ports },
          },
        ],
      },
      {
        id: 'Tool',
        data: { name: 'Tool工具' },
        icon: 'construction',
        children: [
          {
            id: 'Tool1',
            shape: 'default-node',
            data: {
              name: 'Tool1工具',
              cpuCores: '4',
              appUseCase: '79737114-e574-8956-bd45-8cf3b9fc8c88',
              status: 'default',
              htc: false,
            },
            ports: { ...ports },
          },
          {
            id: 'Tool2',
            shape: 'default-node',
            data: {
              name: 'Tool2工具',
              cpuCores: '4',
              appUseCase: '75ca097e-b868-4250-885b-138a824f4982',
              status: 'default',
              htc: false,
            },
            ports: { ...ports },
          },
          {
            id: 'Tool3',
            shape: 'default-node',
            data: {
              name: 'Tool3工具',
              cpuCores: '4',
              appUseCase: 'cec670a0-f6af-916f-7a52-ec9cbd102a9a',
              status: 'default',
              htc: false,
            },
            ports: { ...ports },
          },
        ],
      },
    ]);

    const filter = ref('');
    const filterRef = ref(null);

    const startDrag = (e, prop) => {
      _this.parent.proxy.startDrag(e, prop);
    };

    const showLeftDrawerCom = computed(() => {
      return props.showLeftDrawer;
    });

    const shLeftDrawer = () => {
      _this.parent.proxy.shLeftDrawer();
    };

    const filterMethod = (node, filter) => {
      return node.data.name.indexOf(filter) !== -1;
    };

    return {
      shLeftDrawer,
      showLeftDrawerCom,
      nodeList,
      filter,
      filterRef,
      resetFilter() {
        filter.value = '';
        filterRef.value.focus();
      },
      startDrag,
      filterMethod,
    };
  },
};
</script>

<style scoped>
@import url('../X6Editor.css');
</style>
