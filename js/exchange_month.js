// Copyright (c) 2020 Kriss Blank
// Licensed under the MIT license whose full text can be found at http://opensource.org/licenses/MIT

const moment = require("moment")

exports.date_to_idx=function(date)
{

	let mm = moment(date)
	return ((mm.year()-1970)*12)+mm.month()
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
