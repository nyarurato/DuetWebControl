<template>
	<v-layout column>
		<v-flex>
			<job-progress></job-progress>
		</v-flex>

		<v-flex>
			<v-layout row wrap full-height>
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
