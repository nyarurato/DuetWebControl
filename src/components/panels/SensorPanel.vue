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
</style>

<template>
	<v-card>
		<v-card-title class="py-2">
			<v-icon small class="mr-1">info</v-icon> {{ $t('panel.sensor.caption') }}

			<v-spacer></v-spacer>

			<sensor-label v-if="this.state.sensor"></sensor-label>

			<v-spacer></v-spacer>

			<span v-if="state.mode">{{ $t('panel.sensor.mode', [state.mode]) }}</span>
		</v-card-title>

		<v-card-text class="px-0 pt-0 pb-2 content text-xs-center" v-show="sensorsPresent || (move.axes.length + move.extruders.length)">
			<v-layout column class="content-layout">
				
				<!-- Temperature Sensors -->

				<v-flex v-show="sensorsPresent">
					<v-layout row align-center>

						<v-flex>
							<v-layout row wrap>
								<v-flex v-if="electronics.vIn.current !== null">
									<v-layout column>
										<v-flex tag="strong">
											{{ $t('panel.sensor.vIn') }}
										</v-flex>

										<v-tooltip bottom>
											<template slot="activator">
												<v-flex tag="span">
													{{ $display(electronics.vIn.current, 1, 'V') }}
												</v-flex>
											</template>

											<span>
												{{ $t('panel.sensor.vInTitle', [$display(electronics.vIn.min, 1, 'V'), $display(electronics.vIn.max, 1, 'V')]) }}
											</span>
										</v-tooltip>
									</v-layout>
								</v-flex>

								<v-flex v-if="electronics.mcuTemp.current !== null">
									<v-layout column>
										<v-flex tag="strong">
											{{ $t('panel.sensor.mcuTemp') }}
										</v-flex>

										<v-tooltip bottom>
											<template slot="activator">
												<v-flex tag="span">
													{{ $display(electronics.mcuTemp.current, 1, 'C') }}
												</v-flex>
											</template>

											<span>
												{{ $t('panel.sensor.mcuTempTitle', [$display(electronics.mcuTemp.min, 1, 'C'), $display(electronics.mcuTemp.max, 1, 'C')]) }}
											</span>
										</v-tooltip>
									</v-layout>
								</v-flex>


								
							</v-layout>
						</v-flex>


					</v-layout>
				</v-flex>

				<!-- Endstops -->

				<v-divider class="mx-5 my-3"></v-divider>

				<v-flex v-show="move.axes.length">
					<v-layout row align-center>
						<v-flex tag="strong" class="category-header">
								{{ $t('panel.sensor.endstopStatus') }}
						</v-flex>

						<v-flex>
							<v-layout row wrap>
								<v-flex v-for="(axis, index) in move.axes" :key="index" grow class="equal-width">
									<v-layout column>
										<v-flex v-if="axis.visible" tag="strong">
											{{ axis.letter }}
										</v-flex>
										<v-flex v-if="axis.visible" tag="span">
											{{ displayEndstopStatus(index) }}
										</v-flex>
									</v-layout>
								</v-flex>
							</v-layout>
						</v-flex>
					</v-layout>
				</v-flex>

			</v-layout>
		</v-card-text>
	</v-card>
</template>

<script>
'use strict'

import { mapState, mapGetters } from 'vuex'

export default {
	computed: {
		...mapState('settings', ['darkTheme']),
		...mapGetters(['isConnected']),
		...mapState('machine/model', ['electronics', 'fans', 'move', 'sensors', 'state']),
		fanRPM() {
			const rpms = [];
			this.fans.forEach(fan => { if (fan.rpm != null) { rpms.push(fan.rpm); } });
			return rpms;
		},
		sensorsPresent() {
			return (this.electronics.vIn.current !== null) || (this.electronics.mcuTemp.current !== null) || this.fanRPM.length || (this.sensors.probes.length);
		}
	},
	data() {
		return {
			displayToolPosition: true
		}
	},
	methods: {
		displayAxisPosition(axis, index) {
			const position = this.displayToolPosition ? this.move.drives[index].position : axis.machinePosition;
			return (axis.letter === 'Z') ? this.$displayZ(position, false) : this.$display(position, 1);
		},
		displayAxisNativePosition(axis, index) {
      const position = axis.nativePosition;
      return axis.letter === "Z"
        ? this.$displayZ(position, false)
        : this.$display(position, 1);
	},
	displayEndstopStatus(index) {
      return (this.sensors.endstops[index].triggered)? this.$t('panel.sensor.endstopTriggered') : this.$t('panel.sensor.endstopNotTriggered');
    },
		probeSpanClasses(probe, index) {
			let result = [];
			if (index && this.sensors.probes.length > 1){
				result.push('ml-2');
			}
			if (!this.state.isPrinting && probe.value !== null) {
				if (probe.value >= probe.threshold) {
					result.push('red');
					result.push(this.darkTheme ? 'darken-3' : 'lighten-4');
				} else if (probe.value > probe.threshold * 0.9) {
					result.push('orange');
					result.push(this.darkTheme ? 'darken-2' : 'lighten-4');
				}
			}
			return result;
		}
	}
}
</script>
