// Copyright (c) 2020 Kriss Blank
// Licensed under the MIT license whose full text can be found at http://opensource.org/licenses/MIT



let exchange_year=require("./js/exchange_year.js")
let exchange_month=require("./js/exchange_month.js")




exports.by_date=function(value,from_currency,to_currency,date)
{
	let len=10
	let ret
	
	if(typeof date=="string") { len=date.length } // length of date string
	
	if(len>4) // 2000-01
	{
		ret=exchange_month.by_date(value,from_currency,to_currency,exchange_month.clamp_date(date))
		if(ret!==undefined) { return ret }
	}

	ret=exchange_year.by_date(value,from_currency,to_currency,exchange_year.clamp_date(date))
	if(ret!==undefined) { return ret }

	date=exchange_year.idx_to_date(exchange_year.min_idx-1) // finally deal with past values

	ret=exchange_year.by_date(value,from_currency,to_currency,date)
	if(ret!==undefined) { return ret }

}
