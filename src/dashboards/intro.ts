import { CssGrid, HtmlWidget } from "@csnext/cs-client";
import { CssGridDashboardOptions, IDashboard, WidgetOptions } from '@csnext/cs-core';

export const intro = {
    title: 'Intro',
    icon: 'home',           
    info: {
        title: 'Intro',
        markdownUrl: 'https://raw.githubusercontent.com/TNOCS/csnext/master/packages/cs-docs/docs/README.md'
    },
    dashboards: [
        {
            title: "Introduction",
            path: '/',
            layout: CssGrid.id,
            options: {
                class: 'left-right-template'
            } as CssGridDashboardOptions,
            widgets: [
                {
                    id: 'datasource-widget',
                    component: HtmlWidget,
                    datasource: 'maps',
                    options: {
                        area: 'left',
                    } as WidgetOptions
                }

            ]
        } as IDashboard,
        {
            title: "Datasources",
            path: "/intro/datasources",
            layout: CssGrid.id,
            options: {
                class: 'left-right-template'
            } as CssGridDashboardOptions,
            widgets: [
                {
                    id: 'datasource-widget',
                    component: HtmlWidget,
                    datasource: 'maps',
                    options: {
                        area: 'left',
                    } as WidgetOptions
                }

            ]
        } as IDashboard
    ]
};