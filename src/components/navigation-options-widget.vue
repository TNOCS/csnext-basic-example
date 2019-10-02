<template>
<div>
  <cs-form :data="$cs.project.navigation" :formdef="formDefNavigation"></cs-form>
  <cs-form :data="$cs.project.leftSidebar" :formdef="formDefLeftSidebar"></cs-form>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { WidgetBase } from "@csnext/cs-client";
import { CsForm } from "@csnext/cs-form";
import { NavigationOptions, SidebarOptions } from "@csnext/cs-core";
import SidebarOptionsWidget from './sidebar-options-widget.vue';

@Component({
  components: { CsForm }
})
export default class NavigationOptionsWidget extends WidgetBase {
  public formDefNavigation?: CsForm;
  public formDefLeftSidebar?: CsForm;
  constructor() {
    super();
    this.formDefNavigation = (new NavigationOptions() as any)._form;
    this.formDefLeftSidebar = (new SidebarOptions() as any)._form;    
  }
}
</script>
