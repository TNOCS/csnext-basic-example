<template>
  <v-container>
    <v-row>
      <v-col v-if="mapWidget">
        <h1>Map Widget Properties</h1>
        <cs-form v-if="mapWidget.options" :data="mapWidget.options" :formdef="mapOptionsForm"></cs-form>
        <h1>Map Widget Methods</h1>
        <examples-list :examples="examples"></examples-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { WidgetBase, AppState } from "@csnext/cs-client";
import { IProject, IMenu, IFormOptions, IWidget } from "@csnext/cs-core";
import { CsForm } from "@csnext/cs-form";
import ExamplesList, { Example } from "./examples-list.vue";
import { LayerSource, MapDatasource, MapOptions } from "@csnext/cs-map";

@Component({
  components: { CsForm, ExamplesList }
})
export default class MapsPlayground extends WidgetBase {
  public project!: IProject;
  public mapDatasource: MapDatasource | null = null;

  public mapOptionsForm?: IFormOptions | null = null;
  private mapWidget?: IWidget | null = null;

  public menuFormDef?: IFormOptions;

  public examples: Example[] = [];

  public get MapControl() {
    return this.mapDatasource!.MapControl!;
  }

  constructor() {
    super();
  }

  contentLoaded(ms: MapDatasource) {
    this.mapDatasource = ms;
  }

  mounted() {
    // find csmap widget
    this.mapWidget = AppState.Instance.findWidget("map-playground-widget");

    this.mapOptionsForm = {
      title: "Map Options",
      fields: [
        {
          title: "Show Traffic Button",
          _key: "showTraffic",
          type: "checkbox",
          group: "tools"
        },
        {
          title: "Show Ruler",
          _key: "showRuler",
          type: "checkbox",
          group: "tools"
        },
        {
          title: "Show Compass",
          _key: "showCompass",
          type: "checkbox",
          group: "navigation"
        },
        {
          title: "Show Zoom",
          _key: "showZoom",
          type: "checkbox",
          group: "navigation"
        },
        {
          title: "Show Geocoder",
          _key: "showGeocoder",
          type: "checkbox",
          group: "tools"
        },
        {
          title: "Show Styles",
          _key: "showStyles",
          type: "checkbox",
          group: "navigation"
        },
        {
          title: "Show Grid",
          _key: "showGrid",
          type: "checkbox",
          group: "tools"
        },
        {
          title: "Show Layers",
          _key: "showLayers",
          type: "checkbox",
          group: "navigation"
        },
        {
          title: "Show Geolocator",
          _key: "showGeolocater",
          type: "checkbox",
          group: "map"
        },
        {
          title: "Show Scale",
          _key: "showScale",
          type: "checkbox",
          group: "map"
        },
        {
          title: "Show Buildings",
          _key: "showBuildings",
          type: "checkbox",
          group: "map"
        }
      ]
    };

    this.examples.push(
      {
        category: "navigation",
        title: "Zoom methods",
        description: "",
        actions: [
          {
            title: "Zoom to",
            callback: () => {
              this.MapControl.zoomTo(11);
            }
          },
          {
            title: "Slow Zoom",
            callback: () => {
              this.MapControl.zoomTo(15, { duration: 5000 });
            }
          },
          {
            title: "Zoom in",
            icon: "zoom_in",
            callback: () => {
              this.MapControl.zoomIn();
            }
          },
          {
            title: "Zoom out",
            icon: "zoom_out",
            callback: () => {
              this.MapControl.zoomOut();
            }
          }
        ]
      },
      {
        category: "navigation",
        title: "Navigate",
        description: "",
        actions: [
          {
            title: "Go to Amsterdam",
            callback: () => {
              this.MapControl.setCenter({ lat: 52.374579, lng: 4.895243 });
            }
          },
          {
            title: "Go to New York",
            callback: () => {
              this.MapControl.setCenter({ lat: 40.789557, lng: -73.941886 });
            }
          }
        ]
      },
      {
        category: "navigation",
        title: "Panning",
        description: "",
        actions: [
          {
            title: "Pan to London",
            callback: () => {
              this.MapControl.panTo(
                { lat: 51.506791, lng: -0.108965 },
                { duration: 3000 }
              );
            }
          },
          {
            title: "Pan to Paris",
            callback: () => {
              this.MapControl.panTo(
                { lat: 48.854486, lng: 2.350072 },
                { duration: 3000 }
              );
            }
          }
        ]
      },
      {
        category: "navigation",
        title: "Flying",
        description: "",
        actions: [
          {
            title: "Fly to Berlin",
            callback: () => {
              this.MapControl.flyTo(
                { center: { lat: 52.518044, lng: 13.404813 }},
                { duration: 3000 }
              );
            }
          },
          {
            title: "Fly to Bangkok",
            callback: () => {
              this.MapControl.flyTo(
                { center: { lat: 13.747905, lng: 100.513626 } },
                { duration: 3000 }
              );
            }
          }
        ]
      },
      {
        category: "map",
        title: "Styles",
        description: "",
        actions: [
          {
            title: "Set custom style",
            callback: () => {
              this.MapControl.setStyle(
                "https://geodata.nationaalgeoregister.nl/beta/topotiles-viewer/styles/achtergrond.json"
              );
            }
          }
        ]
      }
    );
  }

  zoomToRandom() {
    this.MapControl.zoomTo(13);
  }
}
</script>
