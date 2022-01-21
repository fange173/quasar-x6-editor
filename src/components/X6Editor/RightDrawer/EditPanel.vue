<template>
  <div>
    <div id="titleBar">编辑</div>
    <q-scroll-area style="height: 100%">
      <div class="q-gutter-md q-pl-md q-pr-md q-pt-md" v-if="clickType == 'node'">
        <div class="inputTitle row">
          <div class="col-6">x</div>
          <div class="col-6 q-pl-sm">y</div>
        </div>
        <div class="row q-mt-xs">
          <div class="col-6 q-pr-xs">
            <q-input dense outlined v-model="clickNode.x" readonly />
          </div>
          <div class="col-6 q-pl-xs">
            <q-input dense outlined v-model="clickNode.y" readonly />
          </div>
        </div>
        <div class="inputTitle q-mt-sm">externalId</div>
        <q-input dense outlined v-model="clickNode.id" class="q-mt-xs" readonly />
        <div class="inputTitle q-mt-sm">cpuCores</div>
        <q-input dense outlined v-model="clickNode.cpuCores" class="q-mt-xs" />
        <div class="inputTitle q-mt-sm">appUseCase</div>
        <q-input dense outlined v-model="clickNode.appUseCase" class="q-mt-xs" />
        <div class="inputTitle q-mt-sm">name</div>
        <q-input dense outlined v-model="clickNode.name" class="q-mt-xs" />
        <div class="inputTitle q-mt-sm">status</div>
        <q-select
          dense
          outlined
          v-model="clickNode.status"
          :options="['default', 'success', 'error', 'warning', 'running']"
          class="q-mt-xs"
        >
          <template v-slot:selected>
            <div class="select-text">{{ clickNode.status }}</div>
          </template>
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
              <q-item-section>
                <q-item-label v-html="scope.opt" />
              </q-item-section>
              <q-item-section avatar>
                <q-icon name="task" v-show="scope.opt === 'default'" style="color: #666; font-size: 20px"></q-icon>
                <q-icon
                  name="check_circle_outline"
                  v-show="scope.opt === 'success'"
                  style="color: green; font-size: 20px"
                ></q-icon>
                <q-icon name="cancel" v-show="scope.opt === 'error'" style="color: red; font-size: 20px"></q-icon>
                <q-icon
                  name="error_outline"
                  v-show="scope.opt === 'warning'"
                  style="color: orange; font-size: 20px"
                ></q-icon>
                <q-icon
                  name="directions_run"
                  v-show="scope.opt === 'running'"
                  style="color: blue; font-size: 20px"
                ></q-icon>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <div>
          <q-btn label="保存" color="primary" class="q-mb-md" @click="saveNode()" />
        </div>
      </div>

      <div class="q-gutter-md q-pl-md q-pr-md q-pt-md" v-if="clickType == 'edge'">
        <!-- <div class="inputTitle">edgeId</div>
      <q-input dense outlined v-model="clickEdge.id" class="q-mt-xs" readonly /> -->
        <div class="inputTitle q-mt-sm">source</div>
        <q-input dense outlined v-model="clickEdge.source.cell" class="q-mt-xs" readonly />
        <div class="inputTitle q-mt-sm">target</div>
        <q-input dense outlined v-model="clickEdge.target.cell" class="q-mt-xs" readonly />
        <div class="inputTitle q-mt-sm">fileDependencies</div>
        <q-list outlined separator class="rounded-borders q-mt-xs" style="border: 1px solid #e0e0e0">
          <!-- <q-item-label caption class="q-pl-md q-pt-md q-pb-md">fileDependencies</q-item-label> -->
          <!-- <q-separator /> -->
          <q-item v-for="fileDependencie in clickEdge.store.data.fileDependencies" :key="fileDependencie">
            <q-item-section>
              <q-item-label caption>targetAppFile</q-item-label>
              <q-item-label class="q-pb-xs">{{ fileDependencie.targetAppFile }}</q-item-label>
              <q-item-label caption>dependencyAppFile</q-item-label>
              <q-item-label class="q-pb-xs">{{ fileDependencie.dependencyAppFile }}</q-item-label>
              <q-item-label caption>dependencyType</q-item-label>
              <q-item-label>{{ fileDependencie.dependencyType }}</q-item-label>
            </q-item-section>
            <q-item-section top side>
              <q-btn size="12px" flat round icon="delete" />
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label caption>+ 添加文件</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <div>
          <q-btn label="保存" color="primary" class="q-mb-md" />
        </div>
      </div>

      <div class="q-gutter-md q-pl-md q-pr-md q-pt-md" v-if="clickType != 'node' && clickType != 'edge'">
        <div class="inputTitle row">
          <div class="col-6">x</div>
          <div class="col-6 q-pl-sm">y</div>
        </div>
        <div class="row q-mt-xs">
          <div class="col-6 q-pr-xs">
            <q-input dense outlined disable />
          </div>
          <div class="col-6 q-pl-xs">
            <q-input dense outlined disable />
          </div>
        </div>
        <div class="inputTitle q-mt-sm">externalId</div>
        <q-input dense outlined disable class="q-mt-xs" />
        <div class="inputTitle q-mt-sm">cpuCores</div>
        <q-input dense outlined disable class="q-mt-xs" />
        <div class="inputTitle q-mt-sm">appUseCase</div>
        <q-input dense outlined disable class="q-mt-xs" />
        <div class="inputTitle q-mt-sm">name</div>
        <q-input dense outlined disable class="q-mt-xs" />
        <div class="inputTitle q-mt-sm">status</div>
        <q-select dense outlined disable class="q-mt-xs" />
        <div>
          <q-btn label="保存" color="primary" class="q-mb-md" disabled />
        </div>
      </div>
    </q-scroll-area>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { ref } from 'vue';

export default {
  setup() {
    const clickNode: any = ref();
    const clickNodeSelf: any = ref();
    const clickEdge: any = ref();
    const clickType = ref('');

    // 保存节点
    function saveNode() {
      const data = {
        name: clickNode.value.name,
        cpuCores: clickNode.value.cpuCores,
        appUseCase: clickNode.value.appUseCase,
        status: clickNode.value.status,
      }
      clickNodeSelf.value.setData(data);
      clickNodeSelf.value.store.data.position.x = clickNode.value.x;
      clickNodeSelf.value.store.data.position.y = clickNode.value.y;
    }

    // 左键点击事件响应方法
    const nodeClickResponse = (node: any) => {
      clickType.value = 'node';
      clickNodeSelf.value = node;
      const data = clickNodeSelf.value.getData();
      const thisNode = {
        id: clickNodeSelf.value.id,
        cpuCores: data.cpuCores,
        appUseCase: data.appUseCase,
        name: data.name,
        status: data.status,
        x: clickNodeSelf.value.store.data.position.x,
        y: clickNodeSelf.value.store.data.position.y,
      };
      clickNode.value = thisNode;

      // console.log('node', node);
      // clickNode.value = data.nodes.find((ele)=>{
      //   return ele.id == node.id;
      // });
    };
    const nodeMouseMoveResponse = (node: any) => {
      clickNodeSelf.value = node;
      if (clickNode.value) {
        clickNode.value.x = clickNodeSelf.value.store.data.position.x;
        clickNode.value.y = clickNodeSelf.value.store.data.position.y;
      }
    };
    const edgeClickResponse = (edge: any) => {
      clickType.value = 'edge';
      clickEdge.value = edge;
      // console.log('edge', edge);
    };

    return {
      clickType,
      clickNode,
      clickEdge,
      saveNode,
      nodeClickResponse,
      nodeMouseMoveResponse,
      edgeClickResponse,
    };
  },
};
/* eslint-disable */
</script>
