<template>
  <cs-form :data="$cs.project.theme" :formdef="formDef"></cs-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { WidgetBase } from "@csnext/cs-client";
import { CsForm } from "@csnext/cs-form";
import { AppTheme } from "@csnext/cs-core";

@Component({
  components: { CsForm }
})
export default class ThemeOptionsWidget extends WidgetBase {
  public formDef?: CsForm;
  constructor() {
    super();
    this.formDef = (new AppTheme() as any)._form;    
  }
}
</script>
