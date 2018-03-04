//by johnerfx (MIT Licensed)
//edit cosmicog
function checkTicker() 
{
	var usd_try;
    var ticker = new XMLHttpRequest();
	var ticker2 = new XMLHttpRequest();
	ticker.open("GET", "https://api.coinmarketcap.com/v1/ticker/", true);
	ticker2.open("GET", "https://api.fixer.io/latest?base=USD", false);
	ticker2.onreadystatechange = function() 
	{
		if (ticker2.readyState == 4 && ticker2.status == 200) 
		{
			var jsonresponse=JSON.parse(ticker2.responseText);
			usd_try = jsonresponse['rates']['TRY']
		}
	}
	ticker.onreadystatechange = function() 
	{
		if (ticker.readyState == 4 && ticker.status == 200) 
		{
			var jsonresponse=JSON.parse(ticker.responseText);
			for (i=0;i<jsonresponse.length;i++) 
			{
				if (jsonresponse[i]['id']=='ripple') 
				{
					//chrome.extension.getBackgroundPage().console.log(window.navigator.language);
					var coin_btc=jsonresponse[i]['price_btc'];
					var coin_usd=jsonresponse[i]['price_usd'];
					var coin_percent1h=jsonresponse[i]['percent_change_1h'];
					var coin_percent24h=jsonresponse[i]['percent_change_24h'];
					var coin_percent7d=jsonresponse[i]['percent_change_7d'];
					var coin_marketcap=jsonresponse[i]['market_cap_usd'];
					var coin_volume=jsonresponse[i]['24h_volume_usd'];
				}
			}
			chrome.browserAction.setBadgeText({text: parseFloat(coin_usd*usd_try).toFixed(2)});
			var lines=["RIPPLE price ticker (price taken from 'www.coinmarketcap.com')\n"];
			var options = { style: 'currency', currency: 'TRY'};
			lines.push("\n");
			lines.push("RIPPLE "+FixIfNotNull(coin_btc,8)+"BTC\n");
			lines.push("RIPPLE "+FixIfNotNull(coin_usd*usd_try,4)+" ₺ \n");
			lines.push("RIPPLE 1h Change "+Number(coin_percent1h*usd_try).toLocaleString(window.navigator.language,options)+"\n");
			lines.push("RIPPLE 7d Change "+Number(coin_percent7d*usd_try).toLocaleString(window.navigator.language,options)+"\n");
			lines.push("RIPPLE 24h Change "+FixIfNotNull(coin_percent24h*usd_try,2)+"%\n");
			lines.push("RIPPLE 24h Volume "+Number(coin_volume*usd_try).toLocaleString(window.navigator.language,options)+"\n");
			lines.push("RIPPLE Marketcap "+Number(coin_marketcap*usd_try).toLocaleString(window.navigator.language,options)+"\n");
			lines.push("\n");
			lines.push(Date());
			var title_lines="";
			for (j=0;j<lines.length;j++) 
			{
				title_lines=title_lines+lines[j];
			}
			chrome.browserAction.setTitle({title:title_lines});
	    }
    }
    ticker2.send();
    ticker.send();
}
function FixIfNotNull(variable,decimals) {
	//Function passess variable toFixed only if it is not null (edge case)
	//then returns fixed_var as string
	var fixed_var="UNAVAILABLE";
	if (variable) 
	{
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
