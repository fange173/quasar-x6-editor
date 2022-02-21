<template>
  <div>
    <div class="default-node htc-node-1" v-if="data.htc" />
    <div class="default-node htc-node-2" v-if="data.htc" />
    <div class="default-node tooltip">
      <div class="left-side">
        <span class="material-icons status-icons cursor-pointer" style="color: #808080;" @click="nodeSetting">
          settings_outlined
        </span>
      </div>
      <div class="center">
        {{ data.name }}
      </div>
      <div class="right-side">
        <span class="material-icons status-icons" style="color: green;" v-if="data.status === 'success'">
          check_circle_outline
        </span>
        <span class="material-icons status-icons" style="color: red;" v-else-if="data.status === 'error'">
          cancel
        </span>
        <span class="material-icons status-icons" style="color: orange;" v-else-if="data.status === 'warning'">
          error_outline
        </span>
        <span class="material-icons status-icons running-status" style="color: blue;" v-else-if="data.status === 'running'">
          directions_run
        </span>
        <span class="material-icons status-icons" style="color: #808080;" v-else>
          task
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, onMounted, ref } from 'vue';
import { Dialog, Notify } from 'quasar';

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
