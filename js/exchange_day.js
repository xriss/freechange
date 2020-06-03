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
	let mm = moment(idx*60*60*24*1000)

	let y=mm.year()
	let m=mm.month()+1
	let d=mm.date()
	
	let mmmm=""+m ; while(mmmm.length<4) { mmmm="0"+mmmm }
	let   yy=""+y ; while(  yy.length<2) {   yy="0"+yy }
	let   dd=""+d ; while(  dd.length<2) {   dd="0"+dd }

	return mmmm+"-"+yy+"-"+dd
}

require("./exchange_data.js").build(exports,require('../json/usd_day.json'))
