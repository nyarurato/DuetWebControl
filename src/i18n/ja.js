export default {
	language: '日本語',
	'$vuetify': {
		badge: 'バッジ',
		close: '閉じる',
		dataIterator: {
			noResultsText: '該当するレコードがありません',
			loadingText: '読込中',
		},
		dataTable: {
			itemsPerPageText: '1ページあたりの行:',
			ariaLabel: {
				sortDescending: '降順ソート',
				sortAscending: '昇順ソート',
				sortNone: 'ソートされていません.',
				activateNone: 'ソート解除',
				activateDescending: '降順ソート有効.',
				activateAscending: '昇順ソート有効.',
			},
			sortBy: 'Sort by',
		},
		dataFooter: {
			itemsPerPageText: '1ページあたりのアイテム:',
			itemsPerPageAll: 'All',
			nextPage: '次のページ',
			prevPage: '前のページ',
			firstPage: '最初のページ',
			lastPage: '最後のページ',
			pageText: '{0}-{1} of {2}',
		},
		datePicker: {
			itemsSelected: '{0} 選択',
		},
		noDataText: 'データがありません',
		carousel: {
			prev: 'Previous visual',
			next: 'Next visual',
			ariaLabel: {
				delimiter: 'Carousel slide {0} of {1}',
			},
		},
		calendar: {
			moreEvents: '{0} more',
		},
		fileInput: {
			counter: '{0} 個のファイル',
			counterSize: '{0} 個のファイル (全部で{1})',
		},
		timePicker: {
			am: 'AM',
			pm: 'PM',
		},
	},
	button: {
		add: {
			caption: '追加'
		},
		connect: {
			connect: '接続',
			connecting: '接続中...',
			disconnect: '切断',
			disconnecting: '切断中...'
		},
		emergencyStop: {
			caption: '緊急停止',
			title: 'ソフトリセットを実施 (M112+M999)'
		},
		home: {
			caption: 'ホーム {0}',
			captionAll: 'ホーム XYZ',
			title: 'ホーム {0} 軸 (G28 {0})',
			titleAll: 'ホーム All (G28)'
		},
		work: {
			caption: '{0}セット',
			captionAll: 'ワーク座標系（XYZ）セット',
			title: 'セットワーク座標系{0}軸',
			titleAll: 'ワーク座標系（XYZ）セット {0}'
		},
		workGoto: {
			captionAll: 'ワーク座標系原点へ移動',
			titleAll: 'ワーク座標系原点へ移動'
		},
		newDirectory: {
			caption: '新しいディレクトリ'
		},
		newFilament: {
			caption: '新しいフィラメント'
		},
		newFile: {
			caption: '新しいファイル'
		},
		refresh: {
			caption: 'リフレッシュ'
		},
		reset: {
			caption: '機械をリセット',
			title: 'M999を機械へ送信'
		},
		upload: {
			gcodes: {
				caption: 'Gコードファイル アップロード',
				title: '1つもしくは複数のG-Codeファイルをアップロード（ドラッグアンドドロップ可）'
			},
			start: {
				caption: 'アップロード&スタート',
				title: '1つもしくは複数のG-Codeファイルをアップロード＆スタート（ドラッグアンドドロップ可）'
			},
			macros: {
				caption: 'マクロファイル アップロード',
				title: '1つもしくは複数のマクロファイルをアップロード＆スタート（ドラッグアンドドロップ可）'
			},
			filaments: {
				caption: 'フィラメントconfig アップロード',
				title: '1つもしくは複数のフィラメントconfigをアップロード＆スタート（ドラッグアンドドロップ可）'
			},
			menu: {
				caption: 'メニューファイル アップロード',
				title: '1つもしくは複数のメニューファイルをアップロード＆スタート（ドラッグアンドドロップ可）'
			},
			system: {
				caption: 'システムファイル アップロード',
				title: '1つもしくは複数のシステムファイルをアップロード＆スタート（ドラッグアンドドロップ可）'
			},
			sys: {//for workbee control
				caption: 'システムファイル アップロード',
				title: '1つもしくは複数のシステムファイルをアップロード＆スタート（ドラッグアンドドロップ可）'
			},
			web: {
				caption: 'webファイル アップロード',
				title: '1つもしくは複数のwebファイルをアップロード＆スタート（ドラッグアンドドロップ可）'
			},
			update: {
				caption: 'アップデート アップロード',
				title: '1つもしくは複数のアップデートファイルをアップロード＆スタート（ドラッグアンドドロップ可）'
			}
		}
	},
	chart: {
		layer: {
			caption: 'レイヤーチャート',
			layerTime: 'Layer Time',

			showLastLayers: 'ラスト {0} レイヤー表示',
			showAllLayers: 'すべてのレイヤーを表示',

			layer: 'レイヤー {0}',
			layerDuration: 'レイヤー時間: {0}',
			layerHeight: 'レイヤー高さ: {0}',
			filamentUsage: 'フィラメント使用量: {0}',
			fractionPrinted: '進捗: {0}'
		},
		temperature: {
			caption: '温度チャート',
			heater: 'ヒーター {0}',
			noData: 'データなし'
		}
	},
	dialog: {
		changeMoveStep: {
			title: '移動量変更',
			prompt: 'クリックしたボタンに新しい値を入力してください:'
		},
		configUpdated: {
			title: 'ボードをリセットしますか？',
			prompt: '更新された設定を適用するためにボードを再起動しますか？'
		},
		connect: {
			title: 'マシンへ接続',
			prompt: '接続するマシンのホスト名とパスワードを入力してください:',
			hostPlaceholder: 'ホスト名',
			hostRequired: 'ホスト名が必要です',
			passwordPlaceholderOptional: 'パスワード (オプション)',
			passwordPlaceholder: 'パスワード',
			passwordRequired: 'パスワードが必要です',
			connect: '接続'
		},
		connection: {
			connecting: '接続中...',
			disconnecting: '切断中...',
			updating: 'アップデートがインストールされるまでお待ちください...',
			reconnecting: '接続が失われました、再接続を試みています...',
			standBy: 'お待ちください...'
		},
		editExtrusionAmount: {
			title: '押出し量の変更',
			prompt: 'クリックしたボタンに新しい量を入力してください:'
		},
		editExtrusionFeedrate: {
			title: '押出し速度の変更',
			prompt: 'クリックしたボタンに新しい量を入力してください:'
		},
		factoryReset: {
			title: 'ファクトリーリセットを行いますか？',
			prompt: '工場出荷時リセットを実行してもよろしいですか？保存された設定はすべて失われます'
		},
		filament: {
			titleChange: 'フィラメント変更',
			titleLoad: 'フィラメント読み込み',
			prompt: 'フィラメントを選択してください:'
		},
		fileEdit: {
			gcodeReference: 'G-Codeリファレンス',
			menuReference: 'メニューリファレンス',
			save: '保存',
			confirmClose: 'ファイルが変更されています。先に進むと、変更内容が失われます'
		},
		meshEdit: {
			title: 'メッシュパラメータをセット',
			radius: 'プローブ半径',
			spacing: 'Spacing',
			startCoordinate: 'スタート {0} 方向座標',
			endCoordinate: '終了 {0} 方向座標',
			spacingDirection: 'Spacing in {0} direction'
		},
		newDirectory: {
			title: '新しいディレクトリ',
			prompt: '新しいディレクトリ名を入力してください:'
		},
		newFilament: {
			title: '新しいフィラメント',
			prompt: '新しいフィラメント名を入力してください:'
		},
		newFile: {
			title: '新しいファイル',
			prompt: '新しいファイル名を入力してください:'
		},
		renameFile: {
			title: 'ファイルまたはディレクトリの名前を変更する',
			prompt: '新しい名前を入力してください:'
		},
		resetHeaterFault: {
			title: 'ヒーターフォルトをリセット',
			prompt: 'ヒーター{0}でヒーターフォルトが発生しました。続ける前に機械の電源を切り、配線をチェックすることを強くお勧めします。これが物理的な問題ではないと確信している場合は、**自己責任**でヒーターフォルトをリセットすることができます。これは**推奨されず**、さらなる問題を引き起こす可能性があることに注意してください。どうしますか？',
			resetFault: 'リセットフォルト'
		},
		runMacro: {
			title: '{0} 実行',
			prompt: '{0}を実行しますか？'
		},
		startJob: {
			title: '{0} スタート',
			prompt: '{0}をスタートしますか？'
		},
		update: {
			title: 'アップデートをインストールしますか？',
			prompt: '少なくとも1つのファームウェアアップデートがアップロードされています。今すぐインストールしますか？'
		},
		powerLossConfirm: {
			title: '再開しますか？',
			prompt: '再開しますか？'
		},
		powerLossSpindleConfirm: {
			title: 'ルーター・スピンドル オン？',
			prompt: 'ルーター・スピンドルが回転し、正しい回転数になっていることを確認してください。'
		},
		controlledPowerOffDialog: {
			message: '機械は一時停止しています．お待ちください．',
		},
		confirmPowerOffDialog: {
			message: '機械のスイッチを切ることができます'
		},
		confirmTouchProbeReset: {
			title: 'デフォルトに戻す',
			prompt: 'タッチプローブの設定をデフォルト値に戻しますか？'
		},
		confirmTouchProbe: {
			title: 'タッチプローブシーケンスの実行',
			prompt: 'タッチプローブクリップを取り付けた状態で、エンドミルがスタートホールの上にあることを確認してください。',
			promptZ: 'タッチプローブクリップを取り付けた状態で、エンドミルがタッチプローブより上にあることを確認してください。'

		},
		touchProbeSuccess: {
			title: '成功',
			prompt: 'プローブが完了しました．プローブを取り除いてください．'
		},
		inputRequired: '値を入力してください',
		numberRequired: '有効な番号を入力してください'
	},
	directory: {
		menu: 'Menu ディレクトリ',
		filaments: 'Filaments ディレクトリ',
		gcodes: 'G-Codes ディレクトリ',
		macros: 'Macros ディレクトリ',
		system: 'System ディレクトリ',
		sys: 'System ディレクトリ',//for workbee control
		web: 'WWW ディレクトリ'
	},
	error: {
		notImplemented: '{0}が実装されていません',
		invalidPassword: '無効なパスワードです！',
		noFreeSession: 'フリーなセッションがありません！',
		connect: '{0}への接続に失敗',
		disconnect: '{0}から正しく切断できませんでした',
		disconnected: '接続が終了したため、アクションを完了できませんでした',
		cancelled: 'オペレーションは中止されました',
		network: 'ネットワークエラー',
		timeout: 'HTTPリクエスト タイムアウト',
		driveUnmounted: 'ターゲットドライブがアンマウント',
		directoryNotFound: 'ディレクトリ {0} が見つかりません',
		fileNotFound: 'ファイル {0} が見つかりません',
		invalidHeightmap: '無効な高さマップ',
		operationFailed: 'オペレーション失敗 (原因: {0})',
		uploadStartWrongFileCount: '1つのファイルのみアップロード＆スタート可能',
		uploadNoSingleZIP: '一度にアップロードできるのは1つのZIPファイルのみ',
		uploadNoFiles: 'この ZIP には使用可能なファイルが含まれていません',
		uploadDecompressionFailed: 'ZIPファイルの解凍に失敗しました',
		codeResponse: '不適切な応答を受信したため、コードを実行できませんでした',
		codeBuffer: 'バッファスペースを使い果たしたため、コードを実行することができました',
		enterValidNumber: '有効な番号を入力してください',
		turnOffEverythingFailed: 'すべてをオフにするのに失敗しました',
		filelistRequestFailed: 'ファイルのリストの取得に失敗しました',
		fileinfoRequestFailed: '{0}のファイルの情報取得に失敗しました',
		filamentsLoadFailed: 'フィラメントの読み込みに失敗しました',
		move: '{0} から {1}への移動に失敗しました'
	},
	events: {
		connected: '{0}へ接続',
		connectionLost: '{0}の接続維持に失敗しました',
		emergencyStop: '緊急停止、再接続を試みます...',
		reconnecting: '接続中断、再接続を試みています...',
		reconnected: '接続確立',
		disconnected: '{0}から切断されました'
	},
	generic: {
		ok: 'OK',
		confirm: '確認',
		cancel: 'キャンセル',
		yes: 'Yes',
		no: 'No',
		close: '閉じる',
		reset: 'リセット',
		noValue: 'n/a',
		loading: '読み込み中',
		error: 'エラー',
		info: '情報',
		warning: '注意',
		success: '成功',
		heaterStates: {
			off: 'オフ',
			standby: 'スタンバイ',
			active: '有効',
			fault: '失敗',
			tuning: 'チューニング',
			offline: 'オフライン'
		},
		status: {
			updating: 'アップデート中',
			off: 'オフ',
			halted: '停止',
			pausing: '一時停止中',
			paused: '一時停止',
			resuming: '再開中',
			printing: 'プリント中',
			processing: '処理中',
			simulating: 'シミュレーション中',
			busy: 'ビジー',
			changingTool: '工具交換中',
			idle: 'アイドル',
			unknown: 'Unknown'
		},
		rpm: 'RPM',
		sdCard: 'SD Card {0}',
		mounted: 'マウントされています',
		notMounted: 'マウントされていません',
		extracting: '展開中',
		uploading: 'アップロード中',
		active: '有効',
		standby: 'スタンバイ'
	},
	input: {
		code: {
			send: '送信',
			placeholder: 'コード送信...'
		},
		addTemperature: '新しい温度の値',
		addRPM: '新しいプリセットの値'
	},
	jobProgress: {
		simulating: '{0} シミュレーション中, {1} 完了',
		simulated: '{0} シミュレーション, 100 % 完了',
		processing: '{0} 処理中, {1} 完了',
		processed: '{0} 処理, 100 % 完了',
		printing: '{0} 加工中, {1} 完了',
		printed: '{0} 加工, 100 % 完了',
		noJob: 'ジョブなし',
		layer: 'レイヤー {0} of {1}',
		filament: 'フィラメント使用量: {0}',
		filamentRemaining: '残り {0}',
		timeRemaining: '残り時間: {0}'
	},
	list: {
		baseFileList: {
			fileName: 'ファイル名',
			size: 'サイズ',
			lastModified: '最終変更',
			download: 'ダウンロード',
			edit: 'ファイル編集',
			rename: '名前変更',
			delete: '削除',
			downloadZIP: 'ZIPとしてダウンロード',
			noFiles: 'ファイルやディレクトリはありません',
			driveUnmounted: 'ドライブ アンマウント',
			goUp: 'Go up'
		},
		menu: {
			noFiles: 'No Display Files'
		},
		eventLog: {
			date: '日時',
			type: 'タイプ',
			message: 'イベント',
			noEvents: 'イベントなし',
			clear: 'クリア',
			downloadText: 'Textとして保存',
			downloadCSV: 'CSVとして保存'
		},
		filament: {
			noFilaments: 'フィラメントなし'
		},
		macro: {
			caption: 'マクロ',
			noMacros: 'マクロなし',
			run: 'マクロ実行',
			root: 'Root'
		},
		jobs: {
			height: 'オブジェクト高さ',
			layerHeight: 'レイヤー高さ',
			filament: 'フィラメント使用量',
			printTime: 'ジョブ時間',
			simulatedTime: 'シミュレーション時間',
			generatedBy: 'Generated by',

			noJobs: 'ジョブなし',
			start: 'スタート',
			simulate: 'シミュレーション'
		},
		system: {
			noFiles: 'システムファイルなし',
			configToolNote: 'コンフィグツールにて編集'
		},
		sys: {// for workbee control
			noFiles: 'システムファイルなし',
			configToolNote: 'コンフィグツールにて編集'
		}
	},
	menu: {
		control: {
			caption: '機械操作',
			dashboard: 'ダッシュボード',
			console: 'コンソール',
			heightmap: '高さマップ'
		},
		job: {
			caption: '現在のジョブ',
			status: 'ステータス',
			webcam: 'webカメラ',
			visualiser: 'ビジュアライザー'
		},
		files: {
			caption: 'ファイル管理',
			jobs: 'ジョブ',
			filaments: 'フィラメント',
			macros: 'マクロ',
			menu: 'ディスプレイ',
			system: 'システム',
			web: 'Web'
		},
		settings: {
			caption: '設定',
			general: '全般',
			machine: '機械固有',
			update: 'アップデート'
		}
	},
	notification: {
		compress: {
			title: 'ファイルの圧縮中...',
			message: 'ファイル圧縮中のためお待ちください...',
			errorTitle: 'ファイルの圧縮に失敗しました'
		},
		delete: {
			errorTitle: '{0}の削除に失敗しました',
			errorMessageDirectory: 'このディレクトリが空であることを確認してください',
			success: '{0}の削除に成功しました',
			successMultiple: '{0}個のファイルの削除に成功しました'
		},
		deleteFilament: {
			errorTitle: 'フィラメントの削除に失敗しました',
			errorStillLoaded: '選択されたフィラメントのうち少なくとも1つがまだロードされています。処理前にそれらをアンロードしてください',
			errorSubDirectories: 'フィラメント {0} にはサブディレクトリが含まれています。それらを手動で削除して、もう一度試してみてください。'
		},
		download: {
			title: 'ダウンロード中 {0} @ {1}, {2}% 完了',
			message: 'ファイルがダウンロードされるまでお待ちください...',
			success: '{1}にて，{0}のダウンロードに成功',
			successMulti: '{0}個のファイルのダウンロードに成功しました ',
			error: '{0}のダウンロードに失敗しました'
		},
		message: 'メッセージ',
		mount: {
			successTitle: 'SDカード マウント',
			errorTitle: 'SDカードのマウントに失敗'
		},
		newDirectory: {
			errorTitle: 'ディレクトリの作成に失敗しました',
			successTitle: 'ディレクトリを作成しました',
			successMessage: 'ディレクトリの作成に成功 {0}'
		},
		newFilament: {
			errorTitle: 'フィラメントの作成に失敗',
			errorTitleMacros: 'フィラメント マクロの作成に失敗',
			successTitle: 'フィラメント作成',
			successMessage: '{0}のフィラメントを作成しました'
		},
		rename: {
			success: '{0} から {1}への名前変更に成功しました',
			error: '{0} から {1}への名前を変更に失敗しました',
		},
		renameFilament: {
			errorTitle: 'フィラメントの名前を変更に失敗しました',
			errorStillLoaded: 'このフィラメントはまだロードされています。先に進む前にロードを解除してください'
		},
		responseTooLong: 'レスポンスが長すぎます、コンソールを参照してください',
		upload: {
			title: 'アップロード中 {0} @ {1}, {2}% 完了',
			message: 'ファイルがアップロードされるまでお待ちください...',
			success: '{1}の後，{0}のアップロードに成功',
			successMulti: '{0}個のファイルをアップロードに成功しました',
			error: '{0}のアップロードに失敗しました'
		}
	},
	panel: {
		atx: {
			caption: 'ATX電源',
			on: 'オン',
			off: 'オフ'
		},
		babystepping: {
			caption: 'Z軸オフセット',
			current: '現在のオフセット量: {0}'
		},
		extrude: {
			caption: '押出し制御',
			mix: 'ミックス',
			mixRatio: 'ミックス比率:',
			amount: 'フィード量 {0}:',
			feedrate: 'フィードレート {0}:',
			retract: '引き込み',
			extrude: '押出し'
		},
		extrusionFactors: {
			caption: '押出し ファクター',
			changeVisibility: 'Change Visibility',
			extruder: 'エクストルーダー {0}',
			noExtruders: 'エクストルーダー'
		},
		fan: {
			caption: 'ファン制御',
			selection: 'ファン選択:',
			toolFan: '工具ファン',
			fan: 'ファン {0}'
		},
		fans: {
			caption: 'ファン',
			changeVisibility: 'Change Visibility',
			toolFan: '工具ファン',
			fan: 'ファン {0}',
			noFans: 'ファンなし'
		},
		heightmap: {
			scale: 'スケール:',
			orMore: '以上',
			orLess: '以下',
			axes: '軸:',
			notAvailable: '高さマップが利用できません',
			numPoints: '点数: {0}',
			radius: 'プロービング半径: {0}',
			area: 'プローブ エリア: {0}',
			maxDeviations: '最大偏差: {0} / {1}',
			meanError: '平均誤差: {0}',
			rmsError: 'RMS誤差: {0}',
			topView: 'Top view',
			colorScheme: '配色:',
			terrain: 'Terrain',
			heat: 'Heat',
			reload: '高さマップリロード'
		},
		jobControl: {
			caption: 'ジョブ制御',
			cancelJob: 'ジョブキャンセル',
			cancelPrint: 'プリントキャンセル',
			cancelSimulation: 'シミュレーションキャンセル',
			pauseJob: 'ジョブ停止',
			pausePrint: 'プリント停止',
			pauseSimulation: 'シミュレーション停止',
			resumeJob: 'ジョブ再開',
			resumePrint: 'プリント再開',
			resumeSimulation: 'シミュレーション再開',
			repeatJob: '再スタート',
			repeatPrint: '再プリント',
			repeatSimulation: '再シミュレーション',
			autoSleep: 'End G-Code有効',
			powerLossResume: 'Power Loss再開',
			controlledPowerOff: '制御電源オフ',
			captionPowerLoss: 'Power Loss ジョブ制御'
		},
		jobData: {
			caption: '取得データ',
			warmUpDuration: 'ウォームアップ時間',
			currentLayerTime: '現在のレイヤーの時間',
			lastLayerTime: 'ラストレイヤーの時間',
			jobDuration: 'ジョブ時間'
		},
		jobEstimations: {
			caption: 'Estimations based on',
			filament: 'フィラメント使用量',
			file: 'File Progress',
			layer: 'Layer Time',
			slicer: 'スライサー',
			simulation: 'シミュレーション'
		},
		jobInfo: {
			caption: 'ジョブ情報',
			height: '高さ:',
			layerHeight: 'Layer Height:',
			filament: 'フィラメント使用量:',
			generatedBy: 'Generated by:'
		},
		movement: {
			caption: '機械の動作',
			compensation: '補正＆キャリブレーション',
			runBed: 'ベッド レベリング(G32)',
			runDelta: 'デルタ型 キャリブレーション (G32)',
			compensationInUse: '使用中の補正: {0}',
			disableBedCompensation: 'Bed Compensation無効化 (M561)',
			disableMeshCompensation: 'Mesh Compensation無効化 (G29 S2)',
			editMesh: 'Mesh Compensationのエリアを定義 (M557)',
			runMesh: 'Mesh Compensationを実行 (G29)',
			loadMesh: 'SDカードから高さマップをロード(G29 S1)',
			axesNotHomed: '以下の軸はホームにありません:',
			noAxes: 'No Axes',
			workSelect: '選択されたワーク座標系',
			workSelectHint: 'ワーク座標系の選択'
		},
		settingsAbout: {
			caption: 'About',
			developedBy: 'Original Duet Web Interface developed by',
			modifiedBy: 'Modified to WorkBee Control by',
			for: 'for',
			licensedUnder: 'Licensed under the terms of the'
		},
		settingsAppearance: {
			caption: '外観',
			darkTheme: 'ダークテーマ',
			language: '言語',
			binaryFileSizes: 'バイナリファイルのサイズを使用する',
			binaryFileSizesTitle: 'ファイルサイズは、1000(SI)ではなく1024(IEC)を基準に表示されます',
			disableAutoComplete: '自動補完を無効にする',
			disableAutoCompleteTitle: 'コードまたは温度入力時にオートコンプリートリストを表示しない'
		},
		settingsCommunication: {
			caption: '通信',
			pingInterval: 'アイドル時のPING間隔 (ms)',
			ajaxRetries: 'AJAXの最大再試行回数',
			updateInterval: 'Updateインターバル({0})',
			extendedUpdateEvery: 'Extendedステータス更新間隔',
			fileTransferRetryThreshold: 'ファイル転送の再試行しきい値 ({0})',
			crcUploads: 'アップロードにCRC32チェックサムを使用',
			unavailable: '利用可能な設定がありません'
		},
		settingsElectronics: {
			caption: 'エレクトロニクス',
			diagnostics: '診断',
			board: 'ボード: {0}',
			firmware: 'ファームウェア: {0} ({1})',
			dwsFirmware: 'Duet WiFi Server Version: {0}',
			updateNote: 'Note: システムページからアップデートのインストールができます。'
		},
		settingsEndstops: {
			caption: 'エンドストップ',
			index: 'Index',
			triggered: 'Triggered'
		},
		settingsGeneral: {
			caption: '全般',
			factoryReset: '工場出荷時に戻す',
			settingsStorageLocal: 'ローカルストレージに設定を保存',
			settingsSaveDelay: '設定変更時の更新ディレイ ({0})',
			cacheStorageLocal: 'ローカルストレージにキャッシュを保存',
			cacheSaveDelay: 'キャッシュ変更時の更新ディレイ ({0})'
		},
		settingsListItems: {
			caption: 'リスト項目',
			toolTemperatures: '工具温度',
			bedTemperatures: 'ベッド温度',
			chamberTemperatures: 'チャンバー温度',
			spindleRPM: 'スピンドル回転数(RPM)'
		},
		settingsMachine: {
			caption: '機械固有',
			revertDWC: 'DWC1に戻す',
			babystepAmount: 'Babystep amount ({0})',
			moveFeedrate: 'Feedrate for move buttons ({0})',
		},
		settingsNotifications: {
			caption: '通知',
			notificationErrorsPersistent: 'エラーメッセージを自動的に閉じない',
			notificationTimeout: '通知タイムアウトのデフォルト値 ({0})'
		},
		settingsWebcam: {
			caption: 'ウェブカメラ',
			webcamURL: 'ウェブカメラ URL (optional)',
			webcamUpdateInterval: 'ウェブカメラの更新間隔 ({0})',
			webcamLiveURL: 'ウェブカメラ画像がクリックされたときに開くURL (optional)',
			webcamFix: '画像をリロードする際に、HTTP修飾子を追加しないようにする',
			webcamEmbedded: 'iframeにウェブカメラの画像を埋め込む',
			webcamRotation: 'ウェブカメラの画像を回転する',
			webcamFlip: 'ウェブカメラの画像を反転する',
			flipNone: 'None',
			flipX: 'X反転',
			flipY: 'Y反転',
			flipBoth: 'XY両方反転'
		},
		settingsTouchProbe: {
			caption: 'タッチプローブ設定',
			touchProbeEnableCaption: 'タッチプローブを有効にする',
			touchProbeEndstopNumberCaption: 'エンドストップ番号',
			touchProbeFeedRateCaption: 'Feedrate (mm/min)',
			touchProbeXDimensionCaption: 'X Dimension (mm)',
			touchProbeYDimensionCaption: 'Y Dimension (mm)',
			touchProbeZDimensionCaption: 'Z Dimension (mm)',
			touchProbeXOffsetCaption: 'X-Axis Offset (mm)',
			touchProbeYOffsetCaption: 'Y-Axis Offset (mm)',
			touchProbeZOffsetCaption: 'Z-Axis Offset (mm)',
			touchProbeRevert: 'デフォルトに戻す',
			touchProbeTriggerCaption: 'タッチプローブのトリガーレベル',
			touchProbeActiveHigh: 'Active High',
			touchProbeActiveLow: 'Active Low',
			touchProbeType: 'タッチプローブ タイプ',
			touchProbeXYZ: 'XYZ タッチプローブ',
			touchProbeZ: 'Z タッチプローブ',
		},
		speedFactor: {
			caption: 'スピード ファクター'
		},
		status: {
			caption: 'ステータス',
			mode: 'モード: {0}',
			toolPosition: '工具位置',
			machinePosition: 'ワーク座標系位置',
			nativePosition: '機械座標系位置',
			extruders: 'エクストルーダー',
			extruderDrive: 'Drive {0}',
			speeds: 'スピード',
			requestedSpeed: '要求スピード',
			topSpeed: 'Top Speed',
			sensors: 'センサー',
			mcuTemp: 'MCU温度',
			minMax: '最小: {0}, 最大: {1}',
			vIn: 'Vin',
			v12: 'V12',
			fanRPM: 'ファン RPM',
			probe: 'Z-Probe|Z-Probes',
			noStatus: 'No Status'
		},
		positionPanel: {
			caption: '位置 & スピード',
			mode: 'モード: {0}',
			toolPosition: '工具位置',
			machinePosition: 'ワーク座標系位置',
			nativePosition: '機械座標系位置',
			extruders: 'エクストルーダー',
			extruderDrive: 'Drive {0}',
			speeds: 'スピード',
			requestedSpeed: '要求スピード',
			topSpeed: 'Top Speed',
			sensors: 'センサー',
			mcuTemp: 'MCU温度',
			mcuTempTitle: '最小: {0}, 最大: {1}',
			vIn: 'Vin',
			vInTitle: '最小: {0}, 最大: {1}',
			fanRPM: 'ファン RPM',
			probe: 'Z-Probe|Z-Probes',
			noStatus: 'No Status'
		},
		sensor: {
			caption: 'センサー',
			mode: 'モード: {0}',
			toolPosition: '工具位置',
			machinePosition: 'ワーク座標系位置',
			extruders: 'エクストルーダー',
			extruderDrive: 'Drive {0}',
			speeds: 'スピード',
			requestedSpeed: '要求スピード',
			topSpeed: 'Top Speed',
			sensors: 'センサー',
			mcuTemp: 'MCU温度',
			mcuTempTitle: '最小: {0}, 最大: {1}',
			vIn: 'Vin',
			vInTitle: '最小: {0}, 最大 {1}',
			fanRPM: 'ファン RPM',
			probe: 'Z-Probe|Z-Probes',
			noStatus: 'No Status',
			endstopStatus: 'エンドストップ ステータス',
			endstopTriggered: 'Triggered',
			endstopNotTriggered: 'Not Triggered'
		},
		tools: {
			caption: '工具',
			controlAll: 'すべて制御',
			turnEverythingOff: 'すべて電源オフ',
			allActiveTemperatures: 'すべてのアクティブ温度を設定',
			allStandbyTemperatures: 'すべてのスタンバイ温度を設定',
			tool: '工具 {0}',
			loadFilament: 'フィラメントをロード',
			changeFilament: 'フィラメントを交換',
			unloadFilament: 'フィラメントをアンロード',
			heater: 'ヒーター {0}',
			current: '現在',
			active: 'アクティブ',
			standby: 'スタンバイ',
			bed: 'ベッド {0}',
			chamber: 'チャンバー {0}',
			extra: {
				caption: 'Extra',
				sensor: 'センサー',
				sensorIndex: 'センサー {0}',
				value: '値',
				showInChart: 'チャートにて表示',
				noItems: 'No Extra Sensors'
			},
			noTools: '工具なし'
		},
		touchProbePanel: {
			caption: 'タッチプローブ制御',
			endmillDiameter: 'エンドミル直径 (mm)',
			probeAxisCaption: 'プローブ各軸',
			probeXTitle: 'プローブ X 軸',
			probeXCaption: 'X',
			probeYTitle: 'プローブ Y 軸',
			probeYCaption: 'Y',
			probeZTitle: 'プローブ Z 軸',
			probeZCaption: 'Z',
			probeCornerTitle: 'プローブ コーナー',
			probeCornerCaption: 'プローブ コーナー',
			probeLocation: 'プローブ位置',
			probeLocationFrontLeft: '正面 左 コーナー',
			probeLocationFrontRight: '正面 右 コーナー',
			probeLocationBackLeft: '背面 左 コーナー',
			probeLocationBackRight: '背面 右 コーナー',
		},
		webcam: {
			caption: 'ウェブカメラ監視',
			alt: '(webcam image)'
		}
	}
}
