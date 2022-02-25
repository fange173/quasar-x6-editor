<template>
  <div>
    <div class="default-node htc-node-1" v-if="data.htc">
      <div class="left-side" />
    </div>
    <div class="default-node htc-node-2" v-if="data.htc">
      <div class="left-side" />
    </div>
    <div class="default-node">
      <div class="left-side">
        <span class="material-icons status-icons tooltip text-positive" v-if="data.status === 'success'">
          check_circle_outline
          <span class="tooltiptext bg-positive" style="left: 18%;">成功</span>
        </span>
        <span class="material-icons status-icons tooltip text-red" v-else-if="data.status === 'error'">
          cancel
          <span class="tooltiptext bg-red" style="left: 18%;">错误</span>
        </span>
        <span class="material-icons status-icons tooltip text-warning" v-else-if="data.status === 'warning'">
          error_outline
          <span class="tooltiptext bg-warning" style="left: 18%;">警告</span>
        </span>
        <span class="material-icons status-icons running-status tooltip text-primary" v-else-if="data.status === 'running'">
          directions_run
          <span class="tooltiptext bg-primary" style="left: 18%;">运行</span>
        </span>
        <span class="material-icons status-icons tooltip text-default" v-else>
          task
          <span class="tooltiptext" style="left: 18%;">默认</span>
        </span>
      </div>
      <div class="center">
        {{ data.name }}
      </div>
      <div class="right-side">
        <span class="material-icons status-icons cursor-pointer tooltip" @click="nodeSetting">
          tune
          <span class="tooltiptext">配置</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, onMounted, ref } from 'vue';
import { Dialog, Notify, useQuasar } from 'quasar';

export default {
  setup() {
    const getNode = inject('getNode');
    const node = getNode();
    const data = ref({ name: '', status: ''});

    const contextMenu = (e) => {
      console.log(e);
    }

    // 节点选项
    const nodeSetting = () => {
      Dialog.create({
        options: {
          type: 'radio',
          model: 'opt1',
          // inline: true
          items: [
            { label: '使用本地参数文件', value: 'opt1', color: 'secondary' },
            { label: '在线配置参数', value: 'opt2' },
          ],
        },
        persistent: true,
        ok: '继续',
        cancel: '取消',
      }).onOk((data) => {
        Notify.create({
          message: '选择了 ' + data,
          color: 'primary',
        });
      });
    };

    onMounted(() => {
      data.value = node.getData();
      node.on("change:data", ({ current }) => {
        data.value = current;
      });
    })

    return {
      data,
      contextMenu,
      nodeSetting,
    };
  },
};
</script>

<style scoped>
@import url('../X6Editor.css');
</style>
