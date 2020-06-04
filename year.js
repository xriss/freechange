// Copyright (c) 2020 Kriss Blank
// Licensed under the MIT license whose full text can be found at http://opensource.org/licenses/MIT



let exchange_year=require("js/exchange_year.js")




exports.by_date=function(value,from_currency,to_currency,date)
{
	let len=10
	let ret
	
	if(typeof date=="string") { len=date.length } // length of date string
	
	date=exchange_year.clamp_date(date) // force into range 
	
	ret=exchange_year.by_date(value,from_currency,to_currency,date)
	if(ret!==undefined) { return ret }

}
