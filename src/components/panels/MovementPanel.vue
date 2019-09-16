<style>
.move-btn {
  padding-left: 0;
  padding-right: 0;
  min-width: 0;
}

.center-menu-item > div {
  justify-content: center;
}
</style>

<template>
  <v-card>
    <v-card-title class="pt-2 pb-0 ma-0">
      <v-layout row justify-space-between >
        <v-flex lg10 md10 sm9 xs8>
          <v-icon small class="mr-1">swap_horiz</v-icon>
          {{ $t('panel.movement.caption') }}
        </v-flex>
        <v-flex lg2 md2 sm3 xs4>
              <v-select :disabled="state.isPrinting" persistent-hint :hint="$t('panel.movement.workSelectHint')" single-line class="ma-0 pa-0" v-model="workSelect" :items="workItems"></v-select>
        </v-flex>
      </v-layout>
    </v-card-title>

    <v-card-text class="pt-0 pb-2 mt-0">
      <!-- Mobile Buttons -->
      <!-- Mobile Compensation Button -->
      <v-flex grow class="hidden-md-and-up">
        <v-menu full-width offset-y :disabled="uiFrozen" v-tab-control>
          <template slot="activator">
            <v-btn block color="primary" class="mx-0" :disabled="uiFrozen">
              {{ $t('panel.movement.compensation') }}
              <v-icon>arrow_drop_down</v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-list>
              <template v-if="move.compensation">
                <v-list-tile
                  class="center-menu-item"
                >{{ $t('panel.movement.compensationInUse', [move.compensation]) }}</v-list-tile>

                <v-divider></v-divider>
              </template>

              <v-list-tile @click="sendCode('G32')">
                <v-icon class="mr-1">view_module</v-icon>
                {{ $t(move.geometry.type === 'delta' ? 'panel.movement.runDelta' : 'panel.movement.runBed') }}
              </v-list-tile>
              <v-list-tile
                :disabled="!move.compensation || move.compensation.indexOf('Point') === -1"
                @click="sendCode('M561')"
              >
                <v-icon class="mr-1">clear</v-icon>
                {{ $t('panel.movement.disableBedCompensation') }}
              </v-list-tile>

              <v-divider></v-divider>

              <v-list-tile @click="sendCode('G29')">
                <v-icon class="mr-1">grid_on</v-icon>
                {{ $t('panel.movement.runMesh') }}
              </v-list-tile>
              <v-list-tile @click="showMeshEditDialog = true">
                <v-icon class="mr-1">edit</v-icon>
                {{ $t('panel.movement.editMesh') }}
              </v-list-tile>
              <v-list-tile @click="sendCode('G29 S1')">
                <v-icon class="mr-1">save</v-icon>
                {{ $t('panel.movement.loadMesh') }}
              </v-list-tile>
              <v-list-tile :disabled="move.compensation !== 'Mesh'" @click="sendCode('G29 S2')">
                <v-icon class="mr-1">grid_off</v-icon>
                {{ $t('panel.movement.disableMeshCompensation') }}
              </v-list-tile>
            </v-list>
          </v-card>
        </v-menu>
      </v-flex>
      <v-layout justify-center row wrap class="hidden-md-and-up">
        <v-layout column>
          <!-- Mobile Home All Button -->
          <v-flex>
            <code-btn
              color="primary"
              code="G28"
              :title="$t('button.home.titleAll')"
              block
            >{{ $t('button.home.captionAll') }}</code-btn>
          </v-flex>
          <!-- Mobile Set All Button -->
          <v-flex>
            <code-btn
              block
              :disabled="state.isPrinting"
              color="primary"
              :code="`G10 P${move.currentWorkplace} L20 X0 Y0 Z0\nM500`"
              :title="$t('button.work.titleAll',[move.currentWorkplace])"
            >{{ $t('button.work.captionAll') }}</code-btn>
          </v-flex>
        </v-layout>
        <v-layout column>
          <!-- Mobile Home Axis Buttons -->
          <v-layout justify-center row wrap class="hidden-md-and-up">
            <v-flex shrink class="px-1"></v-flex>
            <v-flex v-for="axis in displayedAxes" :key="axis.letter">
              <code-btn
                :color="axis.homed ? 'primary' : 'warning'"
                :disabled="uiFrozen"
                :title="$t('button.home.title', [axis.letter])"
                :code="`G28 ${axis.letter}`"
                block
              >{{ $t('button.home.caption', [axis.letter]) }}</code-btn>
            </v-flex>
          </v-layout>
          <!-- Mobile Set Axis Buttons -->
          <v-layout justify-center row wrap class="hidden-md-and-up">
            <v-flex shrink class="px-1"></v-flex>
            <v-flex v-for="axis in displayedAxes" :key="axis.letter">
              <code-btn
                block
                color="primary"
                :disabled="uiFrozen || state.isPrinting"
                :title="$t('button.work.title', [axis.letter, move.currentWorkplace])"
                :code="`G10 P${move.currentWorkplace} L20 ${axis.letter}0\nM500`"
                class="mr-0"
              >{{ $t('button.work.caption', [axis.letter]) }}</code-btn>
            </v-flex>
          </v-layout>
        </v-layout>
      </v-layout>

      <!-- Regular Buttons -->
      <v-layout row>
        <!-- Regular home buttons -->
        <v-flex shrink class="hidden-sm-and-down">
          <v-layout column>
            <v-flex>
              <code-btn
                block
                color="primary"
                code="G28"
                :title="$t('button.home.titleAll')"
                class="ml-0 hidden-sm-and-down"
              >{{ $t('button.home.captionAll') }}</code-btn>
            </v-flex>
            <v-flex shrink class="hidden-sm-and-down">
              <v-layout column>
                <v-flex v-for="axis in displayedAxes" :key="axis.letter">
                  <code-btn
                    block
                    :color="axis.homed ? 'primary' : 'warning'"
                    :disabled="uiFrozen"
                    :title="$t('button.home.title', [axis.letter])"
                    :code="`G28 ${axis.letter}`"
                    class="ml-0"
                  >{{ $t('button.home.caption', [axis.letter]) }}</code-btn>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>

        <!-- Spacer -->
        <v-flex shrink class="hidden-sm-and-down px-1"></v-flex>

        <!-- Centre Section -->
        <v-flex grow>
          <v-layout column>
            <!-- Regular Compensation Button -->
            <v-flex grow class="hidden-sm-and-down">
              <v-menu full-width offset-y :disabled="uiFrozen" v-tab-control>
                <template slot="activator">
                  <v-btn block color="primary" class="mx-0" :disabled="uiFrozen">
                    {{ $t('panel.movement.compensation') }}
                    <v-icon>arrow_drop_down</v-icon>
                  </v-btn>
                </template>

                <v-card>
                  <v-list>
                    <template v-if="move.compensation">
                      <v-list-tile
                        class="center-menu-item"
                      >{{ $t('panel.movement.compensationInUse', [move.compensation]) }}</v-list-tile>

                      <v-divider></v-divider>
                    </template>

                    <v-list-tile @click="sendCode('G32')">
                      <v-icon class="mr-1">view_module</v-icon>
                      {{ $t(move.geometry.type === 'delta' ? 'panel.movement.runDelta' : 'panel.movement.runBed') }}
                    </v-list-tile>
                    <v-list-tile
                      :disabled="!move.compensation || move.compensation.indexOf('Point') === -1"
                      @click="sendCode('M561')"
                    >
                      <v-icon class="mr-1">clear</v-icon>
                      {{ $t('panel.movement.disableBedCompensation') }}
                    </v-list-tile>

                    <v-divider></v-divider>

                    <v-list-tile @click="sendCode('G29')">
                      <v-icon class="mr-1">grid_on</v-icon>
                      {{ $t('panel.movement.runMesh') }}
                    </v-list-tile>
                    <v-list-tile @click="showMeshEditDialog = true">
                      <v-icon class="mr-1">edit</v-icon>
                      {{ $t('panel.movement.editMesh') }}
                    </v-list-tile>
                    <v-list-tile @click="sendCode('G29 S1')">
                      <v-icon class="mr-1">save</v-icon>
                      {{ $t('panel.movement.loadMesh') }}
                    </v-list-tile>
                    <v-list-tile
                      :disabled="move.compensation !== 'Mesh'"
                      @click="sendCode('G29 S2')"
                    >
                      <v-icon class="mr-1">grid_off</v-icon>
                      {{ $t('panel.movement.disableMeshCompensation') }}
                    </v-list-tile>
                  </v-list>
                </v-card>
              </v-menu>
            </v-flex>

            <!-- Jog Controls -->
            <v-layout row wrap>
              <!-- Decreasing movements -->
              <v-flex>
                <v-layout row>
                  <!-- Decreasing movements -->
                  <v-flex
                    v-for="index in numMoveSteps"
                    :key="-index"
                    :class="getMoveCellClass(index - 1)"
                  >
                    <v-layout column>
                      <v-flex v-for="axis in displayedAxes" :key="axis.letter" class="mr-2">
                        <code-btn
                          :code="`M120\nG91\nG1 ${axis.letter}${-moveSteps(axis.letter)[index - 1]} F${Math.round(moveFeedrate * 60)}\nG90\nM121`"
                          no-wait
                          @contextmenu.prevent="showMoveStepDialog(axis.letter, index - 1)"
                          block
                          class="move-btn"
                        >
                          <v-icon>keyboard_arrow_left</v-icon>
                          {{ axis.letter + -moveSteps(axis.letter)[index - 1] }}
                        </code-btn>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-flex>

              <!-- Spacer -->
              <v-flex shrink class="hidden-sm-and-down px-1"></v-flex>

              <!-- Increasing movements -->
              <v-flex>
                <v-layout row>
                  <v-flex
                    v-for="index in numMoveSteps"
                    :key="index"
                    :class="getMoveCellClass(numMoveSteps - index)"
                  >
                    <v-layout column>
                      <v-flex v-for="axis in displayedAxes" :key="axis.letter" class="ml-2">
                        <code-btn
                          :code="`M120\nG91\nG1 ${axis.letter}${moveSteps(axis.letter)[numMoveSteps - index]} F${Math.round(moveFeedrate * 60)}\nG90\nM121`"
                          no-wait
                          @contextmenu.prevent="showMoveStepDialog(axis.letter, numMoveSteps - index)"
                          block
                          class="move-btn"
                        >
                          {{ axis.letter + '+' + moveSteps(axis.letter)[numMoveSteps - index] }}
                          <v-icon>keyboard_arrow_right</v-icon>
                        </code-btn>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-layout>
        </v-flex>

        <v-flex shrink class="hidden-sm-and-down px-1"></v-flex>

        <!-- Regular Set Work buttons -->
        <v-flex shrink class="hidden-sm-and-down">
          <v-layout column>
            <v-flex>
              <code-btn
                block
                :disabled="state.isPrinting"
                color="primary"
                :code="`G10 P${move.currentWorkplace} L20 X0 Y0 Z0\nM500`"
                :title="$t('button.work.titleAll',[move.currentWorkplace])"
                class="mr-0 hidden-sm-and-down"
              >{{ $t('button.work.captionAll') }}</code-btn>
            </v-flex>
            <v-flex grow v-for="axis in displayedAxes" :key="axis.letter">
              <code-btn
                block
                color="primary"
                :disabled="uiFrozen || state.isPrinting"
                :title="$t('button.work.title', [axis.letter, move.currentWorkplace])"
                :code="`G10 P${move.currentWorkplace} L20 ${axis.letter}0\nM500`"
                class="mr-0"
              >{{ $t('button.work.caption', [axis.letter]) }}</code-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>

      <!-- Regular Goto Work button -->
      <v-layout row>
        <v-flex>
          <v-btn
            block
            color="primary"
            @click.native="runFile"
            :title="$t('button.workGoto.titleAll', [move.currentWorkplace])"
            class="hidden-sm-and-down"
          >{{ $t('button.workGoto.captionAll') }}</v-btn>
        </v-flex>
      </v-layout>

      <!-- Mobile Goto Work button -->
      <v-layout row wrap>
        <v-flex class="hidden-md-and-up">
          <v-btn
            block
            color="primary"
            @click.native="runFile"
            :title="$t('button.workGoto.titleAll')"
          >{{ $t('button.workGoto.captionAll') }}</v-btn>
        </v-flex>
      </v-layout>
    </v-card-text>

    <mesh-edit-dialog :shown.sync="showMeshEditDialog"></mesh-edit-dialog>
    <input-dialog
      :shown.sync="moveStepDialog.shown"
      :title="$t('dialog.changeMoveStep.title')"
      :prompt="$t('dialog.changeMoveStep.prompt')"
      :preset="moveStepDialog.preset"
      is-numeric-value
      @confirmed="moveStepDialogConfirmed"
    ></input-dialog>

    <v-alert v-if="unhomedAxes.length" :value="true" type="warning">
      {{ $tc('panel.movement.axesNotHomed', unhomedAxes.length) }}
      <strong>{{ unhomedAxes.map(axis => axis.letter).reduce((a, b) => `${a}, ${b}`) }}</strong>
    </v-alert>

    <v-alert :value="!move.axes.length" type="info">{{ $t('panel.movement.noAxes') }}</v-alert>
  </v-card>
</template>

<script>
"use strict";

import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters(["isConnected", "uiFrozen"]),
    ...mapState("machine/model", ["move"]),
    ...mapState('machine/model', ['job', 'state']),
    ...mapState("machine/settings", ["moveFeedrate"]),
    ...mapGetters("machine/settings", ["moveSteps", "numMoveSteps"]),
    ...mapState(["settings"]),
    displayedAxes() {
      return this.move.axes.filter(axis => axis.visible);
    },
    unhomedAxes() {
      return this.move.axes.filter(axis => axis.visible && !axis.homed);
    },
    workItems() {
      return [
        { text: "1", value: 1 },
        { text: "2", value: 2 },
        { text: "3", value: 3 },
        { text: "4", value: 4 },
        { text: "5", value: 5 },
        { text: "6", value: 6 },
        { text: "7", value: 7 },
        { text: "8", value: 8 },
        { text: "9", value: 9 }
      ];
    },
    workSelect: {
      get() {
        return this.move.currentWorkplace;
      },
      set(value) {
        this.sendCode(this.updateWorkCoordinateCommands[value - 1]);
      }
    }
  },
  data() {
    return {
      dropdownShown: false,
      showMeshEditDialog: false,
      moveStepDialog: {
        shown: false,
        axis: "X",
        index: 0,
        preset: 0
      },
      updateWorkCoordinateCommands: [
        `G54`,
        `G55`,
        `G56`,
        `G57`,
        `G58`,
        `G59`,
        `G59.1`,
        `G59.2`,
        `G59.3`
      ]
    };
  },
  methods: {
    ...mapActions("machine", ["sendCode"]),
    ...mapMutations("machine/settings", ["setMoveStep"]),
    ...mapMutations("settings", ["update"]),
    ...mapActions("machine", ["sendCode"]),
    getMoveCellClass(index) {
      let classes = "";
      if (index === 0 || index === 5) {
        classes += "hidden-lg-and-down";
      }
      if (index > 1 && index < 4 && index % 2 === 1) {
        classes += "hidden-md-and-down";
      }
      return classes;
    },
    showMoveStepDialog(axis, index) {
      this.moveStepDialog.axis = axis;
      this.moveStepDialog.index = index;
      this.moveStepDialog.preset = this.moveSteps(this.moveStepDialog.axis)[
        this.moveStepDialog.index
      ];
      this.moveStepDialog.shown = true;
    },
    moveStepDialogConfirmed(value) {
      this.setMoveStep({
        axis: this.moveStepDialog.axis,
        index: this.moveStepDialog.index,
        value
      });
    },
    runFile() {
			this.sendCode(`M98 P"workzero.g"`);
		}
  },
  watch: {
    isConnected() {
      // Hide dialogs when the connection is interrupted
      this.showMeshEditDialog = false;
      this.moveStepDialog.shown = false;
    }
  }
};
</script>
