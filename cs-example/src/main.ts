import Vue from "vue";
import { CsApp, AppState, CsPlugin, MdWidget, DashboardManager, LayoutManager } from "@csnext/cs-client";
import HelloWorld from "./components/HelloWorld.vue";
import { SplitPanel, SplitPanelOptions } from '@csnext/cs-split-panel';
import { IDashboardOptions } from '@csnext/cs-core';

// include style definitions used for widgets
import './assets/styles.css';

Vue.config.productionTip = false;

Vue.use(CsPlugin);

// register split panel layout manager
LayoutManager.addLayoutManager(SplitPanel);

new Vue({
  render: h => h(CsApp as any)
}).$mount("#app");

AppState.Instance.init({
  header: {
    title: "Testing app",
    titleWidget: {
      component: MdWidget,
      data: "<b>md widget<b>",
      options: {
        background: true
      }
    }
  },
  navigation: {
    style: "tabs"
  },
  leftSidebar: {
    open: false,
    mini: false,
    canMinify: true,
    floating: false,
    clipped: true,
    permanent: false,
    temporary: false,
    visible: true,
    width: 240
  },
  theme: {},
  dashboards: [
    {
      id: "start",
      path: "/start",
      title: "start",
      layout: "grid",
      widgets: [
        {
          component: MdWidget,
          data: "<b>md widget<b>"
        }
      ]
    },
    {
      id: "charts",
      path: "/charts",
      title: "charts",
      widgets: [
        {
          component: HelloWorld,
          data: "charts"
        }
      ]
    },
    {
      id: "grid",
      path: "/splitpanel",
      title: "split panel",
      layout: SplitPanel.id,
      options: {
        splitpanel: {
          direction: 'horizontal',
          elements: [
            {
              size: 35,
              widgetId: 'widget-1'
            },
            {
              size: 65,
              splitpanel: {
                direction: 'vertical',
                elements: [
                  {
                    size: 50,
                    widgetId: 'widget-2'
                  },
                  {
                    size: 50,
                    widgetId: 'widget-3'
                  }
                ]

              }
              
            }
          ]
        } as SplitPanelOptions
      } as IDashboardOptions,
      widgets: [
        {
          component: MdWidget,
          id: 'widget-1',
          data: 'widget 1',
          options: {
            class: 'splitpanel-widget'
          }
        },
        {
          component: MdWidget,
          id: 'widget-2',
          data: 'widget 2'
        },
        {
          component: MdWidget,
          id: 'widget-3',
          data: 'widget 3'
        }
        // { id: 'risk-details', component: RiskDetails, datasource: 'events' }
      ]
    }
  ]
});

