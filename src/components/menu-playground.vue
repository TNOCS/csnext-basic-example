<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Icon menu item</h1>
        <cs-form v-if="iconMenuItem" :data="iconMenuItem" :formdef="menuFormDef"></cs-form>
      </v-col>
      <v-col>
        <h1>Component menu item</h1>
        <cs-form v-if="componentMenuItem" :data="componentMenuItem" :formdef="menuFormDef"></cs-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { WidgetBase, AppState } from "@csnext/cs-client";
import { IProject, IMenu, IFormOptions } from "@csnext/cs-core";
import TestComponent from "./test-component.vue";
import { CsForm } from "@csnext/cs-form";

@Component({
  components: { CsForm }
})
export default class MenuPlayground extends WidgetBase {
  public project!: IProject;
  public iconMenuItem: IMenu;
  public componentMenuItem: IMenu;

  public menuFormDef?: IFormOptions;

  constructor() {
    super();
    this.menuFormDef = {
      title: "Icon Menu",
      showToolbar: false,
      hideTitle: true,
      isPanel: false,
      fields: [
        {
          title: "icon",
          _key: "icon",
          type: "string",
          required: true
        },
        {
          title: "title",
          _key: "title",
          type: "string"
        },
        {
          title: "tooltip",
          _key: "toolTip",
          type: "string"
        },
        {
          title: "type",
          _key: "type",
          type: "combobox",
          options: ["icon", "text", "icon-text", "fab"]
        },
        {
          title: "color",
          _key: "color",
          type: "colorpicker"
        },
        {
          title: "outlined",
          _key: "outlined",
          type: "checkbox"
        },
        {
          title: "loading",
          _key: "loading",
          type: "checkbox"
        },
         {
          title: "disabled",
          _key: "disabled",
          type: "checkbox",
          group: "active"
        },
        {
          title: "hide",
          _key: "hide",
          type: "checkbox",
          group: "active"
        }
      ]
    } as IFormOptions;
    this.iconMenuItem = {
      id: "icon",
      title: "Dark mode",
      outlined: false,
      type: "icon",
      color: "primary",
      toolTip: "Toggle dark/light mode",
      icon: "invert_colors",

      action: m => {
        $cs.project.theme!.dark = !$cs.project
          .theme!.dark;
      }
    };
    $cs.addMenu(this.iconMenuItem);

    this.componentMenuItem = {
      id: "compoment",
      icon: "insert_photo",
      title: "Open Component",
      type: "text",
      outlined: false,
      toolTip: "Open Component",
      color: "red",
      component: TestComponent
    };
    $cs.addMenu(this.componentMenuItem);
  }

  beforeDestroy() {
    $cs.removeMenu(this.iconMenuItem.id!);
    $cs.removeMenu(this.componentMenuItem.id!);
  }
}
</script>
