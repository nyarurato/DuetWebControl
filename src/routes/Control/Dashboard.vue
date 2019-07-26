<template>
	<v-layout column>
		<v-flex>
			<job-progress></job-progress>
		</v-flex>

		<v-flex>
			<v-layout row wrap full-height>
				<v-flex order-sm2 order-md1 md3 xl2>
					<v-layout row wrap align-center>
						<v-flex xs7 sm6 md12>
							<job-control-panel></job-control-panel>
						</v-flex>
					</v-layout>
				</v-flex>
				<v-flex order-sm1 order-md2 md6 xl7 d-flex>
					<v-layout column>
						<v-flex xs5 sm6 md12>
							<babystepping-panel></babystepping-panel>
						</v-flex>
					</v-layout>
				</v-flex>
				<v-flex order-sm3 order-md3 md3 xl3>
					<v-layout column>
						<v-flex>
							<speed-factor-panel></speed-factor-panel>
						</v-flex>
					</v-layout>
				</v-flex>
			</v-layout>
		</v-flex>
	</v-layout>
</template>
