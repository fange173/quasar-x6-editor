import { defineStore } from 'pinia';

export const useEditorStore = defineStore('editorStore', {
  state: () => ({
    showLeftDrawer: true,
    showRightDrawer: true,
    showGrid: true,
    showMinimap: false,
    openHelpDialog: false,
    openCodeDialog: false,
    graphWidth: window.innerWidth - 600,
  }),
  actions: {},
});
