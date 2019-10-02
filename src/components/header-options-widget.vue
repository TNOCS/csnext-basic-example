<template>
  <cs-form :data="$cs.project.header" :formdef="formDef"></cs-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { WidgetBase } from "@csnext/cs-client";
import { CsForm } from "@csnext/cs-form";
import { NavigationOptions, HeaderOptions } from "@csnext/cs-core";

@Component({
  components: { CsForm }
})
export default class HeaderOptionsWidget extends WidgetBase {
  public formDef?: CsForm;
  constructor() {
    super();
    this.formDef = (new HeaderOptions() as any)._form;
    console.log(this.formDef);
  }
}
</script>
