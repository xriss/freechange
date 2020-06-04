// Copyright (c) 2020 Kriss Blank
// Licensed under the MIT license whose full text can be found at http://opensource.org/licenses/MIT


exports.date_to_idx=function(date)
{
	const datePattern = /(\d{4})/
	const [, year ] = datePattern.exec(date)
	let dat = new Date(Date.UTC(year,0,1))

	return (dat.getUTCFullYear()-1970)
}

exports.idx_to_date=function(idx)
{
	let y=1970+idx
	
	let yyyy=""+y ; while(yyyy.length<4) { yyyy="0"+yyyy }

	return yyyy
}


require("./exchange_data.js").build(exports,require('../json/usd_to_xxx_by_year.json'))
