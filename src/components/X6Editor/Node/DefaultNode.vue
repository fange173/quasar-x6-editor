<template>
  <div>
    <div class="htc-node-1" v-if="data.htc" />
    <div class="htc-node-2" v-if="data.htc" />
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
/* eslint-disable */
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
.default-node {
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
.htc-node-1 {
  position: absolute;
  top: -5px;
  left: -5px;
  z-index: -2;
  width: 200px;
  height: 36px;
  line-height: 36px;
  border-radius: 4px;
  background: #ffffff;
  border: 1px solid #ccd1dc;
  box-shadow: 0 2px 5px 1px rgb(0 0 0 / 6%);
  color: #5c5c5c;
  opacity: 0.8;
}
.htc-node-2 {
  position: absolute;
  top: -9px;
  left: -9px;
  z-index: -3;
  width: 200px;
  height: 36px;
  line-height: 36px;
  border-radius: 4px;
  background: #ffffff;
  border: 1px solid #ccd1dc;
  box-shadow: 0 2px 5px 1px rgb(0 0 0 / 6%);
  color: #5c5c5c;
  opacity: 0.6;
}
</style>
