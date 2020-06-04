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
	let m=idx%12
	let y=(idx-m)/12
	
	let mmmm=""+m ; while(mmmm.length<4) { mmmm="0"+mmmm }
	let   yy=""+y ; while(  yy.length<2) {   yy="0"+yy }

	return mmmm+"-"+yy
}

require("./exchange_data.js").build(exports,require('../json/usd_to_xxx_by_month.json'))
