import Vue from "vue";
import { CsApp, AppState, CsPlugin, GridLayout, CsIntroWidget, IntroWidgetOptions } from "@csnext/cs-client";
import { NavigationOptions } from '@csnext/cs-core';

// include style definitions used for widgets
import './assets/styles.css';
import { layouts } from './dashboards/layouts';
import { widgets } from './dashboards/widgets';
import { navigation } from './dashboards/navigation';
import { maps } from './dashboards/maps';
import { LayerSource, MapLayers } from '@csnext/cs-map';

Vue.config.productionTip = false;

Vue.use(CsPlugin);

new Vue({
  render: h => h(CsApp as any)
}).$mount("#app");

AppState.Instance.init({
  datasources: {
    maps: new MapLayers()
  },
  header: {
    title: "Testing app",
    logo: "images/logo.png"
  },
  navigation: {
    style: "left-hierarchy",
  },
  leftSidebar: {
    open: true,
    mini: false,
    canMinify: true,
    floating: false,
    clipped: true,
    permanent: false,
    temporary: false,
    visible: true,
    width: 240
  },
  rightSidebar: {
    width: 400,
    open: false,
    right: true,
    sidebars: {}

  },
  theme: {
    dark: false,
    darkColors: {
      headerBackground: 'red',
      success: '#ffaabb'
    },
    lightColors: {
      headerBackground: 'red',
      success: '#bbaaff'
    }
  },
  dashboards: [
    {
      layout: GridLayout.id,
      title: 'Intro',
      icon: 'home',
      path: '/',
      widgets: [
        {
          component: CsIntroWidget,          
          data: 'test'
        }
      ]
    },
    layouts,
    navigation,
    widgets,
    maps
  ]
});

(<any>window).$cs = AppState.Instance;

