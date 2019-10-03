<template>
    <cs-form v-if="widget" :data="widget.options.toolbarOptions" :formdef="formDef"></cs-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { WidgetBase } from "@csnext/cs-client";
import { CsForm } from "@csnext/cs-form";
import { NavigationOptions, HeaderOptions, ToolbarOptions } from "@csnext/cs-core";

@Component({
  components: { CsForm }
})
export default class WidgetToolbarPlayground extends WidgetBase {
  public formDef?: CsForm;
  constructor() {
    super();    
    this.formDef = (new ToolbarOptions() as any)._form;    
  }

  mounted() {    
    
  }

}
</script>
