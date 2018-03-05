//by johnerfx (MIT Licensed)
//edit cosmicog
function checkTicker() 
{
    var ticker = new XMLHttpRequest();
	ticker.open("GET", "https://www.btcturk.com/api/ticker/", true);
	
	ticker.onreadystatechange = function() 
	{
		if (ticker.readyState == 4 && ticker.status == 200) 
		{
			var jsonresponse=JSON.parse(ticker.responseText);
			for (i=0;i<jsonresponse.length;i++) 
			{
				if (jsonresponse[i]['pair']=='BTCTRY') 
				{
					var high=jsonresponse[i]['high'];
					var last=jsonresponse[i]['last'];
					var vol =jsonresponse[i]['volume'];
					var time=jsonresponse[i]['timestamp'];
					var bid =jsonresponse[i]['bid'];
					var low =jsonresponse[i]['low'];
					var ask =jsonresponse[i]['ask'];
					var open=jsonresponse[i]['open'];
					var avrg=jsonresponse[i]['average']
				}
			}
			chrome.browserAction.setBadgeText({text: parseFloat(ask).toFixed(2)});
			var lines=["Bitcoin TRY price ticker BTCTurk\n"];
			lines.push("High: "   + parseFloat(high).toFixed(2) + " ₺\n");
			lines.push("Low: "    + parseFloat(low ).toFixed(2) + " ₺\n");
			lines.push("Last: "   + parseFloat(last).toFixed(2) + " ₺\n");
			lines.push("Bid: "    + parseFloat(bid ).toFixed(2) + " ₺\n");
			lines.push("Volume: " + parseFloat(vol ).toFixed(2) + " ₺\n");
			lines.push("Ask: "    + parseFloat(ask ).toFixed(2) + " ₺\n");
			lines.push("Open: "   + parseFloat(open).toFixed(2) + " ₺\n");
			lines.push("Average " + parseFloat(avrg).toFixed(2) + " ₺\n");
			lines.push(Date());
			var title_lines="";
			for (j=0;j<lines.length;j++) 
			{
				title_lines=title_lines+lines[j];
			}
			chrome.browserAction.setTitle({title:title_lines});
	    }
    }
    ticker.send();
}
chrome.browserAction.onClicked.addListener(function(activeTab)
{
	checkTicker();
});
window.setInterval(checkTicker, 5000); //5 seconds
checkTicker();
