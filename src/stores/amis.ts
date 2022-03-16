import { defineStore } from 'pinia';

export const useAmisStore = defineStore('amisStore', {
  state: () => ({
    showDialog: false,
    jsonData: {},
  }),
  actions: {
    openDialog() {
      this.showDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
    },
    setJsonData(json: Object) {
      this.jsonData = json;
    },
  },
});
