<template>
  <div>
    <q-drawer id="leftDrawer" v-model="showLeftDrawerCom" show-if-above :width="300" side="left">
      <div id="titleBar">组件库</div>
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
              <q-icon :name="prop.node.icon" color="primary" class="q-mr-sm" />
              <div>{{ prop.node.data.name }}</div>
            </div>
            <div class="node" v-else style="cursor: move" @mousedown="startDrag($event, prop)">
              <div class="center">
                {{ prop.node.data.name }}
              </div>
              <div class="right-side">
                <svg
                  t="1642577466654"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="14516"
                  width="16"
                  height="16"
                >
                  <path
                    d="M682.666667 0v256h256l-256-256z m-85.333334 0H170.666667a85.333333 85.333333 0 0 0-85.333334 85.333333v853.333334a85.333333 85.333333 0 0 0 85.333334 85.333333h682.666666a85.333333 85.333333 0 0 0 85.333334-85.333333V341.333333h-341.333334V0z m7.168 514.517333a42.666667 42.666667 0 1 1 70.997334 47.36L481.152 853.333333l-163.498667-109.013333a42.666667 42.666667 0 1 1 47.36-70.997333l92.501334 61.653333 146.986666-220.458667z"
                    p-id="14517"
                    fill="#666666"
                  ></path>
                </svg>
              </div>
              <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">
                <div class="row">
                  <div class="col-3 text-"><strong>externalId：</strong></div>
                  <div class="col-9">{{ prop.node.id }}</div>
                </div>
                <div class="row">
                  <div class="col-3"><strong>cpuCores：</strong></div>
                  <div class="col-9">{{ prop.node.data.cpuCores }}</div>
                </div>
                <div class="row">
                  <div class="col-3"><strong>appUseCase：</strong></div>
                  <div class="col-9">{{ prop.node.data.appUseCase }}</div>
                </div>
                <div class="row">
                  <div class="col-3"><strong>name：</strong></div>
                  <div class="col-9">{{ prop.node.data.name }}</div>
                </div>
                <div class="row">
                  <div class="col-3"><strong>status：</strong></div>
                  <div class="col-9">{{ prop.node.data.status }}</div>
                </div>
              </q-tooltip>
            </div>
          </template>
        </q-tree>
      </div>
      <div class="q-mini-drawer-hide absolute" style="top: 50%; right: -48px">
        <q-btn
          round
          text-color="grey-7"
          elevated
          icon="chevron_left"
          @click="shLeftDrawer"
          style="z-index: 1"
          class="float-button"
        />
      </div>
    </q-drawer>
    <div class="q-mini-drawer-hide absolute" style="top: 50%; left: 8px">
      <q-btn
        round
        text-color="grey-7"
        elevated
        icon="chevron_right"
        @click="shLeftDrawer"
        style="z-index: 1; margin-top: 25px"
        class="float-button"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
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
            },
            ports: { ...ports },
          },
        ],
      },
    ]);

    const filter = ref('');
    const filterRef = ref(null);

    const startDrag = (e, prop) => {
      // console.log(prop);
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
/* eslint-disable */
</script>

<style scoped>
.node-label {
  height: 36px;
  padding-top: -4px;
  padding-bottom: -4px;
  margin-top: -3px;
  margin-bottom: 0;
}
.node {
  display: flex;
  width: 200px;
  height: 36px;
  line-height: 36px;
  border-radius: 4px;
  background: #ffffff;
  border: 1px solid #ccd1dc;
  box-shadow: 0 2px 5px 1px rgb(0 0 0 / 6%);
  color: #5c5c5c;
}
/* .node:hover {
  background: #f5f5f5;
} */
.center {
  width: 164px;
  height: 36px;
  font-size: 14px;
  text-align: center;
  /* 超过两行省略 */
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  /* 截断单词换行 */
  word-break: break-all;
  word-wrap: break-word;
  padding-left: 9px;
}
.right-side {
  display: flex;
  width: 36px;
  height: 36px;
  padding: 9px;
}
.my-tooltip {
  border: 1px solid #ccd1dc;
  box-shadow: 0 2px 5px 1px rgb(0 0 0 / 6%);
  color: #808080;
}
</style>
