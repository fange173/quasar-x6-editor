<template>
  <div>
    <q-drawer
      overlay
      id="leftDrawer"
      v-model="editorStore.showLeftDrawer"
      :width="300"
      bordered
      side="left"
    >
      <div class="absolute-top">
        <q-bar id="qBarTitle">
          <q-icon name="inventory" />
          <div><b>组件库</b></div>
          <q-space />
          <!-- <q-btn dense flat icon="close" @click="shLeftDrawer" /> -->
        </q-bar>
        <q-input outlined dense ref="filterRef" v-model="filter" class="q-pt-xs q-px-md">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
          <template v-slot:append>
            <q-icon v-if="filter !== ''" name="clear" class="cursor-pointer" @click="resetFilter" />
          </template>
        </q-input>
      </div>
      <q-scroll-area
        class="q-px-sm"
        style="height: calc(100% - 112px); margin-top: 76px; margin-bottom: 36px"
      >
        <q-tree
          :nodes="nodeList"
          node-key="id"
          :filter="filter"
          :filter-method="filterMethod"
          no-nodes-label="没有节点数据！"
          no-results-label="没有找到相关节点！"
          default-expand-all
          class="q-pt-sm q-pb-md"
        >
          <template v-slot:default-header="prop">
            <div
              class="row items-center node-label"
              style="margin-bottom: -7px"
              v-if="prop.node.icon"
            >
              <q-icon :name="prop.node.icon" class="q-mr-sm" />
              <div>{{ prop.node.data.name }}</div>
            </div>
            <div
              class="node"
              style="margin-top: 0; margin-bottom: 0"
              v-else-if="prop.node.children !== undefined"
              @mousedown="startDrag($event, prop)"
              @touchstart.stop="startDrag($event, prop)"
            >
              <div class="left-side">
                <span class="material-icons status-icons" style="color: #808080"> task </span>
              </div>
              <div class="center">
                {{ prop.node.data.name }}
              </div>
              <div class="right-side">
                <span class="material-icons status-icons"> tune </span>
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
            <div
              class="node"
              v-else
              @mousedown="startDrag($event, prop)"
              @touchstart.stop="startDrag($event, prop)"
            >
              <div class="left-side">
                <span class="material-icons status-icons" style="color: #808080"> task </span>
              </div>
              <div class="center">
                {{ prop.node.data.name }}
              </div>
              <div class="right-side">
                <span class="material-icons status-icons"> tune </span>
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
      </q-scroll-area>
      <div class="absolute-bottom">
        <q-btn
          align="left"
          icon="add"
          label="添加更多组件..."
          class="text-primary full-width"
          style="background: #eeeeee"
          @click="onClick"
        />
      </div>
      <!-- <div class="q-mini-drawer-hide absolute" style="top: 50%; right: -16px">
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
      </div> -->
    </q-drawer>
    <!-- <div class="q-mini-drawer-hide absolute" style="top: 50%; left: 0px">
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
    </div> -->
  </div>
</template>

<script>
import { getCurrentInstance, computed, ref } from 'vue';
import { useEditorStore } from 'src/stores/editor';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const _this = getCurrentInstance();
    const editorStore = useEditorStore();

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
        id: 'simulation-title',
        data: { name: 'Simulation脚本' },
        icon: 'flag',
        children: [
          {
            id: 'simulation', // String，节点的唯一标识
            shape: 'default-node',
            data: {
              name: 'Simulation脚本',
              cpuCores: '4',
              appUseCase: 'ab08ad37-055b-b368-58aa-037620228cf8',
              status: 'default',
              htc: false,
            },
            ports: { ...ports },
            children: [
              {
                id: 'simulation1', // String，节点的唯一标识
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
                id: 'simulation2',
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
                id: 'simulation3',
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
                id: 'simulation4',
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
        ],
      },
      {
        id: 'tool-title',
        data: { name: 'Tool工具' },
        icon: 'construction',
        children: [
          {
            id: 'tool',
            shape: 'default-node',
            data: {
              name: 'Tool工具',
              cpuCores: '4',
              appUseCase: '79737114-e574-8956-bd45-8cf3b9fc8c88',
              status: 'default',
              htc: false,
            },
            ports: { ...ports },
            children: [
              {
                id: 'tool1',
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
                id: 'tool2',
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
                id: 'tool3',
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
        ],
      },
      {
        id: 'compute-title',
        data: { name: 'Compute计算' },
        icon: 'developer_board',
        children: [
          {
            id: 'compute',
            shape: 'default-node',
            data: {
              name: 'Compute计算',
              cpuCores: '4',
              appUseCase: 'b21871de-75dd-4a39-9c4c-cd2df62eb20b',
              status: 'default',
              htc: false,
            },
            ports: { ...ports },
            children: [
              {
                id: 'compute1',
                shape: 'default-node',
                data: {
                  name: 'Compute1计算',
                  cpuCores: '4',
                  appUseCase: 'b21871de-75dd-4a39-9c4c-cd2df62eb20b',
                  status: 'default',
                  htc: false,
                },
                ports: { ...ports },
              },
              {
                id: 'compute2',
                shape: 'default-node',
                data: {
                  name: 'Compute2计算',
                  cpuCores: '4',
                  appUseCase: '40178a7c-b7b8-417a-9cd4-b0277da22374',
                  status: 'default',
                  htc: false,
                },
                ports: { ...ports },
              },
              {
                id: 'compute3',
                shape: 'default-node',
                data: {
                  name: 'Compute3计算',
                  cpuCores: '4',
                  appUseCase: 'c1dd1643-c630-4073-8b53-68ba8391f9de',
                  status: 'default',
                  htc: false,
                },
                ports: { ...ports },
              },
              {
                id: 'compute4',
                shape: 'default-node',
                data: {
                  name: 'Compute4计算',
                  cpuCores: '4',
                  appUseCase: '45901e22-3ea9-4499-a481-bf5d33964d8a',
                  status: 'default',
                  htc: false,
                },
                ports: { ...ports },
              },
              {
                id: 'compute5',
                shape: 'default-node',
                data: {
                  name: 'Compute5计算',
                  cpuCores: '4',
                  appUseCase: 'b7e4ec9b-e094-4c2b-8e34-79c8b09b2e14',
                  status: 'default',
                  htc: false,
                },
                ports: { ...ports },
              },
            ],
          },
        ],
      },
      {
        id: 'test-title',
        data: { name: 'Test测试' },
        icon: 'bug_report',
        children: [
          {
            id: 'test',
            shape: 'default-node',
            data: {
              name: 'Test测试',
              cpuCores: '4',
              appUseCase: '34594c90-fe25-4128-b9c6-66519711e6c8',
              status: 'default',
              htc: false,
            },
            ports: { ...ports },
            children: [
              {
                id: 'test1',
                shape: 'default-node',
                data: {
                  name: 'Test1测试',
                  cpuCores: '4',
                  appUseCase: '34594c90-fe25-4128-b9c6-66519711e6c8',
                  status: 'default',
                  htc: false,
                },
                ports: { ...ports },
              },
              {
                id: 'test2',
                shape: 'default-node',
                data: {
                  name: 'Test2测试',
                  cpuCores: '4',
                  appUseCase: '497153b6-1c4b-473a-a0ec-bea0c5ee42b3',
                  status: 'default',
                  htc: false,
                },
                ports: { ...ports },
              },
              {
                id: 'test3',
                shape: 'default-node',
                data: {
                  name: 'Test3测试',
                  cpuCores: '4',
                  appUseCase: '296c38f6-4af1-4bec-8553-ce9afb12bf1e',
                  status: 'default',
                  htc: false,
                },
                ports: { ...ports },
              },
              {
                id: 'test4',
                shape: 'default-node',
                data: {
                  name: 'Test4测试',
                  cpuCores: '4',
                  appUseCase: 'd65db538-3c41-4eaf-b25d-91bd3a334c30',
                  status: 'default',
                  htc: false,
                },
                ports: { ...ports },
              },
            ],
          },
        ],
      },
    ]);

    const filter = ref('');
    const filterRef = ref(null);

    const startDrag = (e, prop) => {
      _this.parent.parent.proxy.startDrag(e, prop);
    };

    const shLeftDrawer = () => {
      _this.parent.parent.proxy.shLeftDrawer();
    };

    const filterMethod = (node, filter) => {
      return node.data.name.indexOf(filter) !== -1;
    };

    return {
      shLeftDrawer,
      nodeList,
      filter,
      filterRef,
      resetFilter() {
        filter.value = '';
        filterRef.value.focus();
      },
      startDrag,
      filterMethod,
      editorStore,
    };
  },
});
</script>

<style scoped>
@import url('../X6Editor.css');
</style>
