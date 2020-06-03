

This will include a few meg of historical json, so be warned we are 
data heavy by default.


	var freechange = require("freechange")

	console.log( freechange.by_date(100,"GBP","USD") )
	console.log( freechange.by_date(100,"GBP","USD","2010") )
	console.log( freechange.by_date(100,"GBP","USD","2010-01") )
	console.log( freechange.by_date(100,"GBP","USD","2010-01-01") )


exchange 100 GBP to USD

Without a date, we use todays date ( we let the moment module parse the 
date string ) which will be a bit wobbly and not provide good results. 
We have a focus on historical data which is included in the library so 
this call will give different results depending on when you install the 
package and when we last updated the packag with newer data.

So to recap, times in the past are good and stable, times in the future 
are not and if you mostly care about todays exchange rates then you 
should be using an API rather than this historical data dump.

When you provide a date it will trigger one of three modes as described 
below depending on if it is a full date, a month or a year only.

With a year we will use yearly averages for the given year or closest 
year if it is out of the range of data.

With a month we will use monthly averages for the given month or switch 
to yearly average if the date is out of the range of our monthly data.

With a day we will use daily numbers for the given day or switch to 
monthly and then yearly average if the date is out of the range of our 
data.




When it comes to sourcing the data we use in order of preference 
numbers from the following sources. You can find the latest data we 
grabbed in the json directory.


IMF : Daily

https://www.imf.org/external/np/fin/data/param_rms_mth.aspx

https://github.com/xriss/freechange/blob/master/json/imf.json


FRED : Daily

from https://fred.stlouisfed.org/categories/94

https://github.com/xriss/freechange/blob/master/json/fred.json


OECD : Monthly

https://data.oecd.org/conversion/exchange-rates.htm

https://github.com/xriss/freechange/blob/master/json/oecd.json


MYBUTT : Yearly

https://github.com/xriss/freechange/blob/master/mybutt/year.csv

The mybutt folder in this repository contains handmade csv for when 
every other source fails.


