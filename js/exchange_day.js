// Copyright (c) 2020 Kriss Blank
// Licensed under the MIT license whose full text can be found at http://opensource.org/licenses/MIT


exports.date_to_idx=function(date)
{
	let dat
	if(date)
	{
		try{
			const datePattern = /(\d{4})-(\d{2})-(\d{2})/
			const [, year, month, day] = datePattern.exec(date)
			dat = new Date(Date.UTC(year,day-1,month))
		}catch(e){}
	}
	if(dat===undefined)
	{
		dat=new Date()
	}
	return Math.floor(dat.getTime()/(60*60*24*1000)) // convert micro seconds to days
}

exports.idx_to_date=function(idx)
{
	let dat = new Date(idx*60*60*24*1000)

	let y=dat.getUTCFullYear()
	let m=dat.getUTCMonth()+1
	let d=dat.getUTCDate()
	
	let yyyy=""+y ; while(yyyy.length<4) { yyyy="0"+yyyy }
	let   mm=""+m ; while(  mm.length<2) {   mm="0"+mm }
	let   dd=""+d ; while(  dd.length<2) {   dd="0"+dd }

	return yyyy+"-"+mm+"-"+dd
}

require("./exchange_data.js").build(exports,require('../json/usd_to_xxx_by_day.json'))
