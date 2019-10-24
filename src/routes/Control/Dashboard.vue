<template>
  <v-layout column>
    <v-flex>
      <v-layout row wrap full-height>
        <v-flex xs12 sm12 md12 lg12>
          <movement-panel></movement-panel>
        </v-flex>

        <v-flex v-if="settings.touchProbe.touchProbeEnable" xs12 sm12 md12 lg12>
          <touch-probe-panel></touch-probe-panel>
        </v-flex>

        <v-flex xs12 sm12 md12 lg12 class="mt-3 mb-2"><v-divider></v-divider></v-flex>

        <v-flex xs12 sm12 md12 lg12>
          <job-progress></job-progress>
        </v-flex>

        <v-flex xs12 sm12 md4 lg4 xl4>
          <job-control-panel></job-control-panel>
        </v-flex>
        <v-flex xs12 sm6 md5 lg5 xl5>
          <babystepping-panel></babystepping-panel>
        </v-flex>
        <v-flex xs12 sm6 md3 lg3 xl3>
          <speed-factor-panel></speed-factor-panel>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
"use strict";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("machine", ["settings"])
  }
};
</script>


