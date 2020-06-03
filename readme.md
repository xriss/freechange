

This will include a few meg of historical json, so be warned we are 
data heavy by default.


	var freechange = require("freechange")

	console.log( freechange.by_date(100,"GBP","USD") )
	console.log( freechange.by_date(100,"GBP","USD","2010") )
	console.log( freechange.by_date(100,"GBP","USD","2010-01") )
	console.log( freechange.by_date(100,"GBP","USD","2010-01-01") )



Without a date, we use the current date which will be a bit wobbly and 
not what we are all about.

With a year we will use yearly averages for the given year or closest 
year if it is out of the range of data.

With a month we will use yearly averages for the given year and month or 
switch to yearly average if the date is out of the range of our monthly 
data.

With a day we will use daily numbers for the given day and year and 
month or switch to monthly and then yearly average if the date is out 
of the range of our data.




When it comes to sourcing the data we use in order of preference 
numbers from the following sources and you can find the latest data we 
grabbed in the json directory.


IMF : Daily

https://www.imf.org

https://github.com/xriss/freechange/blob/master/json/imf.json


FRED : Daily

from https://fred.stlouisfed.org/categories/94

https://github.com/xriss/freechange/blob/master/json/fred.json


OECD : Monthly

https://stats.oecd.org/restsdmx/sdmx.ashx/GetData/MEI_FIN/CCUS.AUS.M/all?startTime=1940-01

https://github.com/xriss/freechange/blob/master/json/oecd.json


MYBUTT : Yearly

https://github.com/xriss/freechange/blob/master/mybutt/year.csv

The mybutt folder in this repository contains handmade csv for when 
every other source fails.


