import Vue from "vue";
import { CsApp, AppState, CsPlugin, GridLayout, CsIntroWidget } from "@csnext/cs-client";

// include style definitions used for widgets
import './assets/styles.css';
import { layouts } from './dashboards/layouts';
import { widgets } from './dashboards/widgets';
import { navigation } from './dashboards/navigation';
import { maps } from './dashboards/maps';
import { MapLayers } from '@csnext/cs-map';
import { CsInfo, InfoDashboardManager } from '@csnext/cs-markdown';
import { IDashboard } from '@csnext/cs-core';

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
    width: 480,
    open: false,
    clipped: true,
    sidebars: {
      background: {
        id: 'info',
        icon: 'info',
        layout: GridLayout.id,
        manager: InfoDashboardManager.id,
        options: {
          showToolbar: false,
          shortcut: {
            code: 'F2'
          }
        },
        widgets: [{ component: CsInfo, id: 'search', data: 'testje' }]
      } as IDashboard
    }
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
      info: {
        title: 'Intro',

        markdownUrl: 'https://raw.githubusercontent.com/TNOCS/csnext/master/packages/cs-docs/docs/README.md'

      },
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

