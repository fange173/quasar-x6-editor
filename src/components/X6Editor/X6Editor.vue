<template>
  <div>
    <Header :flow="flow" :showGrid="showGrid" :showMinimap="showMinimap" />
    <LeftDrawer :showLeftDrawer="showLeftDrawer" />
    <RightDrawer ref="rightDrawer" :showRightDrawer="showRightDrawer" :flow="flow" />
    <div id="container">
      <ContextMenu :choiceType="choiceType" @showNode="showNode" @nodeSetting="nodeSetting" @addNode="addNode" @deleteNode="deleteNode" @showEdge="showEdge" @deleteEdge="deleteEdge" @undo="undo" @redo="redo" @showData="showData" @downloadData="downloadData" @refresh="refresh" />
    </div>
    <div id="minimap" v-show="showMinimap" />
    <ToolBar :zoom="zoom" :showGrid="showGrid" :showMinimap="showMinimap" />
    <HelpDialog :openHelpDialog="openHelpDialog" />
    <CodeDialog :openCodeDialog="openCodeDialog" :data="jsonData" />
  </div>
</template>

<script>
import { DagreLayout } from '@antv/layout';
import { Addon, Graph } from '@antv/x6';
import { useQuasar, date } from 'quasar';
import { defineComponent, onMounted, ref } from 'vue';
import ToolBar from './ToolBar/ToolBar.vue';
import Header from './Header/Header.vue';
import LeftDrawer from './LeftDrawer/LeftDrawer.vue';
import RightDrawer from './RightDrawer/RightDrawer.vue';
const { Dnd } = Addon;
import '@antv/x6-vue-shape';
import DefaultNode from './Node/DefaultNode.vue';
import HelpDialog from './Dialog/HelpDialog.vue';
import CodeDialog from './Dialog/CodeDialog.vue';
import ContextMenu from './Container/ContextMenu.vue';

export default defineComponent({
  components: {
    Header,
    ToolBar,
    LeftDrawer,
    RightDrawer,
    HelpDialog,
    CodeDialog,
    ContextMenu,
  },
  setup() {
    const $q = useQuasar();
    // 声明画布
    let graph;
    // 声明dnd
    const dnd = ref({});
    // 选择的节点id
    const choiceId = ref('');
    // 选择的是节点还是连线
    const choiceType = ref('');
    // 右侧栏ref
    const rightDrawer = ref();
    // 画布缩放比例
    const zoom = ref(100);
    // 是否显示侧边栏
    const showLeftDrawer = ref(true);
    const showRightDrawer = ref(true);
    // 是否显示Dialog
    const openHelpDialog = ref(false);
    const openCodeDialog = ref(false);
    const jsonData = ref({});
    // 是否显示缩略图
    const showMinimap = ref(false);
    // 是否显示网点
    const showGrid = ref(false);
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
    // 原始json数据
    let json = {
      name: '测试工作流20220128-1',
      externalId: 'w-workflow-20220128',
      materialName: 'w',
      jobs: [
        {
          externalId: 'fe94ef60-b536-22bb-61fd-6b3a2222be17',
          cpuCores: '2',
          appUseCase: 'ab08ad37-055b-b368-58aa-037620228cf8',
          name: 'Simulate1脚本',
          htc: false,
        },
        {
          externalId: '4557647d-19bc-b1d7-5aec-4963dfe83b28',
          cpuCores: '1',
          appUseCase: 'f30223f0-a215-4402-38ba-067a917b095d',
          name: 'Simulate2脚本',
          htc: false,
        },
        {
          externalId: '35344a12-c8d7-1e2c-704f-b10a9b56e2c6',
          cpuCores: '2',
          appUseCase: 'c0121580-1097-418f-14be-170e474fb8d3',
          name: 'Simulate3脚本',
          htc: true,
        },
        {
          externalId: '8c6f878b-ffa0-e51b-93d2-0e65344d7f56',
          cpuCores: '2',
          appUseCase: 'f4f1357b-1bfc-6797-5030-b9822d910e73',
          name: 'Simulate4脚本',
          htc: false,
        },
        {
          externalId: 'ba2f49b7-912e-de79-50a3-8e6d4083f681',
          cpuCores: '1',
          appUseCase: '1d6913e0-32bd-4563-a073-4900579da937',
          name: 'Simulate5脚本',
          htc: false,
        },
        {
          externalId: '7a65b4d8-12bd-bd09-170c-cf37cc0a568a',
          cpuCores: '2',
          appUseCase: '81abf716-a0f8-f064-cabe-6e4e44442825',
          name: 'Simulate6脚本',
          htc: false,
        },
      ],
      dependencies: [
        {
          externalId: 'ba832c2b-7ff3-4b24-be99-53ad0f949161',
          jobExternalId: '4557647d-19bc-b1d7-5aec-4963dfe83b28',
          jobDependencyExternalId: 'fe94ef60-b536-22bb-61fd-6b3a2222be17',
          fileDependencies: [
            {
              targetAppFile: '0a9c2cb6-3dc7-9a00-55f1-33f2e31f5561',
              dependencyAppFile: '2ae998c2-7a33-65a4-a9b1-07a101ec695c',
              dependencyType: 'appFile',
            },
            {
              targetAppFile: 'd499e05c-a1a1-f365-184a-06f64438d81f',
              dependencyAppFile: 'f055da12-e175-3f38-c2df-4a589ddc5db9',
              dependencyType: 'appFile',
            },
          ],
        },
        {
          externalId: '6201ebaf-5c4a-4211-a9ca-7ecb367c9e25',
          jobExternalId: '35344a12-c8d7-1e2c-704f-b10a9b56e2c6',
          jobDependencyExternalId: 'fe94ef60-b536-22bb-61fd-6b3a2222be17',
          fileDependencies: [
            {
              targetAppFile: 'b098bf40-eb8c-30d8-ef16-8f21ab41b248',
              dependencyAppFile: '1191f899-eaad-b87c-8936-5cf96d72d1c4',
              dependencyType: 'appFile',
            },
          ],
        },
        {
          externalId: 'a5b8558d-12c8-4ec8-a69f-cbcc7e1dbea7',
          jobExternalId: '8c6f878b-ffa0-e51b-93d2-0e65344d7f56',
          jobDependencyExternalId: '4557647d-19bc-b1d7-5aec-4963dfe83b28',
          fileDependencies: [
            {
              targetAppFile: '56c90586-a686-5330-0b16-72a231212171',
              dependencyAppFile: '56984e29-f833-adae-9253-882e255d2e3b',
              dependencyType: 'appFile',
            },
          ],
        },
        {
          externalId: '9eda6ea8-d91b-4b1c-9cfb-4a46be11b698',
          jobExternalId: 'ba2f49b7-912e-de79-50a3-8e6d4083f681',
          jobDependencyExternalId: '4557647d-19bc-b1d7-5aec-4963dfe83b28',
        },
        {
          externalId: '080cf216-4e96-4b31-b664-8666e3f98b41',
          jobExternalId: '7a65b4d8-12bd-bd09-170c-cf37cc0a568a',
          jobDependencyExternalId: '35344a12-c8d7-1e2c-704f-b10a9b56e2c6',
        },
      ],
    };
    // 初始化节点数据
    const flow = ref({ name: '', id: '', materialName: '' });
    let data = { nodes: [], edges: [] };

    // 撤销
    const undo = () => {
      graph.undo();
    };
    // 重做
    const redo = () => {
      graph.redo();
    };
    // 放大
    const zoomIn = () => {
      if (zoom.value <= 280) {
        graph.zoom(0.2); // 在原来缩放级别上增加 0.2
        setTimeout(() => {
          zoom.value = Number((graph.zoom() * 100).toFixed(0));
        }, 50);
      }
    };
    // 缩小
    const zoomOut = () => {
      if (zoom.value >= 70) {
        graph.zoom(-0.2); // 在原来缩放级别上减少 0.2
        setTimeout(() => {
          zoom.value = Number((graph.zoom() * 100).toFixed(0));
        }, 50);
      }
    };
    // 缩放到指定比例
    const zoomTo = num => {
      graph.zoomTo(num);
      setTimeout(() => {
        zoom.value = Number((graph.zoom() * 100).toFixed(0));
      }, 50);
    };
    // 缩放到适应内容
    const zoomToFit = () => {
      graph.zoomToFit();
      setTimeout(() => {
        zoom.value = Number((graph.zoom() * 100).toFixed(0));
      }, 50);
    };
    // 居中
    const centerContent = () => {
      graph.centerContent(); // 将画布内容中心与视口中心对齐
    };
    const createUuid = () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    };
    // 添加节点
    const addNode = () => {
      const source = graph.toJSON().cells.find(ele => {
        return ele.id == choiceId.value;
      });
      const targetId = createUuid();
      graph.addNode({
        id: targetId,
        data: {
          name: '未命名节点',
          cpuCores: '',
          appUseCase: '',
          status: 'default',
          htc: false,
        },
        shape: 'default-node',
        ports: { ...ports },
        x: source?.position.x,
        y: source?.position.y + 160,
      });
      graph.addEdge({
        source: source?.id,
        target: targetId,
        shape: 'default-edge',
        zIndex: -1,
      });
      // checkHtc();
      $q.notify({
        message: '添加节点成功！执行自动布局？',
        type: 'positive',
        multiLine: true,
        actions: [
          // { label: '否', color: 'white', handler: () => {} },
          {
            label: '执行',
            color: 'yellow',
            handler: () => {
              layout();
            },
          },
        ],
      });
    };
    // 删除节点
    const deleteNode = () => {
      $q.dialog({
        title: '删除节点',
        message: '确定要删除该节点吗？',
        ok: '确定',
        cancel: '取消',
        // persistent: true,
      }).onOk(() => {
        graph.removeNode(choiceId.value);
        $q.notify({
          message: '删除节点成功！',
          type: 'positive',
        });
      });
    };
    // 删除连线
    const deleteEdge = () => {
      $q.dialog({
        title: '删除连线',
        message: '确定要删除该连线吗？',
        ok: '确定',
        cancel: '取消',
        // persistent: true,
      }).onOk(() => {
        graph.removeEdge(choiceId.value);
        $q.notify({
          message: '删除连线成功！',
          type: 'positive',
        });
      });
    };
    // 清空
    const refresh = () => {
      $q.dialog({
        title: '清空画布',
        message: '确定要清空画布（包括所有节点和连线）吗？',
        ok: '确定',
        cancel: '取消',
        // persistent: true,
      }).onOk(() => {
        graph.clearCells();
        $q.notify({
          message: '清空画布成功！',
          type: 'positive',
        });
      });
    };
    // 节点选项
    const nodeSetting = () => {
      $q.dialog({
        options: {
          title: '配置节点',
          type: 'radio',
          model: 'opt1',
          // inline: true
          items: [
            { label: '使用本地参数文件', value: 'opt1', color: 'secondary' },
            { label: '在线配置参数', value: 'opt2' },
          ],
        },
        // persistent: true,
        ok: '继续',
        cancel: '取消',
      }).onOk(data => {
        $q.notify({
          message: '选择了 ' + data,
          color: 'primary',
        });
      });
    };
    // 查看节点数据
    const showNode = () => {
      transformToJson();
      jsonData.value = JSON.stringify(
        jsonData.value.jobs.find(ele => {
          return ele.externalId == choiceId.value;
        }),
        null,
        2
      );
      openCodeDialog.value = true;
    };
    // 查看连线数据
    const showEdge = () => {
      transformToJson();
      jsonData.value = JSON.stringify(
        jsonData.value.dependencies.find(ele => {
          return ele.externalId == choiceId.value;
        }),
        null,
        2
      );
      openCodeDialog.value = true;
    };
    // x6数据转换成json数据
    const transformToJson = () => {
      const x6Data = graph.toJSON().cells;
      let jobs = [];
      let dependencies = [];
      for (let i = 0, len = x6Data.length; i < len; i++) {
        if (x6Data[i].shape === 'default-edge') {
          dependencies.push({
            externalId: x6Data[i].id,
            jobExternalId: x6Data[i].target.cell,
            jobDependencyExternalId: x6Data[i].source.cell,
            fileDependencies: x6Data[i].fileDependencies,
          });
        } else {
          jobs.push({
            externalId: x6Data[i].id,
            cpuCores: x6Data[i].data.cpuCores,
            appUseCase: x6Data[i].data.appUseCase,
            name: x6Data[i].data.name,
            htc: x6Data[i].data.htc,
          });
        }
      }
      jsonData.value = {
        name: flow.value.name,
        externalId: flow.value.id,
        materialName: flow.value.materialName,
        jobs: jobs,
        dependencies: dependencies,
      };
    };
    // 查看工作流数据
    const showData = () => {
      transformToJson();
      jsonData.value = JSON.stringify(jsonData.value, null, 2);
      openCodeDialog.value = true;
    };
    // 关闭代码dialog
    const closeCode = () => {
      openCodeDialog.value = false;
    };
    // 导出工作流数据
    const downloadData = () => {
      $q.dialog({
        title: '导出数据',
        message: '确定要导出该流程数据（Json格式）吗？',
        ok: '确定',
        cancel: '取消',
        // persistent: true,
      }).onOk(() => {
        transformToJson();
        const datastr =
          'data:text/json;charset=utf-8,' +
          encodeURIComponent(JSON.stringify(jsonData.value, null, '\t'));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute('href', datastr);
        downloadAnchorNode.setAttribute(
          'download',
          'data' + date.formatDate(new Date(), 'YYYYMMDDHHmm') + '.json'
        );
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        $q.notify({
          message: '正在下载中，请稍候...',
          color: 'primary',
        });
      });
    };
    // 查看帮助
    const help = () => {
      openHelpDialog.value = true;
    };
    // 关闭帮助
    const closeHelp = () => {
      openHelpDialog.value = false;
    };
    // 显示网格
    const shGrid = () => {
      if (showGrid.value === true) graph.hideGrid();
      else graph.showGrid();
      showGrid.value = !showGrid.value;
    };
    // 显示缩略图
    const shMinimap = () => {
      showMinimap.value = !showMinimap.value;
    };
    // 自动布局
    const layout = () => {
      transformToJson();
      json = jsonData.value;
      transformToData();
      graph.dispose();
      initGraph();
      initDnd();
      initEvent();
      checkHtc();
      centerContent();
    };
    // 显示侧边栏
    const shLeftDrawer = () => {
      showLeftDrawer.value = !showLeftDrawer.value;
      if (showLeftDrawer.value === true && showRightDrawer.value === true)
        graph.resize(window.innerWidth - 600, window.innerHeight - 52);
      else if (showLeftDrawer.value === true && showRightDrawer.value === false)
        graph.resize(window.innerWidth - 300, window.innerHeight - 52);
      else if (showLeftDrawer.value === false && showRightDrawer.value === true)
        graph.resize(window.innerWidth - 300, window.innerHeight - 52);
      else graph.resize(window.innerWidth, window.innerHeight - 52);
    };
    function shRightDrawer() {
      showRightDrawer.value = !showRightDrawer.value;
      if (showLeftDrawer.value === true && showRightDrawer.value === true)
        graph.resize(window.innerWidth - 600, window.innerHeight - 52);
      else if (showLeftDrawer.value === true && showRightDrawer.value === false)
        graph.resize(window.innerWidth - 300, window.innerHeight - 52);
      else if (showLeftDrawer.value === false && showRightDrawer.value === true)
        graph.resize(window.innerWidth - 300, window.innerHeight - 52);
      else graph.resize(window.innerWidth, window.innerHeight - 52);
    }
    // dnd开始拖动
    const startDrag = (e, prop) => {
      const node = graph.createNode(prop.node);
      dnd.value.start(node, e);
    };
    // json数据转换成x6数据
    const transformToData = () => {
      if (json.name) flow.value.name = json.name;
      if (json.externalId) flow.value.id = json.externalId;
      if (json.materialName) flow.value.materialName = json.materialName;
      if (json.jobs) {
        data.nodes = [];
        const jobs = json.jobs;
        for (let i = 0, len = jobs.length; i < len; i++) {
          data.nodes.push({
            id: jobs[i].externalId,
            data: {
              name: jobs[i].name,
              cpuCores: jobs[i].cpuCores,
              appUseCase: jobs[i].appUseCase,
              status: 'default',
              htc: jobs[i].htc,
            },
            shape: 'default-node',
            ports: { ...ports },
          });
        }
      }
      if (json.dependencies) {
        data.edges = [];
        const dependencies = json.dependencies;
        for (let i = 0, len = dependencies.length; i < len; i++) {
          data.edges.push({
            id: dependencies[i].externalId,
            source: dependencies[i].jobDependencyExternalId,
            target: dependencies[i].jobExternalId,
            fileDependencies: dependencies[i].fileDependencies,
            shape: 'default-edge',
            zIndex: -1,
          });
        }
      }
    };
    // 导入文件
    const importJson = (result) => {
      json = result;
      transformToData();
      graph.dispose();
      initGraph();
      initDnd();
      initEvent();
      checkHtc();
      centerContent();
      $q.notify({
        message: '导入文件成功！',
        type: 'positive',
      });
    };
    // 初始化自定义节点、连线形状
    const initShape = () => {
      Graph.registerNode(
        'default-node',
        {
          inherit: 'vue-shape',
          width: 200,
          height: 36,
          component: DefaultNode,
        },
        true
      );
      Graph.registerEdge(
        'default-edge',
        {
          inherit: 'edge',
          attrs: {
            line: {
              stroke: '#c2c8d5',
              strokeWidth: 1.5,
              targetMarker: {
                name: 'path',
                offsetX: -5,
                d: 'M10.3,11.9L10.3,6.29L10.3,5.6L10.3,0L0,5.95L10.3,11.9Z',
              },
            },
          },
        },
        true
      );
    };
    // 初始化工作流
    function initGraph() {
      // 自动布局：使用dagre布局算法，判断data层次
      const dagreLayout = new DagreLayout({
        type: 'dagre',
        ranksep: 40,
        nodesep: 60,
        controlPoints: false,
      });
      dagreLayout.layout(data);

      // 连接桩高亮
      const magnetAvailabilityHighlighter = {
        name: 'stroke',
      };
      // 渲染画布
      graph = new Graph({
        container: document.getElementById('container'), // 画布容器
        autoResize: true,
        minimap: {
          // 缩略图
          enabled: true,
          container: document.getElementById('minimap'),
          width: 266,
          height: 198,
        },
        // width: window.innerWidth,
        height: window.innerHeight - 52,
        background: {
          color: '#f7f7fa', // 设置画布背景颜色
        },
        grid: {
          size: 10, // 网格大小 10px
          visible: showGrid.value, // 渲染网格背景
          type: 'dot',
          args: {
            color: '#a0a0a0', // 网格线/点颜色
            thickness: 1, // 网格线宽度/网点大小
          },
        },
        snapline: true, // 开启对齐线
        panning: true, // 开启拖拽平移
        keyboard: false, // 快捷键
        mousewheel: {
          // 支持鼠标滚轮缩放
          enabled: true,
          zoomAtMousePosition: true,
          modifiers: 'ctrl', // Ctrl+滚轮缩放
          minScale: 0.5,
          maxScale: 3,
        },
        history: {
          enabled: true, // 开启历史记录
          ignoreChange: true, // ignoreChange 是否忽略属性变化
        },
        selecting: {
          enabled: true, // 支持选择节点
          multiple: false, // 是否多选
          rubberEdge: true, // 可以选中连线
          showNodeSelectionBox: true, // 显示节点选择框
          showEdgeSelectionBox: true, // 显示连线选择框
        },
        connecting: {
          // 连线
          allowPort: true, // 是否允许边链接到链接桩
          allowEdge: false, // 是否允许边链接到另一个边
          allowNode: false, // 是否允许边链接到节点（非节点上的链接桩)
          allowLoop: false, // 是否允许创建循环连线，即边的起始节点和终止节点为同一节点
          allowMulti: false, // 是否允许在相同的起始节点和终止之间创建多条边
          allowBlank: false, // 是否允许连接到画布空白位置的点
          highlight: true, // 拖动边时，是否高亮显示所有可用的连接桩或节点
          snap: true, // 自动吸附
          router: {
            // 布局方式
            name: 'er',
            args: {
              offset: 'center',
              direction: 'V',
            },
          },
          connector: {
            // 连接器
            name: 'rounded',
            args: {
              radius: 45,
            },
          },
          anchor: 'center', // 锚点位置
          connectionPoint: {
            name: 'bbox', // 连线点
          },
          validateConnection({
            // 在移动边的时候判断连接是否有效，如果返回 false，当鼠标放开的时候，不会连接到当前元素，否则会连接到当前元素
            targetMagnet,
            sourceCell,
            targetCell,
          }) {
            // 禁止双向连线
            const i = graph.toJSON().cells.find(ele => {
              if (
                ele.shape === 'edge' &&
                ele.target.cell === sourceCell.id &&
                ele.source.cell === targetCell.id
              )
                return true;
            });
            if (i) return false;
            return !!targetMagnet;
          },
          createEdge() {
            // 创建连线方式
            return graph.createEdge({
              shape: 'default-edge',
              attrs: {
                line: {
                  strokeDasharray: '5 5',
                },
              },
              zIndex: -1,
            });
          },
        },
        highlighting: {
          // 连接桩高亮
          magnetAvailable: magnetAvailabilityHighlighter,
          magnetAdsorbed: {
            name: 'stroke',
            args: {
              attrs: {
                fill: '#fff',
                stroke: '#31d0c6',
              },
            },
          },
        },
      }).fromJSON(data);
    }
    // 初始化dnd
    const initDnd = () => {
      dnd.value = new Dnd({
        target: graph,
        validateNode() {
          return true;
        },
      });
    };
    // 初始化事件
    function initEvent() {
      // 绑定右键点击事件
      graph.on('node:contextmenu', ({ node }) => {
        choiceType.value = 'node';
        choiceId.value = node.id;
      });
      graph.on('edge:contextmenu', ({ edge }) => {
        choiceType.value = 'edge';
        choiceId.value = edge.id;
      });
      graph.on('blank:contextmenu', () => {
        choiceType.value = 'blank';
        choiceId.value = '';
      });
      // 绑定鼠标滚轮事件
      graph.on('cell:mousewheel', () => {
        setTimeout(() => {
          zoom.value = Number((graph.zoom() * 100).toFixed(0));
        }, 50);
      });
      graph.on('blank:mousewheel', () => {
        setTimeout(() => {
          zoom.value = Number((graph.zoom() * 100).toFixed(0));
        }, 50);
      });
      // 绑定左键点击事件
      graph.on('node:click', ({ node }) => {
        rightDrawer.value.nodeClickResponse(node);
        // clickNode.value = data.nodes.find((ele)=>{
        //   return ele.id == node.id;
        // });
      });
      graph.on('edge:click', ({ edge }) => {
        rightDrawer.value.edgeClickResponse(edge);
      });
      graph.on('blank:click', ({}) => {
        rightDrawer.value.blankClickResponse();
      });
      // 绑定拖动节点事件
      graph.on('node:mousemove', ({ node }) => {
        rightDrawer.value.nodeMouseMoveResponse(node);
      });
      // 绑定连线事件
      graph.on('edge:connected', ({ edge }) => {
        edge.attr({
          line: {
            strokeDasharray: '',
          },
        });
      });
      // 绑定节点数据更改事件
      graph.on('node:change:data', ({ node }) => {
        const data = node.getData();
        const incomingEdges = graph.getIncomingEdges(node);
        const outgoingEdges = graph.getOutgoingEdges(node);
        incomingEdges?.forEach(edge => {
          if (data.status === 'running') {
            edge.attr('line/strokeDasharray', 5);
            edge.attr('line/style/animation', 'running-line 30s infinite linear');
          } else {
            edge.attr('line/strokeDasharray', '');
            edge.attr('line/style/animation', '');
          }
        });
        outgoingEdges?.forEach(edge => {
          if (data.htc === true) {
            edge.attr('line/strokeWidth', 5);
            edge.attr('line/targetMarker/name', 'path');
            edge.attr('line/targetMarker/offsetX', -8);
            edge.attr(
              'line/targetMarker/d',
              'M5.5,15.499,15.8,21.447,15.8,15.846,25.5,21.447,25.5,9.552,15.8,15.152,15.8,9.552z'
            );
          } else {
            edge.attr('line/strokeWidth', 1.5);
            edge.attr('line/targetMarker/name', 'path');
            edge.attr('line/targetMarker/offsetX', -5);
            edge.attr(
              'line/targetMarker/d',
              'M10.3,11.9L10.3,6.29L10.3,5.6L10.3,0L0,5.95L10.3,11.9Z'
            );
          }
        });
      });
      // 绑定连线添加事件
      graph.on('edge:added', () => {
        checkHtc();
      });
    }

    // 设置节点状态
    const setNodeStatus = (index, status) => {
      const node = graph.getNodes()[index];
      let data = node.getData();
      node.setData({ name: data.name, status: status });
    };

    // 模拟运行工作流
    const runWorkFlow = () => {
      setNodeStatus(0, 'running');
      setNodeStatus(1, 'default');
      setNodeStatus(2, 'default');
      setNodeStatus(3, 'default');
      setNodeStatus(4, 'default');
      setNodeStatus(5, 'default');
      setTimeout(() => {
        setNodeStatus(0, 'success');
        setNodeStatus(1, 'running');
        setNodeStatus(2, 'running');
        setTimeout(() => {
          setNodeStatus(1, 'success');
          setNodeStatus(3, 'running');
          setNodeStatus(4, 'running');
          setTimeout(() => {
            setNodeStatus(3, 'success');
            setTimeout(() => {
              setNodeStatus(4, 'warning');
            }, 3000);
          }, 1000);
        }, 1000);
        setTimeout(() => {
          setNodeStatus(2, 'success');
          setNodeStatus(5, 'running');
          setTimeout(() => {
            setNodeStatus(5, 'error');
          }, 1000);
        }, 3000);
      }, 2000);
    };

    // 检查是否有htc节点
    const checkHtc = () => {
      const nodes = graph.getNodes();
      for (let i = 0, len = nodes.length; i < len; i++) {
        if (nodes[i].getData().htc) {
          nodes[i].setData({ htc: false });
          nodes[i].setData({ htc: true });
        }
      }
    };

    onMounted(() => {
      transformToData();
      initShape();
      initGraph();
      initDnd();
      initEvent();
      checkHtc();
      centerContent();
    });

    return {
      undo,
      redo,
      zoomIn,
      zoomOut,
      centerContent,
      choiceType,
      addNode,
      deleteNode,
      deleteEdge,
      refresh,
      nodeSetting,
      showNode,
      showEdge,
      showData,
      downloadData,
      shGrid,
      layout,
      shLeftDrawer,
      shRightDrawer,
      showLeftDrawer,
      showRightDrawer,
      zoom,
      rightDrawer,
      startDrag,
      runWorkFlow,
      openHelpDialog,
      help,
      closeHelp,
      closeCode,
      openCodeDialog,
      jsonData,
      flow,
      showMinimap,
      shMinimap,
      showGrid,
      zoomTo,
      zoomToFit,
      importJson,
    };
  },
});
</script>

<style scoped>
@import url('./X6Editor.css');
</style>
