<template>
  <v-container>
    <v-row>
      <v-col v-if="mapWidget">
        <h1>Map Widget Properties</h1>
        <cs-form v-if="mapWidget.options" :data="mapWidget.options" :formdef="mapOptionsForm"></cs-form>
        <h1>Map Widget Methods</h1>
        <v-btn @click="zoomToRandom()">Zoom to</v-btn>
      </v-col>     
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { WidgetBase, AppState } from "@csnext/cs-client";
import { IProject, IMenu, IFormOptions, IWidget } from "@csnext/cs-core";
import { CsForm } from "@csnext/cs-form";
import { LayerSource, MapDatasource, MapOptions } from "@csnext/cs-map";

@Component({
  components: { CsForm }
})
export default class MapsPlayground extends WidgetBase {
  public project!: IProject;
  public mapDatasource: MapDatasource | null = null;
  public mapOptions: MapOptions | null = null;
  public mapOptionsForm?: IFormOptions | null = null;
  public mapWidget?: IWidget | null = null;

  public menuFormDef?: IFormOptions;

  constructor() {
    super();
    this.mapOptionsForm = {
      title: "Map Options",
      fields: [
        {
          title: "Show Traffic Button",
          _key: "showTraffic",
          type: "checkbox",
          group: 'tools'
        },
        {
          title: "Show Ruler",
          _key: "showRuler",
          type: "checkbox",
          group: 'tools'
        },
        {
          title: "Show Compass",
          _key: "showCompass",
          type: "checkbox",
          group: 'navigation'
        },
        {
          title: "Show Zoom",
          _key: "showZoom",
          type: "checkbox",
          group: 'navigation'
        },
        {
          title: "Show Geocoder",
          _key: "showGeocoder",
          type: "checkbox",
          group: 'tools'
        },
        {
          title: "Show Styles",
          _key: "showStyles",
          type: "checkbox",
          group: 'navigation'
        },
        {
          title: "Show Grid",
          _key: "showGrid",
          type: "checkbox",
          group: 'tools'
        },
        {
          title: "Show Layers",
          _key: "showLayers",
          type: "checkbox",
          group: 'navigation'
        },
         {
          title: "Show Geolocator",
          _key: "showGeolocater",
          type: "checkbox",
          group: 'map'    
        },
        {
          title: "Show Scale",
          _key: "showScale",
          type: "checkbox",
          group: 'map'    
        },
        
      ]
    };
  }

  contentLoaded(ms: MapDatasource) {    
    this.mapDatasource = ms;
    if (this.mapDatasource && this.mapDatasource.MapWidget && this.mapDatasource.MapWidget.options) {
      this.mapOptions = this.mapDatasource.MapWidget.options;
      
    }
  }

  mounted() {
    // find csmap widget    
    this.mapWidget = AppState.Instance.findWidget('map-playground-widget');    
  }

  zoomToRandom() {
    if (!this.mapDatasource) { return; }
    this.mapDatasource.MapControl!.zoomTo(13);
  }
}
</script>
