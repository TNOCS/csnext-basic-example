<template>
  <v-container fluid>
    <v-card outlined class="example-card" v-for="example in examples" :key="example.title">
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">{{example.category}}</div>
          <v-list-item-title class="headline mb-1">{{example.title}}</v-list-item-title>
          <v-list-item-subtitle>{{example.description}}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar tile height="60"><v-img v-if="example.image" :src="example.image"></v-img></v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        
          <v-btn
            outlined
            

            v-for="action in example.actions"
            @click="action.callback(action)"
            :icon="action.icon !== undefined"
            :key="action.title"
            :loading="action.loading"
          >
          <v-icon v-if="action.icon">{{action.icon}}</v-icon>
          <span v-if="!action.icon">{{action.title}}</span></v-btn>        
      </v-card-actions>
    </v-card>
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
import { Component, Vue, Prop } from "vue-property-decorator";
import { WidgetBase, AppState } from "@csnext/cs-client";
import { IProject, IMenu, IFormOptions, IWidget } from "@csnext/cs-core";

export class ExampleAction {
  public title?: string;
  public icon?: string;  
  public loading?: boolean;
  public callback?: (a: ExampleAction) => void;
}

export class Example {
  public category?: string;
  public title?: string;  
  public description?: string;
  public image?: string;  
  public actions?: ExampleAction[];
}

@Component({})
export default class ExamplesList extends Vue {
  @Prop()
  public examples: Example[] = [];
}
</script>