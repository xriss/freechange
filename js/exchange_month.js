// Copyright (c) 2020 Kriss Blank
// Licensed under the MIT license whose full text can be found at http://opensource.org/licenses/MIT


exports.date_to_idx=function(date)
{
	let dat
	if(date)
	{
		try{
			const datePattern = /(\d{4})-(\d{2})/
			const [, year, month ] = datePattern.exec(date)
			dat = new Date(Date.UTC(year,month-1,1))
		}catch(e){}
	}
	if(dat===undefined)
	{
		dat=new Date()
	}

	return ((dat.getUTCFullYear()-1970)*12)+dat.getUTCMonth()
}

exports.idx_to_date=function(idx)
{
	let m=(idx%12)+1
	let y=1970+Math.floor((idx)/12)

	let yyyy=""+y ; while(yyyy.length<4) { yyyy="0"+yyyy }
	let   mm=""+m ; while(  mm.length<2) {   mm="0"+mm }

	return yyyy+"-"+mm
}

require("./exchange_data.js").build(exports,require('../json/usd_to_xxx_by_month.json'))
