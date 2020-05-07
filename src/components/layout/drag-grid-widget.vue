<template>
  <h1>test</h1>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { WidgetBase, AppState } from "@csnext/cs-client";
import { IProject, IMenu, IFormOptions } from "@csnext/cs-core";
import TestComponent from "./test-component.vue";
import { CsForm } from "@csnext/cs-form";

@Component({  
})
export default class DragGridWidget extends WidgetBase {
}