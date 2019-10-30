import { Single, CssGrid, GridLayout, HtmlWidget } from "@csnext/cs-client";
import { IDashboard, CssGridWidgetOptions, HeaderOptions } from '@csnext/cs-core';
import NavigationOptionsWidget from '../components/navigation-options-widget.vue';
import HeaderOptionsWidget from '../components/header-options-widget.vue';
import ThemeOptionsWidget from '../components/theme-options-widget.vue';
import MenuPlayground from '../components/menu-playground.vue';

export const navigation: IDashboard = {
    title: "Navigation",
    icon: "vertical_split",
    dashboards: [
        {
            path: "/navigation/playground",
            title: "Playground",
            layout: CssGrid.id,
            widgets: [

                {
                    component: HeaderOptionsWidget,
                    options: {
                        columnStart: 1,
                        columnEnd: 3,
                        rowStart: 1,
                        rowEnd: 4
                    } as CssGridWidgetOptions
                },
                {
                    component: NavigationOptionsWidget,
                    options: {
                        columnStart: 3,
                        columnEnd: 5,
                        rowStart: 1,
                        rowEnd: 4
                    } as CssGridWidgetOptions
                },
                {
                    component: ThemeOptionsWidget,
                    options: {
                        columnStart: 5,
                        columnEnd: 7,
                        rowStart: 1,
                        rowEnd: 4
                    } as CssGridWidgetOptions
                }
            ]
        },
        {
            title: "Tabs",
            path: "/navigation/tabs/tab1",
            options: {
                toolbarOptions: {
                    navigation: 'tabs'
                }

            },
            dashboards: [
                {
                    path: "/navigation/tabs/tab1",
                    title: "Tab 1",
                    layout: Single.id,
                    widgets: [
                        {
                            component: HtmlWidget,
                            data: 'Tab 1'
                        }
                    ]
                },
                {
                    path: "/navigation/tabs/tab2",
                    title: "Tab 2",
                    layout: Single.id,
                    widgets: [
                        {
                            component: HtmlWidget,
                            data: 'tab 2'
                        }
                    ]
                }
            ]
        },
        {
            title: "Steppers",
            path: "/navigation/steppers/step1",
            options: {
                toolbarOptions: {
                    navigation: 'stepper-inline',
                    dense: true,
                    hideTitle: true
                }
            },
            dashboards: [
                {
                    path: "/navigation/steppers/step1",
                    title: "Step 1",
                    layout: Single.id,
                    widgets: [
                        {
                            component: HtmlWidget,
                            data: 'step 1'
                        }
                    ]
                },
                {
                    path: "/navigation/steppers/step2",
                    title: "Step 2",
                    layout: Single.id,
                    widgets: [
                        {
                            component: HtmlWidget,
                            data: 'step 2'
                        }
                    ]
                },
                {
                    path: "/navigation/steppers/step3",
                    title: "Step 3",
                    layout: Single.id,
                    widgets: [
                        {
                            component: HtmlWidget,
                            data: 'step 3'
                        }
                    ]
                }
            ]
        },
        {
            title: "Menus",
            path: "/navigation/menus",
            layout: GridLayout.id,
            widgets: [
                {
                    component: MenuPlayground,
                }
            ]


        }

    ]
}