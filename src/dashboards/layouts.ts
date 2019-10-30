import { HtmlWidget, GridLayout, CardWidgetOptions, Single, CssGrid, LayoutManager } from "@csnext/cs-client";
import { IDashboard, CssGridWidgetOptions, CssGridDashboardOptions, IDashboardOptions } from '@csnext/cs-core'
import { SplitPanelOptions, SplitPanel } from '@csnext/cs-split-panel';
import { DragLayout, DragLayoutOptions } from '@csnext/cs-drag-grid'

// register split panel & drag layout manager
LayoutManager.addLayoutManager(DragLayout);
LayoutManager.addLayoutManager(SplitPanel);

export const layouts: IDashboard = {
    title: "Layouts",
    icon: "dashboard",
    dashboards: [
        {
            path: "/single",
            title: "Single",
            layout: Single.id,
            info: {
                title: 'Single',
                markdownUrl: 'https://raw.githubusercontent.com/TNOCS/csnext/master/packages/cs-docs/docs/guide/layout.md'
            },
            widgets: [
                {
                    component: HtmlWidget,
                    data: 'widget 1',
                    options: {
                        class: 'widget-red'
                    }
                }
            ]
        },
        {
            path: "/grid",
            title: "Grid",
            layout: GridLayout.id,
            widgets: [
                {
                    component: HtmlWidget,
                    data: 'widget 1',
                    options: {
                        class: 'widget-red'
                    }
                },
                {
                    component: HtmlWidget,
                    data: 'widget 2',
                    options: {
                        class: 'widget-orange'
                    }
                },
                {
                    component: HtmlWidget,
                    data: 'widget 3',
                    options: {
                        class: 'widget-green'
                    }
                }

            ]
        },
        {
            title: 'CSS Grids',
            path: '/cssgrids',
            layout: CssGrid.id,
            options: {
                gap: '10px',
            } as CssGridDashboardOptions,
            widgets: [
                {
                    component: HtmlWidget,
                    data: 'widget 1',
                    options: {
                        class: 'widget-red',
                        columnStart: 1,
                        columnEnd: 2,
                        rowStart: 1,
                        rowEnd: 2
                    } as CssGridWidgetOptions
                }, {
                    component: HtmlWidget,
                    data: 'widget 2',
                    options: {
                        class: 'widget-blue',
                        columnStart: 2,
                        columnEnd: 5,
                        rowStart: 0,
                        rowEnd: 2
                    } as CssGridWidgetOptions
                },
                {
                    component: HtmlWidget,
                    data: 'widget 3',
                    options: {
                        class: 'widget-blue',
                        columnStart: 1,
                        columnEnd: 5,
                        rowStart: 2,
                        rowEnd: 4
                    } as CssGridWidgetOptions
                },
                {
                    component: HtmlWidget,
                    data: 'widget 3',
                    options: {
                        class: 'widget-blue',
                        columnStart: 5,
                        columnEnd: 12,
                        rowStart: 1,
                        rowEnd: 6
                    } as CssGridWidgetOptions
                },
            ]
        },
        {
            title: 'CSS Grid Areas',
            path: '/cssgridsareas',
            layout: CssGrid.id,
            options: {
                template: 'default'
            } as CssGridDashboardOptions,
            widgets: [
                {
                    component: HtmlWidget,
                    data: 'widget 1',
                    options: {
                        class: 'widget-red',
                        area: 'header'
                    } as CssGridWidgetOptions
                }, {
                    component: HtmlWidget,
                    data: 'widget 2',
                    options: {
                        class: 'widget-yellow',
                        area: 'left'
                    } as CssGridWidgetOptions
                },
                {
                    component: HtmlWidget,
                    data: 'widget 3',
                    options: {
                        class: 'widget-blue',
                        area: 'middle'
                    } as CssGridWidgetOptions
                },
                {
                    component: HtmlWidget,
                    data: 'widget 4',
                    options: {
                        class: 'widget-green',
                        area: 'right'
                    } as CssGridWidgetOptions
                },
            ]
        },
        {
            id: "splitpanel",
            path: "/splitpanel",
            title: "Split Panel",
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
                    component: HtmlWidget,
                    id: 'widget-1',
                    data: 'widget 1',
                    options: {
                        class: 'widget-red'
                    }
                },
                {
                    component: HtmlWidget,
                    id: 'widget-2',
                    data: 'widget 2',
                    options: {
                        class: 'widget-orange'
                    }
                },
                {
                    component: HtmlWidget,
                    id: 'widget-3',
                    data: 'widget 3',
                    options: {
                        class: 'widget-green'
                    }
                }

            ]
        },
        {
            id: "drag",
            path: "/drag",
            title: "Drag Grid",
            layout: DragLayout.id,
            defaultWidgetOptions: {
                elevation: 5,
                flat: false,
                backgroundColor: 'blue',
            },
            options: {
                DragEnabled: false
            } as DragLayoutOptions,
            widgets: [
                {
                    id: 'widget1',
                    component: HtmlWidget,
                    data: 'widget 1',
                    options: {
                        elevation: 0,
                        width: 6,
                        card: {
                            title: 'test',
                            description: 'test',
                            backgroundImage: 'images/beach.jpg',
                        }
                    } as CardWidgetOptions
                },
                {
                    id: 'widget2',
                    component: HtmlWidget,
                    data: 'widget 2',
                    options: {
                        height: 2
                    }
                },
                {
                    id: 'widget3',
                    component: HtmlWidget,
                    data: 'widget 3',
                    options: {
                        height: 2

                    }
                },
                {
                    component: HtmlWidget,
                    data: 'widget 4',
                    options: {
                        height: 2

                    }
                },
                {
                    component: HtmlWidget,
                    data: 'widget 5',
                    options: {
                        x: 6,
                        y: 7,
                        width: 4,
                        height: 2,

                    }
                }
            ]
        }
    ]
}