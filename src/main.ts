import Vue from "vue";
import { CsApp, AppState, CsPlugin, GridLayout, CsIntroWidget, IntroWidgetOptions } from "@csnext/cs-client";
import { NavigationOptions } from '@csnext/cs-core';

// include style definitions used for widgets
import './assets/styles.css';
import { layouts } from './dashboards/layouts';
import { widgets } from './dashboards/widgets';
import { navigation } from './dashboards/navigation';

Vue.config.productionTip = false;

Vue.use(CsPlugin);

new Vue({
  render: h => h(CsApp as any)
}).$mount("#app");

AppState.Instance.init({
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
    widgets
  ]
});

(<any>window).$cs = AppState.Instance;

