import "css-reset-and-normalize/css/reset-and-normalize.min.css";
import "@arcgis/core/assets/esri/themes/light/main.css";
import '@/style.less'


import { createApp } from 'vue'
import App from './App.vue'

import esriConfig from "@arcgis/core/config";
esriConfig.apiKey = "AAPK0c80427f13aa4740a2458ea0cc627c04uDL22RHYqQvTz9ysKfweYAIDjIC15F9P_Kk2gkxZbE3BT_VwppeZ2y9U1NaknHtp";

createApp(App).mount('#app')
