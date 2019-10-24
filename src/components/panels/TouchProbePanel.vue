<template>
  <div>
    <v-card>
      <v-card-title class="pb-0 mb-0">
        <v-layout row justify-space-between>
          <v-flex lg8 md8 sm7 xs7>
            <v-icon small class="mr-1">gps_fixed</v-icon>
            {{ $t('panel.touchProbePanel.caption') }}
          </v-flex>
          <v-flex lg4 md4 sm5 xs5>
            <v-select
              :disabled="state.isPrinting || uiFrozen || !XYZProbe"
              persistent-hint
              :hint="$t('panel.touchProbePanel.probeLocation')"
              single-line
              class="ma-0 pa-0"
              v-model="locationSelect"
              :items="locationItems"
            ></v-select>
          </v-flex>
        </v-layout>
      </v-card-title>
      <v-card-text class="pt-2 pb-2 mt-0">
        <v-layout row wrap justify-space-between>
          <v-flex
            xs12
            sm12
            md3
            lg3
            xl3
            order-xl0
            order-lg0
            order-md0
            order-sm0
            order-xs0
            class="pt-2"
          >
            <v-text-field
              :disabled="uiFrozen || state.isPrinting || !XYZProbe"
              v-model.number="endmillDiameter"
              type="number"
              step="0.01"
              min="0.01"
              :label="$t('panel.touchProbePanel.endmillDiameter')"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md9 lg9 xl9 :class="{'pl-5': $vuetify.breakpoint.mdAndUp}">
            <v-layout column>
              <v-layout row wrap>
                <v-flex xs12 sm12 md6 lg6 xl6 justify-center>
                  
                </v-flex>
                <v-flex xs12 sm12 md6 lg6 xl6 justify-center hidden-sm-and-down>
                  <div
                    class="text-xs-center text-sm-center text-md-center text-lg-center text-xl-center"
                  >
                    <v-icon small class="mr-1">mdi-axis-arrow</v-icon>
                    {{ $t('panel.touchProbePanel.probeAxisCaption') }}
                  </div>
                </v-flex>
              </v-layout>

              <v-layout row wrap>
                <v-flex xs12 sm12 md6 lg6 xl6 :class="{'pr-5': $vuetify.breakpoint.mdAndUp, 'pt-0': $vuetify.breakpoint.smAndDown, }">
                  <v-btn
                    :disabled="uiFrozen || state.isPrinting || !XYZProbe"
                    :title="$t('panel.touchProbePanel.probeCornerTitle')"
                    color="success"
                    block
                    @click.native="cornerProbeClick"
                  >
                    {{ $t('panel.touchProbePanel.probeCornerCaption') }}
                  </v-btn>
                </v-flex>
                 <v-flex xs12 sm12 md6 lg6 xl6 justify-center hidden-md-and-up class="pt-3">
                  <div
                    class="text-xs-center text-sm-center text-md-center text-lg-center text-xl-center"
                  >
                    <v-icon small class="mr-1">mdi-axis-arrow</v-icon>
                    {{ $t('panel.touchProbePanel.probeAxisCaption') }}
                  </div>
                </v-flex>
                <v-flex xs4 sm4 md2 lg2 xl2 >
                  <v-btn
                    :disabled="uiFrozen || state.isPrinting || !XYZProbe"
                    :title="$t('panel.touchProbePanel.probeXTitle')"
                    color="success"
                    block
                    @click.native="xProbeClick"
                    
                  >
                    <v-icon class="mr-1">mdi-arrow-right</v-icon>
                    {{ $t('panel.touchProbePanel.probeXCaption') }}
                  </v-btn>
                </v-flex>
                <v-flex xs4 sm4 md2 lg2 xl2 >
                  <v-btn
                    :disabled="uiFrozen || state.isPrinting || !XYZProbe"
                    :title="$t('panel.touchProbePanel.probeYTitle')"
                    color="success"
                    block
                    @click.native="yProbeClick"
                  >
                    <v-icon class="mr-1">mdi-arrow-up</v-icon>
                    {{ $t('panel.touchProbePanel.probeYCaption') }}
                  </v-btn>
                </v-flex>
                <v-flex xs4 sm4 md2 lg2 xl2 >
                  <v-btn
                    :disabled="uiFrozen || state.isPrinting"
                    :title="$t('panel.touchProbePanel.probeZTitle')"
                    color="success"
                    block
                    @click.native="zProbeClick"
                  >
                    <v-icon class="mr-1">mdi-arrow-down</v-icon>
                    {{ $t('panel.touchProbePanel.probeZCaption') }}
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
    <confirm-dialog
      :shown.sync="showTouchProbeConfirm"
      :question="$t('dialog.confirmTouchProbe.title')"
      :prompt="$t('dialog.confirmTouchProbe.prompt')"
      @confirmed="runProbeCode"
    ></confirm-dialog>
  </div>
</template>

<script>
"use strict";

import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("machine", ["settings"]),
    ...mapState("machine/model", ["job", "state"]),
    ...mapGetters(["uiFrozen"]),

    locationItems() {
      return [
        {
          text: this.$t("panel.touchProbePanel.probeLocationFrontLeft"),
          value: 'FL'
        },
        {
          text: this.$t("panel.touchProbePanel.probeLocationFrontRight"),
          value: 'FR'
        },
        {
          text: this.$t("panel.touchProbePanel.probeLocationBackLeft"),
          value: 'BL'
        },
        {
          text: this.$t("panel.touchProbePanel.probeLocationBackRight"),
          value: 'BR'
        }
      ];
    },
    locationSelect: {
      get() {
        return this.settings.touchProbe.touchProbeLocation;
      },
      set(value) {
        this.update({ touchProbe: { touchProbeLocation: value } });
      }
    },
    endmillDiameter: {
      get() {
        return this.settings.touchProbe.touchProbeEndmillDiameter;
      },
      set(value) {
        this.update({ touchProbe: { touchProbeEndmillDiameter: value } });
      }
    },
    XYZProbe() {
      if (this.settings.touchProbe.touchProbeType == 0){
        return true
      }else{
        return false
      }
    }

  },
  data() {
    return {
      showTouchProbeConfirm: false,
      probeSequence: null,
      xDirection: 1,
      yDirection: 1,
      xProbeDirection: 0,
      yProbeDirection: 0,
      probeCodeStart: null,
      probeCodeMain1: null,
      probeCodeMain2: null,
      probeCodeMain3: null,
      probeCodeEnd: null,
    };
  },
  methods: {
    ...mapMutations("machine/settings", ["update"]),
    ...mapActions('machine', ["sendCode"]),
    xProbeClick() {
      this.setCornerDirection();
      this.probeSequence = 'x';
      this.probeCodeStart = `G91\nM563 P999 S"XYZ-Probe"\nM581 T0 ${this.settings.touchProbe.touchProbeEndstopAxis} S${this.settings.touchProbe.touchProbeTriggerType}`
      this.probeCodeMain1 = `G1 Z5 F${this.settings.touchProbe.touchProbeFeedrate}\nG1 X${(((this.settings.touchProbe.touchProbeXDimension/2)-this.settings.touchProbe.touchProbeXOffset)*this.xDirection)} Y${(((this.settings.touchProbe.touchProbeYDimension/2)-this.settings.touchProbe.touchProbeYOffset)*this.yDirection)} F${this.settings.touchProbe.touchProbeFeedrate}\nG1 X${(((this.settings.touchProbe.touchProbeXDimension/2)+5+(this.settings.touchProbe.touchProbeEndmillDiameter/2))*this.xDirection*(-1))} F${this.settings.touchProbe.touchProbeFeedrate}\nG1 Z${(-5-(this.settings.touchProbe.touchProbeZDimension/2))} F${this.settings.touchProbe.touchProbeFeedrate}\nM581 T0 S-1\nT999\nM585 X10 E${this.settings.touchProbe.touchProbeEndstopDriveNumber} L${this.settings.touchProbe.touchProbeTriggerType} F${this.settings.touchProbe.touchProbeFeedrate} S${this.xProbeDirection}\nG10 L20 X${((this.settings.touchProbe.touchProbeXOffset)+(this.settings.touchProbe.touchProbeEndmillDiameter/2))*-1*this.xDirection}\nG1 X${-5*this.xDirection} F${this.settings.touchProbe.touchProbeFeedrate}\nG91\nG1 Z${5+(this.settings.touchProbe.touchProbeZDimension/2)} F${this.settings.touchProbe.touchProbeFeedrate}\nM500\nM581 T0 ${this.settings.touchProbe.touchProbeEndstopAxis} S${this.settings.touchProbe.touchProbeTriggerType}\nG1 Y${(((this.settings.touchProbe.touchProbeYDimension/2)-this.settings.touchProbe.touchProbeYOffset)*this.yDirection*-1)} F${this.settings.touchProbe.touchProbeFeedrate}\nG90\nG1 X0 F${this.settings.touchProbe.touchProbeFeedrate}`;
      this.probeCodeMain2 = null,
      this.probeCodeMain3 = null,
      this.probeCodeEnd = `M581 T0 S-1\nT0M563 P999 D-1 H-1\nM291 P"${$t("dialog.touchProbeSuccess.prompt")}" R"${$t("dialog.touchProbeSuccess.title")}" S1`
      this.showTouchProbeConfirm = true;
    },
    yProbeClick() {
      this.probeSequence = 'y';
      this.probeCodeStart = `G91\nM563 P999 S"XYZ-Probe"\nM581 T0 ${this.settings.touchProbe.touchProbeEndstopAxis} S${this.settings.touchProbe.touchProbeTriggerType}`
      this.probeCodeMain1 = `G1 Z5 F${this.settings.touchProbe.touchProbeFeedrate}\nG1 X${(((this.settings.touchProbe.touchProbeXDimension/2)-this.settings.touchProbe.touchProbeXOffset)*this.xDirection)} Y${(((this.settings.touchProbe.touchProbeYDimension/2)-this.settings.touchProbe.touchProbeYOffset)*this.yDirection)} F${this.settings.touchProbe.touchProbeFeedrate}\nG1 Y${(((this.settings.touchProbe.touchProbeYDimension/2)+5+(this.settings.touchProbe.touchProbeEndmillDiameter/2))*this.yDirection*(-1))} F${this.settings.touchProbe.touchProbeFeedrate}\nG1 Z${(-5-(this.settings.touchProbe.touchProbeZDimension/2))} F${this.settings.touchProbe.touchProbeFeedrate}\nM581 T0 S-1\nT999\nM585 Y10 E${this.settings.touchProbe.touchProbeEndstopDriveNumber} L${this.settings.touchProbe.touchProbeTriggerType} F${this.settings.touchProbe.touchProbeFeedrate} S${this.yProbeDirection}\nG10 L20 Y${((this.settings.touchProbe.touchProbeYOffset)+(this.settings.touchProbe.touchProbeEndmillDiameter/2))*-1*this.yDirection}\nG1 X${-5*this.yDirection} F${this.settings.touchProbe.touchProbeFeedrate}\nG91\nG1 Z${5+(this.settings.touchProbe.touchProbeZDimension/2)} F${this.settings.touchProbe.touchProbeFeedrate}\nM500\nM581 T0 ${this.settings.touchProbe.touchProbeEndstopAxis} S${this.settings.touchProbe.touchProbeTriggerType}\nG1 X${(((this.settings.touchProbe.touchProbeXDimension/2)-this.settings.touchProbe.touchProbeXOffset)*this.xDirection*-1)} F${this.settings.touchProbe.touchProbeFeedrate}\nG90\nG1 Y0 F${this.settings.touchProbe.touchProbeFeedrate}`;
      this.probeCodeMain2 = null,
      this.probeCodeMain3 = null,
      this.probeCodeEnd = `M581 T0 S-1\nT0M563 P999 D-1 H-1\nM291 P"${$t("dialog.touchProbeSuccess.prompt")}" R"${$t("dialog.touchProbeSuccess.title")}" S1`
      this.showTouchProbeConfirm = true;
    },
    zProbeClick() {
      probeStartPosition = this.move.drives[2].position;
      this.probeSequence = 'z';
      this.probeCodeStart = `G91\nM563 P999 S"XYZ-Probe"`
      this.probeCodeMain1 = `T999\nM585 Z${(settings.touchProbe.touchProbeZDimension-settings.touchProbe.touchProbeZOffset)+10} E${this.settings.touchProbe.touchProbeEndstopDriveNumber} L${this.settings.touchProbe.touchProbeTriggerType} F${this.settings.touchProbe.touchProbeFeedrate} S1\nG10 L20 Z${this.settings.touchProbe.touchProbeZOffset}\nG1 Z5 F${this.settings.touchProbe.touchProbeFeedrate}\nM500\nG90`;
      this.probeCodeMain2 = null,
      this.probeCodeMain3 = null,
      this.probeCodeEnd = `M581 T0 S-1\nT0M563 P999 D-1 H-1\nM291 P"${$t("dialog.touchProbeSuccess.prompt")}" R"${$t("dialog.touchProbeSuccess.title")}" S1`
      this.showTouchProbeConfirm = true;
    },
    cornerProbeClick() {
      this.probeSequence = 'corner';
      this.probeCodeStart = `G91\nM563 P999 S"XYZ-Probe"\nM581 T0 ${this.settings.touchProbe.touchProbeEndstopAxis} S${this.settings.touchProbe.touchProbeTriggerType}`
      this.probeCodeMain1 = `G1 Z5 F${this.settings.touchProbe.touchProbeFeedrate}\nG1 X${(((this.settings.touchProbe.touchProbeXDimension/2)-this.settings.touchProbe.touchProbeXOffset)*this.xDirection)} Y${(((this.settings.touchProbe.touchProbeYDimension/2)-this.settings.touchProbe.touchProbeYOffset)*this.yDirection)} F${this.settings.touchProbe.touchProbeFeedrate}\nM581 T0 S-1\nT999\nM585 Z10 E${this.settings.touchProbe.touchProbeEndstopDriveNumber} L${this.settings.touchProbe.touchProbeTriggerType} F${this.settings.touchProbe.touchProbeFeedrate} S1\nG10 L20 Z${this.settings.touchProbe.touchProbeZOffset}\nG1 Z5 F${this.settings.touchProbe.touchProbeFeedrate}\nM581 T0 ${this.settings.touchProbe.touchProbeEndstopAxis} S${this.settings.touchProbe.touchProbeTriggerType}\nG91`;
      this.probeCodeMain2 = `G1 X${(((this.settings.touchProbe.touchProbeXDimension/2)+5+(this.settings.touchProbe.touchProbeEndmillDiameter/2))*this.xDirection*(-1))} F${this.settings.touchProbe.touchProbeFeedrate}\nG1 Z${(-5-(this.settings.touchProbe.touchProbeZDimension/2))} F${this.settings.touchProbe.touchProbeFeedrate}\nM581 T0 S-1\nT999\nM585 X10 E${this.settings.touchProbe.touchProbeEndstopDriveNumber} L${this.settings.touchProbe.touchProbeTriggerType} F${this.settings.touchProbe.touchProbeFeedrate} S${this.xProbeDirection}\nG10 L20 X${((this.settings.touchProbe.touchProbeXOffset)+(this.settings.touchProbe.touchProbeEndmillDiameter/2))*-1*this.xDirection}\nG1 X${-5*this.xDirection} F${this.settings.touchProbe.touchProbeFeedrate}\nG91\nG1 Z${5+(this.settings.touchProbe.touchProbeZDimension/2)} F${this.settings.touchProbe.touchProbeFeedrate}\nM500\nM581 T0 ${this.settings.touchProbe.touchProbeEndstopAxis} S${this.settings.touchProbe.touchProbeTriggerType}\nG1 Y${(((this.settings.touchProbe.touchProbeYDimension/2)-this.settings.touchProbe.touchProbeYOffset)*this.yDirection*-1)} F${this.settings.touchProbe.touchProbeFeedrate}\nG90\nG1 X0 F${this.settings.touchProbe.touchProbeFeedrate}\nG91`
      this.probeCodeMain3 = `G1 X${(((this.settings.touchProbe.touchProbeXDimension/2)-this.settings.touchProbe.touchProbeXOffset)*this.xDirection)} Y${(((this.settings.touchProbe.touchProbeYDimension/2)-this.settings.touchProbe.touchProbeYOffset)*this.yDirection)} F${this.settings.touchProbe.touchProbeFeedrate}\nG1 Y${(((this.settings.touchProbe.touchProbeYDimension/2)+5+(this.settings.touchProbe.touchProbeEndmillDiameter/2))*this.yDirection*(-1))} F${this.settings.touchProbe.touchProbeFeedrate}\nG1 Z${(-5-(this.settings.touchProbe.touchProbeZDimension/2))} F${this.settings.touchProbe.touchProbeFeedrate}\nM581 T0 S-1\nT999\nM585 Y10 E${this.settings.touchProbe.touchProbeEndstopDriveNumber} L${this.settings.touchProbe.touchProbeTriggerType} F${this.settings.touchProbe.touchProbeFeedrate} S${this.yProbeDirection}\nG10 L20 Y${((this.settings.touchProbe.touchProbeYOffset)+(this.settings.touchProbe.touchProbeEndmillDiameter/2))*-1*this.yDirection}\nG1 X${-5*this.yDirection} F${this.settings.touchProbe.touchProbeFeedrate}\nG91\nG1 Z${5+(this.settings.touchProbe.touchProbeZDimension/2)} F${this.settings.touchProbe.touchProbeFeedrate}\nM500\nM581 T0 ${this.settings.touchProbe.touchProbeEndstopAxis} S${this.settings.touchProbe.touchProbeTriggerType}\nG1 X${(((this.settings.touchProbe.touchProbeXDimension/2)-this.settings.touchProbe.touchProbeXOffset)*this.xDirection*-1)} F${this.settings.touchProbe.touchProbeFeedrate}\nG90\nG1 X0 Y0 Z${this.settings.touchProbe.touchProbeXOffset+5} F${this.settings.touchProbe.touchProbeFeedrate}`;
      this.probeCodeEnd = `M581 T0 S-1\nT0M563 P999 D-1 H-1\nM291 P"${$t("dialog.touchProbeSuccess.prompt")}" R"${$t("dialog.touchProbeSuccess.title")}" S1`
      this.showTouchProbeConfirm = true;
    },
    async runProbeCode() {
      await this.sendCode( this.probeCodeStart);
      await this.sendCode( this.probeCodeMain1);
      await this.sendCode( this.probeCodeMain2);
      await this.sendCode( this.probeCodeMain3);
      await this.sendCode( this.probeCodeEnd);
    },
    setCornerDirection() {
      if (this.settings.touchProbe.touchProbeLocation == 'FR' || this.settings.touchProbe.touchProbeLocation == 'BR'){
        this.xDirection = -1;
        this.xProbeDirection = 1;
      }else{
        this.xDirection = 1;
        this.xProbeDirection = 0;
      }
      if (this.settings.touchProbe.touchProbeLocation == 'BL' || this.settings.touchProbe.touchProbeLocation == 'BR'){
        this.yDirection = -1;
        this.yProbeDirection = 1;
      }else{
        this.yDirection = 1;
        this.yProbeDirection = 0;
      }
    }
  }
};
</script>
