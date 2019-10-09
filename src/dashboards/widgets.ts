import { Billboard } from '@csnext/cs-billboard';
import { CsMarkdown } from '@csnext/cs-markdown';
import { GridLayout, MdWidgetOptions, CssGrid, MdWidget, AppState } from "@csnext/cs-client";
import { CssGridDashboardOptions, IMenu, IWidget } from '@csnext/cs-core';
import { CsMap, MapOptions } from '@csnext/cs-map';
import { CsTimeline, TimelineWidgetOptions } from '@csnext/cs-timeline';
import { MapboxOptions } from 'mapbox-gl';
import WidgetPlayground from './../components/widget-playground.vue';
import WidgetToolbarPlayground from './../components/widget-toolbar-playground.vue';


const widget_menus = [
    {
        visible: true,
        icon: 'message',
        toolTip: 'Trigger notification',
        action: (m) => {
            AppState.Instance.TriggerNotification({ title: 'clicked' });
        }
    },
    {
        visible: true,
        icon: 'invert_colors',
        toolTip: 'Toggle dark/light mode',
        action: (m) => {

            AppState.Instance.project.theme!.dark = !AppState.Instance.project.theme!.dark;
        }
    },
    {
        visible: true,
        icon: 'filter_list',
        toolTip: 'Toggle dark/light mode',
        items: [
            {
                icon: 'delete',
                title: 'delete',
                action: (m) => {
                    AppState.Instance.TriggerQuestionDialog('Delete', 'are you sure', ['yes', 'no']).then(s => {
                        AppState.Instance.TriggerNotification({ title: `Answer : ${s}` });
                    })
                }
            },

        ]
    }
] as IMenu[]

export const widgets = {
    title: "Widgets",
    icon: "widgets",
    dashboards: [
        {
            path: "/widgets/playground",
            title: "Playground",
            options: {
                class: 'widget-playground-dashboard'
            } as CssGridDashboardOptions,
            layout: CssGrid.id,
            widgets: [
                {
                    component: WidgetPlayground,
                    options: {
                        title: 'Widget Options',
                        showToolbar: false,
                        menus: widget_menus
                    }
                } as IWidget,
                {
                    component: WidgetToolbarPlayground,
                    options: {
                        icon: 'assessment',
                        title: 'Widget Toolbar Options',
                        showToolbar: true,
                        menus: widget_menus,
                        toolbarOptions: {
                            backgroundColor: 'primary',
                            flat: true,
                            hideTitle: false,
                            hideIcon: false,
                            elevation: 0,
                            dense: true,
                        }
                    }
                } as IWidget
            ]
        },
        {
            path: "/widgets/markdown",
            title: "Mark Down",
            layout: GridLayout.id,
            widgets: [
                {
                    component: CsMarkdown,
                    data:
                        `# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading


## Horizontal Rules

___

---

***

"Smartypants, double quotes" and 'single quotes'


## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~


## Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


## Lists

Unordered

+ Create a list by starting a line with \`+\`, \`-\`, or \`*\`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
1. ...or keep all the numbers as \`1.\`

Start numbering with offset:

57. foo
1. bar


## Code

Inline \`code\`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code

Block code "fences"

\`\`\`
Sample text here...
\`\`\`

Syntax highlighting

\`\`\` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
\`\`\`

`,
                    options: {
                        emoji: true
                    } as MdWidgetOptions

                }
            ]
        },
        {
            id: "billboardjs",
            path: "/widgets/billboardjs",
            title: "Billboard JS",
            defaultWidgetOptions: {
                elevation: 5,
                showToolbar: false,
                toolbarOptions: {
                    dense: true,
                    flat: true
                }
            },
            options: {
                class: 'billboard-dashboard'
            } as CssGridDashboardOptions,
            layout: CssGrid.id,
            widgets: [{
                component: Billboard,
                options: {
                    title: 'Bar Chart'
                },
                data: {
                    data: {
                        type: "bar",
                        columns: [
                            ["data1", 60, 200, 100, 170, 150, 250],
                            ["data2", 130, 100, 140, 35, 110, 50]
                        ]
                    }
                }
            },
            {
                component: Billboard,
                options: {
                    title: 'Gauge'
                },
                data: {
                    data: {
                        columns: [
                            ["data", 91.4]
                        ],
                        type: "gauge"
                    },
                    gauge: {},
                    color: {
                        pattern: [
                            "#FF0000",
                            "#F97600",
                            "#F6C600",
                            "#60B044"
                        ],
                        threshold: {
                            values: [
                                30,
                                60,
                                90,
                                100
                            ]
                        }
                    },
                }
            },
            {
                component: Billboard,
                options: {
                    title: 'Pie Chart'
                },
                data: {
                    data: {
                        columns: [
                            ["data1", 30],
                            ["data2", 120]
                        ],
                        type: "pie"
                    }
                }
            },
            {
                component: Billboard,
                options: {
                    title: 'Zoom Chart'
                },
                data: {
                    data: {
                        columns: [
                            ["sample", 30, 200, 100, 400, 150, 250, 150, 200, 170, 240, 350, 150, 100, 400, 150, 250, 150, 200, 170, 240, 100, 150, 250, 150, 200, 170, 240, 30, 200, 100, 400]
                        ]
                    },
                    zoom: {
                        enabled: {
                            type: "drag"
                        }
                    }

                }
            },

            {
                component: Billboard,
                options: {
                    title: 'Radar'
                },
                data: {
                    data: {
                        x: "x",
                        columns: [
                            ["x", "Data A", "Data B", "Data C", "Data D", "Data E"],
                            ["data1", 330, 350, 200, 380, 150],
                            ["data2", 130, 100, 30, 200, 80],
                            ["data3", 230, 153, 85, 300, 250]
                        ],
                        type: "radar",
                        labels: true
                    },
                    radar: {
                        axis: {
                            max: 400
                        },
                        level: {
                            depth: 4
                        },
                        direction: {
                            clockwise: true
                        }
                    },

                }
            },]
        },
        {

            path: '/widgets/map',
            layout: 'split-panel',
            datasource: 'project',
            title: 'Map & Timeline',
            icon: 'dashboard',
            manager: 'operation-dashboard',
            defaultWidgetOptions: {
                widgetBorder: 'widget-border-shadow'
            },
            options: {
                closeRightSidebar: true,
                splitpanel: {
                    icon: 'check_circle',
                    direction: 'vertical',
                    elements: [
                        {
                            size: 80,
                            splitpanel: {
                                direction: 'horizontal',
                                elements: [


                                    { size: 100, widgetId: 'map' }
                                ]
                            }
                        },
                        { size: 20, widgetId: 'timeline' }
                    ]
                }
            } as any,

            widgets: [
                {
                    id: 'map',
                    component: CsMap,
                    options: {
                        class: 'data-map-container',
                        token: 'pk.eyJ1IjoiZGFteWxlbiIsImEiOiJjazFqN2ljNzYwMTJlM2xucGV3enJvYjE4In0.kArBU3x7YIy3DhfyQhtSGw',
                        mbOptions: {
                            style: 'mapbox://styles/mapbox/streets-v9',
                            center: [4.799119, 52.478137],
                            zoom: 13
                        } as MapboxOptions,
                        showDraw: true,
                        showRuler: true,
                        showStyles: true,
                        showGeocoder: true,
                        showTraffic: true
                    } as MapOptions
                },
                {
                    id: 'timeline',

                    component: CsTimeline,
                    options: { showToolbar: false, showFitButton: true, toggleSmallButton: true, showGroupSelectionButton: true, logSource: 'calendar', timelineOptions: { height: '100%', editable: false, locale: 'nl' } } as TimelineWidgetOptions, datasource: 'time'
                }
            ]

        }
    ]
};