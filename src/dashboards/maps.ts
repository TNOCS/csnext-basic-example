import { CssGrid } from "@csnext/cs-client";
import { CssGridDashboardOptions, IDashboard } from '@csnext/cs-core';
import { CsMap, MapOptions } from '@csnext/cs-map';
import { MapboxOptions } from 'mapbox-gl';
import MapsPlayground from './../components/maps/maps-playground.vue';
import LayersPlayground from './../components/maps/layers-playground.vue';

export const maps = {
    title: "Maps",
    icon: "map",
    dashboards: [
        {
            path: "/maps/playground",
            title: "Map Playground",
            options: {
                class: 'left-right-template'
            } as CssGridDashboardOptions,
            layout: CssGrid.id,
            widgets: [
                {
                    id: 'map-playground-widget',
                    component: CsMap,
                    datasource: 'maps',
                    options: {
                        area: 'left',
                        class: 'data-map-container',
                        token: 'pk.eyJ1IjoiZGFteWxlbiIsImEiOiJjazFqN2ljNzYwMTJlM2xucGV3enJvYjE4In0.kArBU3x7YIy3DhfyQhtSGw',
                        mbOptions: {
                            style:  'mapbox://styles/mapbox/streets-v9',
                            center: [4.799119, 52.478137],
                            zoom: 13
                        } as MapboxOptions,
                        showBuildings: false,
                        showDraw: true,
                        showRuler: true,
                        showGrid: false,
                        showStyles: true,
                        showGeocoder: true,
                        showTraffic: true,
                        showLayers: true
                    } as MapOptions
                },
                {
                    id: 'settings',
                    component: MapsPlayground,
                    datasource: 'maps',
                    options: {
                        area: 'right'
                    }
                },
            ]
        },
        {
            path: "/maps/layers",
            title: "Layers Playground",
            options: {
                class: 'left-right-template'
            } as CssGridDashboardOptions,
            layout: CssGrid.id,
            widgets: [
                {
                    id: 'layers-map-playground-widget',
                    component: CsMap,
                    datasource: 'maps',
                    options: {
                        area: 'right',
                        class: 'data-map-container',
                        token: 'pk.eyJ1IjoiZGFteWxlbiIsImEiOiJjazFqN2ljNzYwMTJlM2xucGV3enJvYjE4In0.kArBU3x7YIy3DhfyQhtSGw',
                        mbOptions: {
                            style: 'mapbox://styles/mapbox/streets-v9',
                            center: [4.799119, 52.478137],
                            zoom: 13
                        } as MapboxOptions,
                        showDraw: false,
                        showRuler: false,
                        showGrid: false,
                        showStyles: true,
                        showGeocoder: false,
                        showTraffic: false,
                        showLayers: true
                    } as MapOptions
                },
                {
                    id: 'settings',
                    component: LayersPlayground,
                    datasource: 'maps',
                    options: {
                        area: 'left'
                    }
                },
            ]
        },

    ]
} as IDashboard;