<template>
	<div>
	<v-card>
		<v-card-title class="pb-1">
			<v-icon small class="mr-1">build</v-icon> {{ $t('panel.jobControl.caption') }}
		</v-card-title>

		<v-card-text class="pt-0">
			<code-btn color="warning" block :disabled="uiFrozen || !state.isPrinting" :code="this.isPaused ? 'M24' : 'M25'" tabindex="0">
				<v-icon class="mr-1">{{ isPaused ? "play_arrow" : "pause" }}</v-icon> {{ pauseResumeText }}
			</code-btn>

			<code-btn v-if="isPaused" color="error" block code="M0 H1">
				<v-icon class="mr-1">stop</v-icon> {{ cancelText }}
			</code-btn>

			<code-btn v-if="!state.isPrinting && processAnotherCode" color="success" block :code="processAnotherCode">
				<v-icon class="mr-1">refresh</v-icon> {{ processAnotherText }}
			</code-btn>

			<v-switch :label="$t('panel.jobControl.autoSleep')" v-model="autoSleepActive" :disabled="uiFrozen" hide-details></v-switch>

			<v-flex v-if="!isPaused">
			<v-icon  small class="mr-1 mt-4">power</v-icon> {{ $t('panel.jobControl.captionPowerLoss') }}
			</v-flex>

			<v-btn v-if="!state.isPrinting" color="success" block :disabled="uiFrozen" @click="showPowerLossConfirm = true">
				<v-icon class="mr-1">play_arrow</v-icon> {{ $t('panel.jobControl.powerLossResume') }}
			</v-btn>

			<code-btn v-if="state.isPrinting && !isPaused" color="error" block :disabled="uiFrozen" v-on:click.native="showIsPausing = true" :code="'M25'">
				<v-icon class="mr-1">power</v-icon> {{ $t('panel.jobControl.controlledPowerOff') }}
			</code-btn>

		</v-card-text>
	</v-card>
	
	<confirm-dialog :shown.sync="showPowerLossConfirm" :question="$t('dialog.powerLossConfirm.title')" :prompt="$t('dialog.powerLossConfirm.prompt')" @confirmed="powerLossConfirm"></confirm-dialog>
	<confirm-dialog :shown.sync="showPowerLossSpindleConfirm" :question="$t('dialog.powerLossSpindleConfirm.title')" :prompt="$t('dialog.powerLossSpindleConfirm.prompt')" @confirmed="powerLossSpindleConfirm"></confirm-dialog>
	<confirmed-power-off-dialog :shown.sync="showIsPaused" :message="$t('dialog.confirmPowerOffDialog.message')" @dismissed="showIsPausing = false"></confirmed-power-off-dialog>
	<controlled-power-off-dialog :shown.sync="showIsPausing"></controlled-power-off-dialog>
	</div>
</template>

<script>
'use strict'

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
	
	computed: {
		...mapGetters(['uiFrozen']),
		...mapState('machine', ['autoSleep']),
		...mapState('machine/model', ['job', 'state']),
		...mapState("machine/model", ["move"]),
		...mapGetters('machine/model', ['isPaused']),
		autoSleepActive: {
			get() { return this.autoSleep; },
			set(value) { this.setAutoSleep(value) }
		},
		pauseResumeText() {
			if (this.state.isSimulating) {
				return this.$t(this.isPaused ? 'panel.jobControl.resumeSimulation' : 'panel.jobControl.pauseSimulation');
			}
			if (this.state.mode === 'FFF') {
				return this.$t(this.isPaused ? 'panel.jobControl.resumePrint' : 'panel.jobControl.pausePrint');
			}
			return this.$t(this.isPaused ? 'panel.jobControl.resumeJob' : 'panel.jobControl.pauseJob');
		},
		cancelText() {
			if (this.state.isSimulating) {
				return this.$t('panel.jobControl.cancelSimulation');
			}
			if (this.state.mode === 'FFF') {
				return this.$t('panel.jobControl.cancelPrint');
			}
			return this.$t('panel.jobControl.cancelJob');
		},
		processAnotherCode() {
			if (this.job.lastFileName) {
				if (this.job.lastFileSimulated) {
					return `M37 P"${this.job.lastFileName}"`;
				}
				return `M32 "${this.job.lastFileName}"`;
			}
			return undefined;
		},
		processAnotherText() {
			if (this.job.lastFileSimulated) {
				return this.$t('panel.jobControl.repeatSimulation');
			}
			if (this.state.mode === 'FFF') {
				return this.$t('panel.jobControl.repeatPrint');
			}
			return this.$t('panel.jobControl.repeatJob');
		},
		showIsPaused: function() {
				return ((this.move.currentMove.requestedSpeed == 0) && (this.showIsPausing))? true : false;
		},
	},
	data() {
		return {
			showPowerLossConfirm: false,
			showPowerLossSpindleConfirm: false,
			showIsPausing: false,
		}
	},
	methods: { 
		...mapMutations('machine', ['setAutoSleep']),
		...mapActions('machine', ['sendCode']),
		powerLossConfirm(){
			this.showPowerLossSpindleConfirm = true;
		},
		powerLossSpindleConfirm(){
			this.sendCode(`M916`);
		},
	}
}
</script>
