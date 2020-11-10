// Copyright (c) 2020 Kriss Blank
// Licensed under the MIT license whose full text can be found at http://opensource.org/licenses/MIT



let exchange_year=require("./js/exchange_year.js")




exports.by_date=function(value,from_currency,to_currency,date)
{
	let ret
	
	ret=exchange_year.by_date(value,from_currency,to_currency,exchange_year.clamp_date(date))
	if(ret!==undefined) { return ret }

	date=exchange_year.idx_to_date(exchange_year.min_idx-1) // finally deal with past values

	ret=exchange_year.by_date(value,from_currency,to_currency,date)
	if(ret!==undefined) { return ret }

}

