<template>
  <div>
    <q-dialog
      v-model="editorStore.openHelpDialog"
      @update:model-value="close"
      @escape-key="close"
      :maximized="maximized"
      :full-width="maximized"
    >
      <q-card style="width: 600px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6 row">
            帮助
            <q-space />
            <q-btn dense flat icon="crop_square" v-if="!maximized" @click="maximized = true">
              <q-tooltip :offset="[8, 8]"> 最大化 </q-tooltip>
            </q-btn>
            <q-btn dense flat icon="minimize" v-else @click="maximized = false">
              <q-tooltip :offset="[8, 8]"> 最小化 </q-tooltip>
            </q-btn>
            <q-btn dense flat icon="close" @click="close">
              <q-tooltip :offset="[8, 8]"> 关闭 </q-tooltip>
            </q-btn>
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-splitter :limits="[20, 30]" v-model="splitterModel">
            <template v-slot:before>
              <q-tabs v-model="tab" vertical class="text-primary">
                <q-tab name="如何新增" label="如何新增" />
                <q-tab name="如何删除" label="如何删除" />
                <q-tab name="如何移动" label="如何移动" />
                <q-tab name="如何连线" label="如何连线" />
                <q-tab name="如何配置节点" label="如何配置节点" />
                <q-tab name="如何查看节点" label="如何查看节点" />
              </q-tabs>
            </template>
            <template v-slot:after>
              <q-tab-panels
                v-model="tab"
                animated
                swipeable
                vertical
                transition-prev="jump-up"
                transition-next="jump-up"
              >
                <q-tab-panel name="如何新增">
                  <div class="text-h6 q-mb-md">如何新增</div>
                  <p>按住并拖动左侧组件库中的节点到中间画布，松开鼠标即可新增节点。</p>
                </q-tab-panel>
                <q-tab-panel name="如何删除">
                  <div class="text-h6 q-mb-md">如何删除</div>
                  <p>鼠标右键点击需要删除的节点，在弹出菜单中点击“删除”。</p>
                </q-tab-panel>
                <q-tab-panel name="如何移动">
                  <div class="text-h6 q-mb-md">如何移动</div>
                  <p>按住并拖动中间画布中的节点到指定位置，松开鼠标即可移动节点。</p>
                </q-tab-panel>
                <q-tab-panel name="如何连线">
                  <div class="text-h6 q-mb-md">如何连线</div>
                  <p>
                    鼠标移动到节点上、下边框的连接桩（小圆圈）处，当鼠标指针变为十字形状（+）后，移动鼠标到另一节点的连接桩并松开鼠标，即可连线。
                  </p>
                </q-tab-panel>
                <q-tab-panel name="如何配置节点">
                  <div class="text-h6 q-mb-md">如何配置节点</div>
                  <p>鼠标右键点击需要配置的节点，在弹出菜单中点击“配置”。</p>
                </q-tab-panel>
                <q-tab-panel name="如何查看节点">
                  <div class="text-h6 q-mb-md">如何查看节点</div>
                  <p>鼠标右键点击需要查看的节点，在弹出菜单中点击“查看”。</p>
                </q-tab-panel>
              </q-tab-panels>
            </template>
          </q-splitter>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, computed, getCurrentInstance, defineComponent } from 'vue';
import { useEditorStore } from 'src/stores/editor';

export default defineComponent({
  setup() {
    const tab = ref('如何新增');
    const splitterModel = ref(20);
    const _this = getCurrentInstance();
    const maximized = ref(false);
    const editorStore = useEditorStore();

    const close = () => {
      editorStore.openHelpDialog = false;
      maximized.value = false;
    };

    return {
      close,
      tab,
      splitterModel,
      editorStore,
      maximized,
    };
  },
});
</script>

<style scoped>
@import url('../X6Editor.css');
</style>
