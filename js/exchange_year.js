// Copyright (c) 2020 Kriss Blank
// Licensed under the MIT license whose full text can be found at http://opensource.org/licenses/MIT

const moment = require("moment")

exports.date_to_idx=function(date)
{

	let mm = moment(date)
	return (mm.year()-1970)
}

exports.idx_to_date=function(idx)
{
	return ""+(idx+1970)
}


require("./exchange_data.js").build(exports,require('../json/usd_year.json'))
