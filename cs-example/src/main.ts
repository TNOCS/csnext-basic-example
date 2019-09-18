import Vue from "vue";
import { CsApp, AppState, CsPlugin, MdWidget } from "@csnext/cs-client";
import HelloWorld from "./components/HelloWorld.vue";

Vue.config.productionTip = false;

Vue.use(CsPlugin);

const app = AppState.Instance;

new Vue({
  render: h => h(CsApp as any)
}).$mount("#app");

app.init({
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
    }
  ]
});
