<template>
  <v-container>
    <h1>Layer Examples</h1>

    <examples-list :examples="examples" ></examples-list>
  </v-container>
</template>

<style scoped>
.example-card {
  width: calc(50% - 10px);
  margin: 5px;
  float: left;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { WidgetBase, AppState } from "@csnext/cs-client";
import { IProject, IMenu, IFormOptions, IWidget } from "@csnext/cs-core";
import { CsForm } from "@csnext/cs-form";
import ExamplesList, { Example, ExampleAction } from "./examples-list.vue";
import {
  LayerSource,
  MapDatasource,
  MapOptions,
  GeojsonLayer,
  GeojsonPlusLayer,
  IMapLayer,
  LayerEditor
} from "@csnext/cs-map";
import { CirclePaint } from "mapbox-gl";
import { FeatureCollection } from "geojson";

@Component({
  components: { CsForm, ExamplesList }
})
export default class LayersPlayground extends WidgetBase {
  public project!: IProject;
  public mapDatasource: MapDatasource | null = null;
  public examples: Example[] = [];
  public simpleLayer?: IMapLayer;
  public polygonLayer?: IMapLayer;

  polygonLayerId = "polygon layer";
  pointLayerId = "point layer";

  public menuFormDef?: IFormOptions;

  constructor() {
    super();
  }

  contentLoaded(ms: MapDatasource) {
    this.mapDatasource = ms;
    this.examples.push({
      category: "geojson",
      title: "Add points layer",
      description: "",
      actions: [
        { title: "add layer", icon: 'add', callback: this.addSimpleGeojsonLayer },
        {
          title: "remove layer", icon: 'remove',
          callback: (a: ExampleAction) => {
            if (this.mapDatasource) {
              this.mapDatasource.removeLayer(this.pointLayerId);
            }
          }
        }
      ]
    });
    this.examples.push({
      category: "geojson",
      title: "Add polygon layer",
      description: "",
      actions: [
        { title: "add layer", icon: 'add', callback: this.addPolygonGeojsonLayer },
        {
          title: "remove layer", icon: 'remove',
          callback: () => {
            if (this.mapDatasource) {
              this.mapDatasource.removeLayer(this.polygonLayerId);
            }
          }
        }       
      ]
    });
    this.examples.push({
      category: "geojson",
      title: "World Cities",
      actions: [
        {
          title: "add layer", icon: 'add',
          callback: () => {
            if (this.mapDatasource) {
              this.mapDatasource.addGeojsonLayer(
                "world cities",
                "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_populated_places.geojson",
                {  
                  title: "{{properties.NAME}}",
                  popup: "{{properties.NAME}}, {{properties.ADM0NAME}}",
                  mapbox: {
                    circlePaint: {
                      "circle-radius": 10,
                      "circle-color": "red"
                    }
                  },
                  pointCircle: true
                }
              );
            }
          }
        },
        {
          title: "remove layer", icon: 'remove',
          callback: () => {
            if (this.mapDatasource) {
              this.mapDatasource.removeLayer("world cities");
            }
          }
        }        
      ]
    });

    this.examples.push({
      category: "geojson",
      title: "Ziekenhuizen",
      actions: [
        {
          title: "add layer", icon: 'add',
          callback: () => {
            if (this.mapDatasource) {
              this.mapDatasource.addGeojsonLayer(
                "ziekenhuizen",
                "geojson/ziekenhuis.json",
                undefined,                
                "meta/ziekenhuizen.json", 
              );
            }
          }
        },
        {
          title: "remove layer", icon: 'remove',
          callback: () => {
            if (this.mapDatasource) {
              this.mapDatasource.removeLayer("ziekenhuizen");
            }
          }
        }        
      ]
    });

    this.examples.push({
      category: "geojson",
      title: "CBS gemeenten",
      image: 'images/cbs.png',
      actions: [
        {
          title: "add layer", icon: 'add',
          callback: (a) => {
            a.loading = true;
            if (this.mapDatasource) {
              this.mapDatasource.addGeojsonLayer(
                "cbs gemeenten",
                "geojson/gemeente.json", {
                  type: 'fill',
                  title: '{{properties.Name}}',
                  mapbox: {
                    fillPaint: {
                      "fill-color": "blue",
                      "fill-opacity": 0.75
                    }
                  }
                },        
                "meta/cbs.json",                 
              ).then( r => {
                a.loading = false;                
                // r.setFilter(["all", [">", "p_65_eo_jr", 10], ["<", "p_65_eo_jr", 20]]);
                console.log('Filter');
                console.log(r);
              })
            }
          }
        },
        {
          title: "remove layer", icon: 'remove',
          callback: () => {
            if (this.mapDatasource) {
              this.mapDatasource.removeLayer("cbs gemeenten");
            }
          }
        },        
        {
          title: "layer details", icon: 'list',
          callback: () => {
            if (this.mapDatasource) {
              this.mapDatasource.openLayer("cbs gemeenten");
            }
          }
        }
      ]
    });
  }

  mounted() {
    // find csmap widget
    
  }

  addPolygonGeojsonLayer() {
    if (!this.mapDatasource) {
      return;
    }

    this.mapDatasource
      .addGeojsonLayer(this.polygonLayerId, "geojson/provinces.json", {
        popup: "{{properties.name}}",
        mapbox: {
          fillPaint: {
            "fill-color": "blue",
            "fill-opacity": 0.5
          },
          linePaint: {
            "line-color": "red"
          }
        }
      })
      .then(l => {
        this.polygonLayer = l;
        this.mapDatasource!.zoomLayer(l);
      })
      .catch(e => {});
  }

  addSimpleGeojsonLayer(m: ExampleAction) {
    if (!this.mapDatasource) {
      return;
    }

    // m.loading = true;

    this.mapDatasource
      .addGeojsonLayer(this.pointLayerId, "geojson/monumentaal_groen.json", {
        popup: "{{properties.Naam}}",
        mapbox: {
          circlePaint: {
            "circle-radius": 10,
            "circle-color": "red"
          }
        },
        pointCircle: true
      })
      .then(l => {
        this.simpleLayer = l;
        this.mapDatasource!.zoomLayer(l);
        // m.loading = false;
      })
      .catch(e => {});
  }
}
</script>