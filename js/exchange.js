// Copyright (c) 2020 Kriss Blank
// Licensed under the MIT license whose full text can be found at http://opensource.org/licenses/MIT



let exchange_year=require("./exchange_year.js")
let exchange_month=require("./exchange_month.js")
let exchange_day=require("./exchange_day.js")




exports.byisodate=function(value,to_currency,from_currency,isodate)
{
	let ret

	ret=exchange_day.byisodate(value,to_currency,from_currency,isodate)
	if(ret!==undefined) { return ret }

	ret=exchange_month.byisodate(value,to_currency,from_currency,isodate)
	if(ret!==undefined) { return ret }

	ret=exchange_year.byisodate(value,to_currency,from_currency,isodate)
	if(ret!==undefined) { return ret }

}
