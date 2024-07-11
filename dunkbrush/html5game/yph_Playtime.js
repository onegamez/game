var PT_PLAYTIME_USE       = true;

function PT_sendScore(currentScore)
{
	if (PT_PLAYTIME_USE)
	{

	if (window.hasOwnProperty('Playtime')) {
	    window['Playtime'].sendPostMessage(top, currentScore);
	}

	console.log("Playtime : score sent " + currentScore.toString());

	}
}

