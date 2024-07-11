


const scriptsInEvents = {

	async Sdk_Event1_Act1(runtime, localVars)
	{
		// Detect browser language
		var usrlang = navigator.language || navigator.userLanguage;
		runtime.globalVars.lang = usrlang.slice(0, 2);
		console.log("Language: " + runtime.globalVars.lang);
	},

	async Sdk_Event2_Act1(runtime, localVars)
	{
		PokiSDK.init().then(() => {
		    console.log("SDK initialized");
		}).catch(() => {
		    console.log("SDK problem");
		});
	},

	async Sdk_Event3_Act1(runtime, localVars)
	{
		PokiSDK.gameLoadingFinished();
		console.log("Loading finished");
	},

	async Sdk_Event5_Act1(runtime, localVars)
	{
		PokiSDK.gameplayStart();
		console.log("Game start");
	},

	async Sdk_Event8_Act1(runtime, localVars)
	{
		PokiSDK.gameplayStop();
		console.log("Game stop");
	},

	async Sdk_Event10_Act1(runtime, localVars)
	{
		const bonus = localVars.bonusType;
		const unlock = localVars.unlock;
		
		PokiSDK.rewardedBreak(() => {
		  runtime.callFunction("gameStop", false, true);
		}).then((success) => {
		    if(success) {
				runtime.callFunction("gameStart", false, true);
		        runtime.callFunction("rewShown", bonus, unlock);
		    } else {
		        runtime.callFunction("gameStart", false, true);
		    }
		
		    console.log("Rewarded break finished, proceeding to game");
		    runtime.callFunction("popClose", bonus);
		});
	},

	async Sdk_Event11_Act1(runtime, localVars)
	{
		PokiSDK.commercialBreak(() => {
		  runtime.callFunction("gameStop", false, true);
		}).then(() => {
		  console.log("Commercial break finished, proceeding to game");
		  runtime.callFunction("gameStart", false, true);
		});
		
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

