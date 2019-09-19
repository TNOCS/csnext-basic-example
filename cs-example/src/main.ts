import Vue from "vue";
import { CsApp, AppState, CsPlugin, MdWidget, DashboardManager, LayoutManager, GridLayout } from "@csnext/cs-client";
import { SplitPanel, SplitPanelOptions } from '@csnext/cs-split-panel';
import { DragLayout, DragLayoutOptions } from '@csnext/cs-drag-grid';
import { IDashboardOptions } from '@csnext/cs-core';
import { Billboard } from '@csnext/cs-billboard';

// include style definitions used for widgets
import './assets/styles.css';

Vue.config.productionTip = false;

Vue.use(CsPlugin);

// register split panel & drag layout manager
LayoutManager.addLayoutManager(DragLayout);
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
      path: "/",
      title: "start",
      layout: GridLayout.id,
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
      layout: GridLayout.id,
      widgets: [
        {
          component: Billboard,
          data: {
            type: "bar",
            columns: [
              ["data1", 30, 200, 100, 170, 150, 250],
              ["data2", 130, 100, 140, 35, 110, 50]
            ]
          }
        }
      ]
    },
    {
      id: "splitpanel",
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
            class: 'widget-red'
          }
        },
        {
          component: MdWidget,
          id: 'widget-2',
          data: 'widget 2',
          options: {
            class: 'widget-orange'
          }
        },
        {
          component: MdWidget,
          id: 'widget-3',
          data: 'widget 3',
          options: {
            class: 'widget-green'
          }
        }
        // { id: 'risk-details', component: RiskDetails, datasource: 'events' }
      ]
    },
    {
      id: "drag",
      path: "/drag",
      title: "Drag Grid",
      layout: DragLayout.id,
      options: {
        DragEnabled: false
      } as DragLayoutOptions,
      widgets: [        
        {
          id: 'widget3',
          component: MdWidget,
          data: 'widget 3',
          options: {
            class: 'widget-orange'
          }
        },
        {
          id: 'widget4',
          component: MdWidget,
          data: 'widget 4',
          options: {
            class: 'widget-red'
          }
        }
        // { id: 'risk-details', component: RiskDetails, datasource: 'events' }
      ]
    }
  ]
});

