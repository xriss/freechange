// Copyright (c) 2020 Kriss Blank
// Licensed under the MIT license whose full text can be found at http://opensource.org/licenses/MIT

const moment = require("moment")

exports.date_to_idx=function(date)
{

	let mm = moment(date)
	return Math.floor(mm.unix()/(60*60*24)) // convert seconds to days
}

require("./exchange_data.js").build(exports,require('../json/usd_day.json'))
