// Copyright (c) 2020 Kriss Blank
// Licensed under the MIT license whose full text can be found at http://opensource.org/licenses/MIT

const moment = require("moment")

exports.date_to_idx=function(date)
{

	let mm = moment(date)
	return Math.floor(mm.unix()/(60*60*24)) // convert seconds to days
}

exports.idx_to_date=function(idx)
{
	let mom = moment(idx*60*60*24*1000)

	let y=mom.year()
	let m=mom.month()+1
	let d=mom.date()
	
	let yyyy=""+y ; while(yyyy.length<4) { yyyy="0"+yyyy }
	let   mm=""+m ; while(  mm.length<2) {   mm="0"+mm }
	let   dd=""+d ; while(  dd.length<2) {   dd="0"+dd }

	return yyyy+"-"+mm+"-"+dd
}

require("./exchange_data.js").build(exports,require('../json/usd_to_xxx_by_day.json'))
