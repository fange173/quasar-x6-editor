import { defineStore } from 'pinia';

export const useEditorStore = defineStore('editorStore', {
  state: () => ({
    showLeftDrawer: false,
    showRightDrawer: false,
    showGrid: true,
    showMinimap: false,
    openHelpDialog: false,
    openCodeDialog: false,
    graphWidth: window.innerWidth - 600,
  }),
  actions: {},
});
