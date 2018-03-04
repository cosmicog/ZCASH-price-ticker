//by johnerfx (MIT Licensed)
//edit cosmicog
function checkTicker() 
{
	var ticker = new XMLHttpRequest();
	ticker.open("GET", "https://api.fixer.io/latest?base=USD", true);
	
	ticker.onreadystatechange = function() 
	{
		if (ticker.readyState == 4 && ticker.status == 200) 
		{
			var jsonresponse=JSON.parse(ticker.responseText);
			var usd_try = jsonresponse['rates']['TRY'];
		}
		chrome.browserAction.setBadgeText({text: parseFloat(usd_try).toFixed(2)});
		var title_str = "₺ " + parseFloat(usd_try);
	    chrome.browserAction.setTitle({title: title_str});
	}
	ticker.send();
}

function FixIfNotNull(variable,decimals) {
	//Function passess variable toFixed only if it is not null (edge case)
	//then returns fixed_var as string
	var fixed_var="UNAVAILABLE";
	if (variable) {
		fixed_var=parseFloat(variable).toFixed(decimals);
	}
	return fixed_var.toString()
}
chrome.browserAction.onClicked.addListener(function(activeTab)
{
	checkTicker();
});
window.setInterval(checkTicker, 240000); //4 minutes
checkTicker();
