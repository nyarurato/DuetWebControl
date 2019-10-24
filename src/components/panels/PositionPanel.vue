<style scoped>
.equal-width {
  flex-basis: 0;
}

.category-header {
  flex: 0 0 100px;
}
a:not(:hover) {
  color: inherit;
}

.content span,
.content strong {
  padding-left: 8px;
  padding-right: 8px;
}

.probe-span {
  border-radius: 5px;
}
.probe-span:not(:last-child) {
  margin-right: 8px;
}
.work-position-dark {
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  border-color: #ffffff;
  margin-right: 4px;
}
.work-position-light {
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  border-color: #303030;
  margin-right: 4px;
}
</style>

<template>
  <v-card>
    <!-- Header -->
    <v-card-title class="py-2">
      <!-- Panel Title -->

      <v-icon small class="mr-1">info</v-icon>
      {{ $t('panel.positionPanel.caption') }}
      <v-spacer></v-spacer>

      <!-- Machine Status -->

      <status-label v-if="this.state.status"></status-label>

      <v-spacer></v-spacer>

      <span v-if="state.mode">{{ $t('panel.positionPanel.mode', [state.mode]) }}</span>
    </v-card-title>

    <v-card-text
      class="px-0 pt-0 pb-2 content text-xs-center pl-2 pr-2"
      v-show="sensorsPresent || (move.axes.length + move.extruders.length)"
    >
      <!-- Positions -->

      <v-layout row wrap class="content-layout">

        <!-- Work Position -->

        <v-flex v-show="move.axes.length" :class="this.darkTheme ? 'work-position-dark' : 'work-position-light'">
          <v-layout row align-center>
            <v-flex tag="strong" class="category-header">
              {{ $t('panel.positionPanel.machinePosition') }}
            </v-flex>

            <v-flex >
              <v-layout row wrap>
                <v-flex v-for="(axis, index) in move.axes" :key="index" grow class="equal-width" >
                  <v-layout column>
                    <v-flex v-if="axis.visible" tag="strong">{{ axis.letter }}</v-flex>
                    <v-flex v-if="axis.visible" tag="span" >{{ displayAxisPosition(axis, index) }}</v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-divider vertical class="my-2 hidden-xs-only"></v-divider>

        <!-- Machine Position -->

        <v-flex v-show="move.axes.length" :class="{'xs12': $vuetify.breakpoint.xsOnly}">
          <v-divider class="mx-5 my-3 hidden-sm-and-up"></v-divider>
          <v-layout row align-center>
            <v-flex
              tag="strong"
              class="category-header"
            >{{ $t('panel.positionPanel.nativePosition') }}</v-flex>

            <v-flex>
              <v-layout row wrap>
                <v-flex v-for="(axis, index) in move.axes" :key="index" grow class="equal-width">
                  <v-layout column>
                    <v-flex v-if="axis.visible" tag="strong">{{ axis.letter }}</v-flex>
                    <v-flex
                      v-if="axis.visible"
                      tag="span"
                    >{{ displayAxisNativePosition(axis, index) }}</v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-divider vertical class="my-2 hidden-sm-and-down"></v-divider>

        <!-- Speeds -->

        <v-flex
          :class="{'xs12': $vuetify.breakpoint.xsOnly, 'sm12': $vuetify.breakpoint.smOnly}"
          v-show="isNumber(move.currentMove.requestedSpeed) || isNumber(move.currentMove.topSpeed)"
        >
          <v-divider class="mx-5 my-3 hidden-md-and-up"></v-divider>

          <v-layout row align-center>
            <v-flex>
              <v-layout row wrap>
                  
                <!-- Requested Speed -->

                <v-flex v-show="isNumber(move.currentMove.requestedSpeed)" class="equal-width">
                  <v-layout column>
                    <v-flex tag="strong">{{ $t('panel.positionPanel.requestedSpeed') }}</v-flex>
                    <v-flex tag="span">{{ $display(move.currentMove.requestedSpeed, 0, 'mm/s') }}</v-flex>
                  </v-layout>
                </v-flex>

                <v-divider vertical class="my-2"></v-divider>

                <!-- Top Speed -->

                <v-flex v-show="isNumber(move.currentMove.topSpeed)" class="equal-width">
                  <v-layout column>
                    <v-flex tag="strong">{{ $t('panel.positionPanel.topSpeed') }}</v-flex>
                    <v-flex tag="span">{{ $display(move.currentMove.topSpeed, 0, 'mm/s') }}</v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card-text>

    <v-card-text
      class="pa-0"
      v-show="!sensorsPresent && !(move.axes.length + move.extruders.length)"
    >
      <v-alert :value="true" type="info">{{ $t('panel.positionPanel.noStatus') }}</v-alert>
    </v-card-text>
  </v-card>
</template>

<script>
"use strict";

import { mapState, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState("settings", ["darkTheme"]),
    ...mapGetters(["isConnected"]),
    ...mapState("machine/model", [
      "electronics",
      "fans",
      "move",
      "sensors",
      "state"
    ]),
    fanRPM() {
      const rpms = [];
      this.fans.forEach(fan => {
        if (fan.rpm != null) {
          rpms.push(fan.rpm);
        }
      });
      return rpms;
    },
    sensorsPresent() {
      return (
        this.electronics.vIn.current !== null ||
        this.electronics.mcuTemp.current !== null ||
        this.fanRPM.length ||
        this.sensors.probes.length
      );
    }
  },
  data() {
    return {
      displayToolPosition: true
    };
  },
  methods: {
    displayAxisPosition(axis, index) {
      const position = this.displayToolPosition
        ? this.move.drives[index].position
        : axis.machinePosition;
      return axis.letter === "Z"
        ? this.$displayZ(position, false)
        : this.$display(position, 1);
    },
    displayAxisNativePosition(axis, index) {
      const position = axis.nativePosition;
      return axis.letter === "Z"
        ? this.$displayZ(position, false)
        : this.$display(position, 1);
    },
    probeSpanClasses(probe, index) {
      let result = [];
      if (index && this.sensors.probes.length > 1) {
        result.push("ml-2");
      }
      if (!this.state.isPrinting && probe.value !== null) {
        if (probe.value >= probe.threshold) {
          result.push("red");
          result.push(this.darkTheme ? "darken-3" : "lighten-4");
        } else if (probe.value > probe.threshold * 0.9) {
          result.push("orange");
          result.push(this.darkTheme ? "darken-2" : "lighten-4");
        }
      }
      return result;
    }
  }
};
</script>
