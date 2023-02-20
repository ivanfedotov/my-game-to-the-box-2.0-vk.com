


const scriptsInEvents = {

	async Actions_Event36_Act1(runtime, localVars)
	{
		runtime.objects.TextHi.getFirstInstance().opacity = 0;
		
		// INIT YaGames
		YaGames.init().then(ysdk => {
			// Fullscreen Adv
			ysdk.adv.showFullscreenAdv();
		
			// Player
			var player;
			function initPlayer() {
				return ysdk.getPlayer().then(_player => {
					player = _player;
					console.log("player - OK");
					console.log(player);
					return player;
				});
			}
			initPlayer()
			.then(_player => {
				if (_player.getMode() === 'lite') {
					console.log("[ON START] getMode is lite");
				} else {
					console.log("[ON START] getMode is not lite");
					runtime.objects.TextLogin.getFirstInstance().opacity = 0;
					runtime.objects.Login.getFirstInstance().opacity = 0;
				}
			})
			.catch(err => {
				console.log("[ON START] Ошибка при инициализации объекта Player");
			});
		
		
			// INIT Leaderboard
			var lb;
			ysdk.getLeaderboards()
				.then(_lb => lb = _lb);
		
			// Place info 
			ysdk.getLeaderboards()
				.then(lb => lb.getLeaderboardPlayerEntry(
					runtime.globalVars.YANDEX_BOARD
				))
				.then(res => {
				console.log(res);
				runtime.globalVars.YANDEX_RANK = res.rank; 
				runtime.globalVars.YANDEX_TIME = res.score; 
				runtime.globalVars.YANDEX_TIME_FORMAT = res.formattedScore; 
				runtime.globalVars.YANDEX_RANG = res.extraData; 
				console.log(
					runtime.globalVars.YANDEX_RANK + ' ' + 
					runtime.globalVars.YANDEX_TIME + ' ' + 
					runtime.globalVars.YANDEX_TIME_FORMAT + ' ' + 
					runtime.globalVars.YANDEX_RANG
				);
				runtime.objects.TextHi.getFirstInstance().opacity = 1;
			})
			.catch(err => {
				if (err.code === 'LEADERBOARD_PLAYER_NOT_PRESENT') {
					console.log("У игрока нет записи в лидерборде");
					runtime.objects.TextHi.getFirstInstance().opacity = 0;
				}
			});
		
		});
	},

	async Actions_Event37_Act5(runtime, localVars)
	{
		// Инициализация
		vkBridge.send("VKWebAppInit", {});
		
		// Проверка к готовности рекламы к показу "interstitial"
		vkBridge.send('VKWebAppCheckNativeAds', { ad_format: 'interstitial'})
			.then((data) => {
				if (data.result)
					console.log('[interstitial] Рекламные материалы найдены.');
				else
					console.log('[interstitial] Рекламные материалы НЕ найдены.');
			 })
			.catch((error) => { console.log(error); });
		
		// Проверка готовности рекламы "reward"
		vkBridge.send('VKWebAppCheckNativeAds', { ad_format: 'reward' })
			.then((data) => {
				if (data.result)
					console.log('[reward] Рекламные материалы найдены.');
				else
					console.log('[reward] Рекламные материалы НЕ найдены.');
			})
			.catch((error) => { console.log(error); });
	},

	async Actions_Event40_Act2(runtime, localVars)
	{
		if (runtime.globalVars.STORE == "YaGames") {
		
			console.log("TRY AUTH");
		
			// INIT YaGames
			YaGames.init().then(ysdk => {
		
				// Player
				var player;
				function initPlayer() {
					return ysdk.getPlayer().then(_player => {
						player = _player;
						console.log("player - OK");
						console.log(player);
						return player;
					});
				}
				initPlayer()
				.then(_player => {
					if (_player.getMode() === 'lite') {
						console.log("(1) Игрок не авторизован.");
						ysdk.auth.openAuthDialog().then(() => {
							console.log("(2) Игрок успешно авторизован");
		
							runtime.objects.TextLogin.getFirstInstance().opacity = 0;
							runtime.objects.Login.getFirstInstance().opacity = 0;
		
							// INIT Leaderboard
							var lb;
							ysdk.getLeaderboards()
								.then(_lb => lb = _lb);
		
							// Place info 
							ysdk.getLeaderboards()
								.then(lb => lb.getLeaderboardPlayerEntry(
									runtime.globalVars.YANDEX_BOARD
								))
								.then(res => {
								console.log(res);
								runtime.globalVars.YANDEX_RANK = res.rank; 
								runtime.globalVars.YANDEX_TIME = res.score; 
								runtime.globalVars.YANDEX_TIME_FORMAT = res.formattedScore; 
								runtime.globalVars.YANDEX_RANG = res.extraData; 
								console.log(
									runtime.globalVars.YANDEX_RANK + ' ' + 
									runtime.globalVars.YANDEX_TIME + ' ' + 
									runtime.globalVars.YANDEX_TIME_FORMAT + ' ' + 
									runtime.globalVars.YANDEX_RANG
								);
								runtime.objects.TextHi.getFirstInstance().opacity = 1;
							})
								.catch(err => {
								if (err.code === 'LEADERBOARD_PLAYER_NOT_PRESENT') {
									console.log("У игрока нет записи в лидерборде");
									runtime.objects.TextHi.getFirstInstance().opacity = 0;
								}
							});
		
							initPlayer().catch(err => {
								console.log("(3) Ошибка при инициализации объекта Player.");
							});
						})
						.catch(() => {
							console.log("(4) Игрок не авторизован");
						});
					} else {
						console.log("(5) getMode is not lite");
						runtime.objects.TextHi.getFirstInstance().opacity = 1;
					}
				})
					.catch(err => {
					console.log("(6) Ошибка при инициализации объекта Player");
				});
		
			});
		
		}
	},

	async Actions_Event44_Act1(runtime, localVars)
	{
		YaGames.init().then(ysdk => {
		
			// INIT Leaderboard
			var lb;
			ysdk.getLeaderboards()
				.then(_lb => lb = _lb);
		
			// Send score
			if ((runtime.globalVars.FINISHTIME < runtime.globalVars.YANDEX_TIME) || (runtime.globalVars.YANDEX_TIME == "")) 
			{
				console.log(runtime.globalVars.FINISHTIME + " " + runtime.globalVars.YANDEX_TIME);
		
				ysdk.getLeaderboards()
					.then(lb => {
					lb.setLeaderboardScore(
						runtime.globalVars.YANDEX_BOARD, 
						runtime.globalVars.FINISHTIME, 
						runtime.globalVars.RANG
					);
		
					console.log(
						runtime.globalVars.YANDEX_BOARD + ' ' +
						runtime.globalVars.FINISHTIME + ' ' + 
						runtime.globalVars.RANG
					);
				});
			}
		
			// Place info 
			ysdk.getLeaderboards()
				.then(lb => lb.getLeaderboardPlayerEntry(
				runtime.globalVars.YANDEX_BOARD
			))
				.then(res => {
		
				console.log(res);
				runtime.globalVars.YANDEX_RANK = res.rank; 
				runtime.globalVars.YANDEX_TIME = res.score; 
				runtime.globalVars.YANDEX_TIME_FORMAT = res.formattedScore; 
				runtime.globalVars.YANDEX_RANG = res.extraData; 
				console.log(
					runtime.globalVars.YANDEX_RANK + ' ' + 
					runtime.globalVars.YANDEX_TIME + ' ' + 
					runtime.globalVars.YANDEX_TIME_FORMAT + ' ' + 
					runtime.globalVars.YANDEX_RANG
				);
		
				//runtime.objects.TextRankYandex.getFirstInstance().opacity = 1;
			})
				.catch(err => {
				if (err.code === 'LEADERBOARD_PLAYER_NOT_PRESENT') {
					console.log("У игрока нет записи в лидерборде");
					//runtime.objects.TextRankYandex.getFirstInstance().opacity = 0;
				}
			});
		
		});
	},

	async Actions_Event48_Act1(runtime, localVars)
	{
		// Показать рекламу
		vkBridge.send('VKWebAppShowNativeAds', { ad_format: 'interstitial' })
		  .then((data) => {
		    if (data.result)
		      console.log('Реклама показана');
		    else
		      console.log('Ошибка при показе');
		  })
		  .catch((error) => { console.log(error); });
	},

	async Actions_Event50_Act1(runtime, localVars)
	{
		runtime.objects.Player.getFirstInstance().colorRgb = runtime.globalVars.COLOR.split(',');
	},

	async Actions_Event51_Act1(runtime, localVars)
	{
		runtime.globalVars.COLOR = runtime.objects.ColorGreen.getFirstInstance().colorRgb;
	},

	async Actions_Event52_Act1(runtime, localVars)
	{
		runtime.globalVars.COLOR = runtime.objects.ColorPink.getFirstInstance().colorRgb;
	},

	async Actions_Event53_Act1(runtime, localVars)
	{
		runtime.globalVars.COLOR = runtime.objects.ColorWhite.getFirstInstance().colorRgb;
	},

	async Actions_Event54_Act1(runtime, localVars)
	{
		runtime.globalVars.COLOR = runtime.objects.ColorBlack.getFirstInstance().colorRgb;
	},

	async Actions_Event55_Act1(runtime, localVars)
	{
		runtime.globalVars.COLOR = runtime.objects.ColorYellow.getFirstInstance().colorRgb;
	},

	async Actions_Event56_Act1(runtime, localVars)
	{
		runtime.globalVars.COLOR = runtime.objects.ColorPurple.getFirstInstance().colorRgb;
	},

	async Actions_Event58_Act1(runtime, localVars)
	{
		// INIT YaGames
		YaGames.init().then(ysdk => {
			// Rewarded Video
			ysdk.adv.showRewardedVideo({
				callbacks: {
					onOpen: () => {
						console.log('Video ad open.');
					},
					onRewarded: () => {
						console.log('Rewarded!');
						runtime.objects.Player.getFirstInstance().colorRgb = runtime.globalVars.COLOR.split(',');
		
					},
					onClose: () => {
						console.log('Video ad closed.');
					}, 
					onError: (e) => {
						console.log('Error while open video ad:', e);
					}
				}
			})
		});
	},

	async Actions_Event59_Act1(runtime, localVars)
	{
		// Показать рекламу
		vkBridge.send('VKWebAppShowNativeAds', { ad_format: 'reward' })
			.then((data) => {
			if (data.result) {
				runtime.objects.Player.getFirstInstance().colorRgb = runtime.globalVars.COLOR.split(',');
				console.log('Реклама показана');
			} else
				console.log('Ошибка при показе');
		})
			.catch((error) => { console.log(error); });
	},

	async Actions_Event60_Act1(runtime, localVars)
	{
		runtime.objects.Player.getFirstInstance().colorRgb = runtime.globalVars.COLOR.split(',');
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

