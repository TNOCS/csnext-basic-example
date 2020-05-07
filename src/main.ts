import Vue from "vue";
import { CsPlugin, GridLayout } from "@csnext/cs-client";

// include style definitions used for widgets
import './assets/styles.css';
import { layouts } from './dashboards/layouts';
import { widgets } from './dashboards/widgets';
import { navigation } from './dashboards/navigation';
import { maps } from './dashboards/maps';
import { MapLayers } from '@csnext/cs-map';
import { CsInfo, InfoDashboardManager } from '@csnext/cs-markdown';
import { IDashboard } from '@csnext/cs-core';
import { intro } from './dashboards/intro';

Vue.use(CsPlugin);

$cs.initApp('#app', {
    datasources: {
        maps: new MapLayers()
    },
    header: {
        title: "Common Sense",
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
                widgets: [{ component: CsInfo, id: 'search' }]
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
        intro,
        layouts,
        navigation,
        widgets,
        maps
    ]
});


