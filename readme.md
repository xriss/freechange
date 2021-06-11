
# Freechange is a javascript module and data to perform historical currency exchange.

|  [View on npm](https://www.npmjs.com/package/freechange) 	|  [Try on Runkit](https://npm.runkit.com/freechange)	|  [Website](https://xriss.github.io/freechange-charts/)	|
|-	|-	|-	|

### Installation and usage

	npm install freechange


This will include a few meg of historical json, so be warned we are 
**very data heavy**. See below for options to reduce this size.


	var freechange = require("freechange")

	console.log( freechange.by_date(100,"GBP","USD","2010") )
	console.log( freechange.by_date(100,"GBP","USD","2010-01") )
	console.log( freechange.by_date(100,"GBP","USD","2010-01-01") )


This will exchange 100 GBP to USD multiple times, using slightly 
different dates.

Remember, we have a focus on **historical data** so this call may give 
different results when used with a date less than a year old, depending 
on when you installed the package and when we last updated the package 
with newer data. This happens as new data is collected overtime.

Currencies are expressed as their [ISO 4217 codes](https://en.wikipedia.org/wiki/ISO_4217).

**We currently have historical exchange rates for 190 currencies with varying degrees of support and resolution.**

You can view this list by visiting https://xriss.github.io/freechange-charts/ and selecting from USD to your currency of choice.

The monthly chart represents good coverage so if that is missing then we do not support that currency very well.

## Options

So to recap, times in the past are good and stable, times in the future 
are not.  
**If you mostly care about today's exchange rates, you 
should be using an API rather than this historical data dump.**

When you provide a date, it will trigger one of three modes as described 
below - depending on if it is a full date, a month or a year only.

### Year provided
We will use yearly averages for the given year or closest 
year if it is out of the range of data.

### Month provided
We will use monthly averages for the given month or switch 
to yearly average if the date is out of the range of our monthly data.

### Day provided
We will use daily numbers for the given day or switch to 
monthly and then yearly average if the date is out of the range of our 
data.

This function will return a number if it is successful or *undefined* if 
it is not; eg. we could not find the currency you requested.


If you want to reduce the amount of memory used by data, you can 
reduce the maximum resolution from day to month or year by changing to 
one of the following requires. This allows you to explicitly choose the 
resolutions available to reduce accuracy and more importantly, data 
size.



	var freechange = require("freechange/day")
	var freechange = require("freechange/month")
	var freechange = require("freechange/year")


## Sources

When it comes to sourcing the data we use ( in order of preference ) 
numbers from the following sources. You can find the latest data we 
grabbed in the JSON directory along with generated `usd_to_xxx` exchange 
rates for days, months and years.

| Name 	|  Range	|  Source	| JSON 	|
|-	|-	|-	|-	|
|  **IMF**	|  Daily	|  https://www.imf.org/external/np/fin/data/param_rms_mth.aspx	|  https://github.com/xriss/freechange/blob/master/json/imf.json	|
|  **FRED**	|  Daily	|  https://fred.stlouisfed.org/categories/94	|  https://github.com/xriss/freechange/blob/master/json/fred.json	|
|  **CodeforIATI**	|  Daily	|  https://raw.githubusercontent.com/codeforIATI/imf-exchangerates/gh-pages/imf_exchangerates.csv	|  https://github.com/xriss/freechange/blob/master/json/cfiati.json	|
|  **OECD**	|  Monthly	|  https://data.oecd.org/conversion/exchange-rates.htm	|  https://github.com/xriss/freechange/blob/master/json/oecd.json	|
|  **MYBUTT**	|  Yearly	|  https://github.com/xriss/freechange/blob/master/mybutt/year.csv	|  This folder contains handmade CSV for when every other source fails.	|



## Data Downloads

All of these sources are combined into the following output JSON files 
which contain data you could use directly outside of this module.  
CSV files are also built at the same time as the JSON files and will
contain the same data.

|Name  	|JSON  	|CSV  	|
|-	|-	|-	|
| USD to XXX **by Day** 	|  https://github.com/xriss/freechange/blob/master/json/usd_to_xxx_by_day.json	|  https://github.com/xriss/freechange/blob/master/csv/usd_to_xxx_by_day.csv	|
| USD to XXX **by Month** 	|  https://github.com/xriss/freechange/blob/master/json/usd_to_xxx_by_month.json	|  https://github.com/xriss/freechange/blob/master/csv/usd_to_xxx_by_month.csv	|
| USD to XXX **by Year** 	|  https://github.com/xriss/freechange/blob/master/json/usd_to_xxx_by_year.json	|  https://github.com/xriss/freechange/blob/master/csv/usd_to_xxx_by_year.csv	|
