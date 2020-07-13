<template>
  <v-card>
    <v-card-title>
      <span>{{ $t('panel.settingsTouchProbe.caption') }}</span>
      <v-spacer></v-spacer>
      <a v-show="!uiFrozen" href="#" @click.prevent="showResetConfirmation = true">
        <v-icon small class="mr-1">restore</v-icon>
        {{ $t('panel.settingsTouchProbe.touchProbeRevert') }}
      </a>
    </v-card-title>

    <v-container fluid grid-list-lg class="px-3">
      <v-switch
        :label="$t('panel.settingsTouchProbe.touchProbeEnableCaption')"
        v-model="probeEnable"
        :disabled="uiFrozen"
        hide-details
        class="pt-0 mt-0"
      ></v-switch>
       <v-flex xs12 sm12 md12 class="mt-3 pt-3">
          <v-select
            :disabled="!probeEnable"
            :label="$t('panel.settingsTouchProbe.touchProbeType')"
            class="ma-0 pa-0"
            v-model="probeType"
            :items=" touchProbeTypeItems"
          ></v-select>
        </v-flex>
      <v-layout row wrap align-center class="mt-0">
        <v-flex xs6 sm6 md6 class="mt-3">
          <v-select
            :disabled="!probeEnable"
            :label="$t('panel.settingsTouchProbe.touchProbeEndstopNumberCaption')"
            class="ma-0 pa-0"
            v-model="endstopDriveNumber"
            :items="InputPinItems"
          ></v-select>
        </v-flex>
        <v-flex xs6 sm6 md6 class="mt-3">
          <v-select
            :disabled="!probeEnable"
            :label="$t('panel.settingsTouchProbe.touchProbeTriggerCaption')"
            class="ma-0 pa-0"
            v-model="triggerType"
            :items="triggerItems"
          ></v-select>
        </v-flex>
      </v-layout>
      <v-flex xs12 sm12 md12 class="mt-0 pt-0">
        <v-text-field
          :disabled="!probeEnable"
          v-model.number="feedrate"
          type="number"
          step="1"
          min="0"
          :label="$t('panel.settingsTouchProbe.touchProbeFeedRateCaption')"
        ></v-text-field>
      </v-flex>
      <v-layout row wrap align-center class="mt-3 pt-2">
        <v-flex xs4 sm4 md4>
          <v-text-field
            :disabled="!probeEnable || probeType"
            v-model.number="XDimension"
            type="number"
            step="any"
            min="0.001"
            :label="$t('panel.settingsTouchProbe.touchProbeXDimensionCaption')"
          ></v-text-field>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-text-field
            :disabled="!probeEnable || probeType"
            v-model.number="YDimension"
            type="number"
            step="any"
            min="0.001"
            :label="$t('panel.settingsTouchProbe.touchProbeYDimensionCaption')"
          ></v-text-field>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-text-field
            :disabled="!probeEnable"
            v-model.number="ZDimension"
            type="number"
            step="any"
            min="0.001"
            :label="$t('panel.settingsTouchProbe.touchProbeZDimensionCaption')"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap align-center>
        <v-flex xs4 sm4 md4>
          <v-text-field
            :disabled="!probeEnable || probeType"
            v-model.number="XOffset"
            type="number"
            step="any"
            min="0.001"
            :label="$t('panel.settingsTouchProbe.touchProbeXOffsetCaption')"
          ></v-text-field>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-text-field
            :disabled="!probeEnable || probeType"
            v-model.number="YOffset"
            type="number"
            step="any"
            min="0.001"
            :label="$t('panel.settingsTouchProbe.touchProbeYOffsetCaption')"
          ></v-text-field>
        </v-flex>
        <v-flex xs4 sm4 md4>
          <v-text-field
            :disabled="!probeEnable || probeType"
            v-model.number="ZOffset"
            type="number"
            step="any"
            min="0.001"
            :label="$t('panel.settingsTouchProbe.touchProbeZOffsetCaption')"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
    <confirm-dialog
      :shown.sync="showResetConfirmation"
      :question="$t('dialog.confirmTouchProbeReset.title')"
      :prompt="$t('dialog.confirmTouchProbeReset.prompt')"
      @confirmed="resetTouchProbe()"
    ></confirm-dialog>
  </v-card>
</template>

<script>
"use strict";

import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState("machine", ["settings"]),
    ...mapState("machine/model", ["electronics"]),
    ...mapState(["isLocal"]),
    ...mapGetters(["uiFrozen"]),
    probeEnable: {
      get() {
        return this.settings.touchProbe.touchProbeEnable;
      },
      set(value) {
        this.update({ touchProbe: { touchProbeEnable: value } });
      }
    },
    touchProbeTypeItems() {
      return [
        { text: this.$t('panel.settingsTouchProbe.touchProbeXYZ'), value: false },
        { text: this.$t('panel.settingsTouchProbe.touchProbeZ'), value: true }
      ];
    },
    probeType: {
      get() {
        return this.settings.touchProbe.touchProbeType;
      },
      set(value) {
        this.update({ touchProbe: { touchProbeType: value } });
        if (value == true) {
          this.update({ touchProbe: { touchProbeZOffset: this.settings.touchProbe.touchProbeZDimension } });
        }
      }
    },
    endstopDriveNumber: {
      get() {
        return this.settings.touchProbe.touchProbeEndstopDriveNumber;
      },
      set(value) {
        this.update({ touchProbe: { touchProbeEndstopDriveNumber: value } });
        this.update({ touchProbe: { touchProbeEndstopDriveNumber: value } });
        this.update({
          touchProbe: { touchProbeEndstopAxis: this.InputPinItems[value].text }
        });
      }
    },
    triggerItems() {
      return [
        { text: this.$t('panel.settingsTouchProbe.touchProbeActiveLow'), value: 0 },
        { text: this.$t('panel.settingsTouchProbe.touchProbeActiveHigh'), value: 1 }
      ];
    },
    InputPinItems() {
      return [
        { text: "io3.in", value: 0 },
        { text: "io4.in", value: 1 },
        { text: "io5.in", value: 2 },
        { text: "io6.in", value: 3 },
        { text: "io7.in", value: 4 }
      ];
    },
    triggerType: {
      get() {
        return this.settings.touchProbe.touchProbeTriggerType;
      },
      set(value) {
        this.update({ touchProbe: { touchProbeTriggerType: value } });
      }
    },
    feedrate: {
      get() {
        return this.settings.touchProbe.touchProbeFeedrate;
      },
      set(value) {
        this.update({ touchProbe: { touchProbeFeedrate: value } });
      }
    },
    XDimension: {
      get() {
        return this.settings.touchProbe.touchProbeXDimension;
      },
      set(value) {
        this.update({ touchProbe: { touchProbeXDimension: value } });
      }
    },
    YDimension: {
      get() {
        return this.settings.touchProbe.touchProbeYDimension;
      },
      set(value) {
        this.update({ touchProbe: { touchProbeYDimension: value } });
      }
    },
    ZDimension: {
      get() {
        return this.settings.touchProbe.touchProbeZDimension;
      },
      set(value) {
        this.update({ touchProbe: { touchProbeZDimension: value } });
        if (this.settings.touchProbe.touchProbeType == true) {
          this.update({ touchProbe: { touchProbeZOffset: value } });
        }
      }
    },
    XOffset: {
      get() {
        return this.settings.touchProbe.touchProbeXOffset;
      },
      set(value) {
        this.update({ touchProbe: { touchProbeXOffset: value } });
      }
    },
    YOffset: {
      get() {
        return this.settings.touchProbe.touchProbeYOffset;
      },
      set(value) {
        this.update({ touchProbe: { touchProbeYOffset: value } });
      }
    },
    ZOffset: {
      get() {
        return this.settings.touchProbe.touchProbeZOffset;
      },
      set(value) {
        this.update({ touchProbe: { touchProbeZOffset: value } });
      }
    }
  },
  data() {
    return {
      showResetConfirmation: false,
      driveAxisMap: ["X", "Y", "Z", "E0", "E1"]
    };
  },
  methods: {
    ...mapMutations("machine/settings", ["update"]),
    ...mapMutations("machine/settings", ["resetTouchProbe"]),
    ...mapMutations("machine", ["setTouchProbeEnable"])
  }
};
</script>
