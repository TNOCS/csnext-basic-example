<template>
    <cs-form v-if="widget" :data="widget.options" :formdef="formDef"></cs-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { WidgetBase } from "@csnext/cs-client";
import { CsForm } from "@csnext/cs-form";
import { NavigationOptions, HeaderOptions, WidgetOptions } from "@csnext/cs-core";

@Component({
  components: { CsForm }
})
export default class WidgetPlayground extends WidgetBase {
  public formDef?: CsForm;
  constructor() {
    super();    
    this.formDef = (new WidgetOptions() as any)._form;    
  }

  mounted() {    
    
  }

}
</script>
