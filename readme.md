
# FreeChange

https://www.npmjs.com/package/freechange

https://npm.runkit.com/freechange

https://xriss.github.io/freechange-charts/


	npm install freechange


This will include a few meg of historical json, so be warned we are 
very data heavy. See below for options to reduce this size.


	var freechange = require("freechange")

	console.log( freechange.by_date(100,"GBP","USD","2010") )
	console.log( freechange.by_date(100,"GBP","USD","2010-01") )
	console.log( freechange.by_date(100,"GBP","USD","2010-01-01") )


This will exchange 100 GBP to USD multiple times, using slightly 
different dates.

The currencies given are three letter ISO-4217 codes 

https://en.wikipedia.org/wiki/ISO_4217

The list of currencies we support well can be found at the top of this 
source file 
https://github.com/xriss/freechange/blob/master/js/download.js where 
downloads.currencies is a data mapping table used to parse and convert 
the downloaded data. The list of currencies we support badly and the 
data we use as last resort can be found at 
https://github.com/xriss/freechange/blob/master/mybutt/year.csv


Without a date, we use todays date ( we let the moment module parse the 
date string ) which will be a bit wobbly and not provide good results. 
We have a focus on historical data which is included in the library so 
this call will give different results depending on when you installed the 
package and when we last updated the package with newer data.

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

This function will return a number if it is successful or undefined if 
it is not, eg we do could not find the currency you requested.


If you want to reduce the amount of memory used by data then you can 
reduce the maximum resolution from day to month or year by changing to 
one of the following requires. This allows you to explicitly choose the 
resolutions available to reduce accuracy and more importantly data 
size.



	var freechange = require("freechange/day")
	var freechange = require("freechange/month")
	var freechange = require("freechange/year")


## DATA

When it comes to sourcing the data we use ( in order of preference ) 
numbers from the following sources. You can find the latest data we 
grabbed in the json directory along with generated usd_to_xxx exchange 
rates for days months and years.


### IMF : Daily

from https://www.imf.org/external/np/fin/data/param_rms_mth.aspx

to https://github.com/xriss/freechange/blob/master/json/imf.json


### FRED : Daily

from https://fred.stlouisfed.org/categories/94

to https://github.com/xriss/freechange/blob/master/json/fred.json


### OECD : Monthly

from https://data.oecd.org/conversion/exchange-rates.htm

to https://github.com/xriss/freechange/blob/master/json/oecd.json


### MYBUTT : Yearly

from https://github.com/xriss/freechange/blob/master/mybutt/year.csv

The mybutt folder in this repository contains handmade csv for when 
every other source fails.


### OUTPUT

All of these sources are combined into the following output json files 
which contain data you could use directly outside of this module.


https://github.com/xriss/freechange/blob/master/json/usd_to_xxx_by_day.json

https://github.com/xriss/freechange/blob/master/json/usd_to_xxx_by_month.json

https://github.com/xriss/freechange/blob/master/json/usd_to_xxx_by_year.json

