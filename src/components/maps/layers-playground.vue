<template>
  <v-container v-if="mapWidget">
    <h1>Layer Examples</h1>

  <v-layout>
    <v-card outlined class="example-card" v-for="example in examples" :key="example">
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">{{example.category}}</div>
          <v-list-item-title class="headline mb-1">{{example.title}}</v-list-item-title>
          <v-list-item-subtitle>{{example.description}}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <v-btn
          text
          v-for="action in example.actions"
          @click="action.callback"
          :key="action.title"
        >{{action.title}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>

    <!-- <v-btn @click="addSimpleGeojsonLayer()">Add simple geojson layer</v-btn>
        <v-btn @click="addPolygonGeojsonLayer()">Add polygon geojson layer</v-btn>

    <v-btn @click="addPointsLayer()">Add points layer</v-btn>-->
  </v-container>
</template>

<style scoped>
.example-card {
  width: 50%;
  margin: 5px;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { WidgetBase, AppState } from "@csnext/cs-client";
import { IProject, IMenu, IFormOptions, IWidget } from "@csnext/cs-core";
import { CsForm } from "@csnext/cs-form";
import {
  LayerSource,
  MapDatasource,
  MapOptions,
  GeojsonLayer,
  GeojsonPlusLayer,
  IMapLayer
} from "@csnext/cs-map";
import { CirclePaint } from "mapbox-gl";
import { FeatureCollection } from "geojson";

export class ExampleAction {
  public title?: string;
  public callback?: () => void;
}

export class Example {
  public category?: string;
  public title?: string;
  public description?: string;
  public actions?: ExampleAction[];
}

@Component({
  components: { CsForm }
})
export default class LayersPlayground extends WidgetBase {
  public project!: IProject;
  public mapDatasource: MapDatasource | null = null;
  public mapWidget?: IWidget | null = null;
  public examples: Example[] = [];
  public simpleLayer?: IMapLayer;
  public polygonLayer?: IMapLayer;

  public menuFormDef?: IFormOptions;

  constructor() {
    super();
   
  }

  contentLoaded(ms: MapDatasource) {
    this.mapDatasource = ms;
  }

  mounted() {
    // find csmap widget
    this.mapWidget = AppState.Instance.findWidget(
      "layers-map-playground-widget"
    );
     this.examples.push({
      category: "geojson",
      title: "Add points layer",
      description: "",
      actions: [
        { title: "add layer", callback: this.addSimpleGeojsonLayer },
        { title: "remove layer", callback: ()=>{ this.removeLayer(this.simpleLayer); } },
        { title: "edit layer", callback: ()=>{ this.editLayer(this.simpleLayer); } }
      ]
    });
    this.examples.push({
      category: "geojson",
      title: "Add polygon layer",
      description: "",
      actions: [
        { title: "add layer", callback: this.addPolygonGeojsonLayer },
        { title: "remove layer", callback: ()=>{ this.removeLayer(this.polygonLayer); } }
      ]
    });
  }

  editLayer(layer?: IMapLayer) {
    if (!layer) { return; }

  }

 addPolygonGeojsonLayer() {
    if (!this.mapDatasource) {
      return;
    }

    this.mapDatasource
      .addGeojsonLayer("polygon layer", "geojson/provinces.json", {
        mapbox: {
          fillPaint: {
            "fill-color": "blue",
            "fill-opacity": 0.5,            
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

  removeLayer(layer?: IMapLayer) {
    if (layer && this.mapDatasource) {
      this.mapDatasource.removeLayer(layer.id);
      
    }
  }

  addSimpleGeojsonLayer() {
    if (!this.mapDatasource) {
      return;
    }

    this.mapDatasource
      .addGeojsonLayer("point layer", "geojson/monumentaal_groen.json", {
        mapbox: {
          circlePaint: {
            "circle-radius": 10,
            "circle-color": "blue"
          }
        },
        pointCircle: true
      })
      .then(l => {
        this.simpleLayer = l;
        this.mapDatasource!.zoomLayer(l);
      })
      .catch(e => {});
  }
}
</script>
