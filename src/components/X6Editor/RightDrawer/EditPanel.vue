<template>
  <div>
    <!-- <div id="titleBar">编辑</div> -->
    <div class="q-gutter-md q-pl-md q-pr-md q-pt-md" v-if="clickType === 'node'">
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
        <template v-slot:prepend>
          <q-icon
            name="task"
            v-show="clickNode.status === 'default'"
            class="text-default"
            style="font-size: 20px"
          ></q-icon>
          <q-icon
            name="check_circle_outline"
            v-show="clickNode.status === 'success'"
            class="text-positive"
            style="font-size: 20px"
          ></q-icon>
          <q-icon
            name="cancel"
            v-show="clickNode.status === 'error'"
            class="text-red"
            style="font-size: 20px"
          ></q-icon>
          <q-icon
            name="error_outline"
            v-show="clickNode.status === 'warning'"
            class="text-warning"
            style="font-size: 20px"
          ></q-icon>
          <q-icon
            name="directions_run"
            v-show="clickNode.status === 'running'"
            class="text-primary"
            style="font-size: 20px"
          ></q-icon>
        </template>
        <template v-slot:selected>
          <div class="select-text">{{ clickNode.status }}</div>
        </template>
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
            <q-item-section>
              <span class="row" v-if="scope.opt === 'default'" style="margin-left: -4px">
                <q-icon name="task" class="q-mr-sm text-default" style="font-size: 20px" />
                default - 默认
                <!-- <q-item-label v-html="scope.opt" /> -->
              </span>
              <span class="row" v-else-if="scope.opt === 'success'" style="margin-left: -4px">
                <q-icon
                  name="check_circle_outline"
                  class="q-mr-sm text-positive"
                  style="font-size: 20px"
                />
                success - 成功
              </span>
              <span class="row" v-else-if="scope.opt === 'error'" style="margin-left: -4px">
                <q-icon name="cancel" class="q-mr-sm text-red" style="font-size: 20px" />
                error - 错误
              </span>
              <span class="row" v-else-if="scope.opt === 'warning'" style="margin-left: -4px">
                <q-icon name="error_outline" class="q-mr-sm text-warning" style="font-size: 20px" />
                warning - 警告
              </span>
              <span class="row" v-else-if="scope.opt === 'running'" style="margin-left: -4px">
                <q-icon
                  name="directions_run"
                  class="q-mr-sm text-primary"
                  style="font-size: 20px"
                />
                running - 运行
              </span>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      <div class="inputTitle q-mt-sm">htc</div>
      <q-btn-toggle
        v-model="clickNode.htc"
        class="q-mt-xs"
        style="border: 1px solid #c2c2c2"
        dense
        push
        spread
        no-caps
        outlined
        unelevated
        :ripple="false"
        toggle-color="grey"
        color="white"
        text-color="black"
        :options="[
          { label: 'true', value: true },
          { label: 'false', value: false },
        ]"
      />
      <div>
        <q-btn label="保存" color="primary" class="q-mb-md" @click="saveNode()" />
      </div>
    </div>

    <div class="q-gutter-md q-pl-md q-pr-md q-pt-md" v-else-if="clickType === 'edge'">
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
        <q-item
          v-for="fileDependencie in clickEdge.store.data.fileDependencies"
          :key="fileDependencie"
        >
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
      <!-- <div>
        <q-btn label="保存" color="primary" class="q-mb-md" />
      </div> -->
    </div>

    <div class="q-gutter-md q-pl-md q-pr-md q-pt-md" v-else>
      <div class="inputTitle q-mt-sm">id</div>
      <q-input dense outlined v-model="thisFlow.id" class="q-mt-xs" readonly />
      <div class="inputTitle q-mt-sm">name</div>
      <q-input dense outlined v-model="thisFlow.name" class="q-mt-xs" />
      <div class="inputTitle q-mt-sm">materialName</div>
      <q-input dense outlined v-model="thisFlow.materialName" class="q-mt-xs" />
      <div>
        <q-btn label="保存" color="primary" class="q-mb-md" @click="saveFlow()" />
      </div>

      <!-- <div class="inputTitle row">
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
        </div> -->
    </div>
  </div>
</template>

<script>
import { ref, nextTick, defineComponent } from 'vue';
import { Notify } from 'quasar';

export default defineComponent({
  props: {
    flow: {
      type: Object,
    },
  },
  setup(props) {
    const clickNode = ref();
    const clickNodeSelf = ref();
    const clickEdge = ref();
    const clickType = ref('');
    const thisFlow = ref({ name: '', id: '', materialName: '' });

    nextTick(() => {
      thisFlow.value.name = props.flow.name;
      thisFlow.value.id = props.flow.id;
      thisFlow.value.materialName = props.flow.materialName;
    });

    // 保存节点
    function saveNode() {
      const data = {
        name: clickNode.value.name,
        cpuCores: clickNode.value.cpuCores,
        appUseCase: clickNode.value.appUseCase,
        status: clickNode.value.status,
        htc: clickNode.value.htc,
      };
      clickNodeSelf.value.setData(data);
      clickNodeSelf.value.store.data.position.x = clickNode.value.x;
      clickNodeSelf.value.store.data.position.y = clickNode.value.y;
      Notify.create({
        type: 'positive',
        message: '保存节点成功！',
      });
    }
    // 保存工作流信息
    function saveFlow() {
      props.flow.name = thisFlow.value.name;
      props.flow.id = thisFlow.value.id;
      props.flow.materialName = thisFlow.value.materialName;
      Notify.create({
        type: 'positive',
        message: '保存成功！',
      });
    }

    // 左键点击事件响应方法
    const nodeClickResponse = node => {
      clickType.value = 'node';
      clickNodeSelf.value = node;
      const data = clickNodeSelf.value.getData();
      const thisNode = {
        id: clickNodeSelf.value.id,
        cpuCores: data.cpuCores,
        appUseCase: data.appUseCase,
        name: data.name,
        status: data.status,
        htc: data.htc,
        x: clickNodeSelf.value.store.data.position.x,
        y: clickNodeSelf.value.store.data.position.y,
      };
      clickNode.value = thisNode;

      // clickNode.value = data.nodes.find((ele)=>{
      //   return ele.id == node.id;
      // });
    };
    const nodeMouseMoveResponse = node => {
      clickNodeSelf.value = node;
      if (clickNode.value) {
        clickNode.value.x = clickNodeSelf.value.store.data.position.x;
        clickNode.value.y = clickNodeSelf.value.store.data.position.y;
      }
    };
    const edgeClickResponse = edge => {
      clickType.value = 'edge';
      clickEdge.value = edge;
    };
    const blankClickResponse = () => {
      clickType.value = 'blank';
      thisFlow.value.name = props.flow.name;
      thisFlow.value.id = props.flow.id;
      thisFlow.value.materialName = props.flow.materialName;
    };

    return {
      clickType,
      clickNode,
      clickEdge,
      saveNode,
      nodeClickResponse,
      nodeMouseMoveResponse,
      edgeClickResponse,
      blankClickResponse,
      thisFlow,
      saveFlow,
    };
  },
});
</script>

<style scoped>
@import url('../X6Editor.css');
</style>
