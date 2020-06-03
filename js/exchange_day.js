// Copyright (c) 2020 Kriss Blank
// Licensed under the MIT license whose full text can be found at http://opensource.org/licenses/MIT


const moment         = require('moment')

let iso_day=require('../json/usd_day.json')

let min_day= 9999*12*32
let max_day=-9999*12*32
let days=[] // number of days since epoch of 1970-01-01 which is considered day 0

for( const ds in iso_day )
{
	var d = Math.floor(moment(ds).unix()/(60*60*24))
	
	let it=iso_day[ds]

	days[d]=it
	if(d<min_day) { min_day=d }
	if(d>max_day) { max_day=d }
}
delete iso_day

// first make sure all known currencies have a starting value
let start={}
for( let di=min_day ; di<=max_day ; di++ )
{
	for( const n in days[di] )
	{
		if( start[n] === undefined )
		{
			start[n] = days[di][n]
		}
	}
}
days[min_day]=start

// now fill in all gaps going forwards
for( let di=min_day+1 ; di<=max_day ; di++ )
{
	let it={}
	for( const n in days[di-1] )
	{
		it[n]=days[di-1][n]
	}
	for( const n in days[di] )
	{
		it[n] = days[di][n]
	}
	days[di]=it
}


exports.byisodate=function(value,to_currency,from_currency,isodate)
{
	value=Number(value||0)||0
	to_currency=(to_currency||"USD").toUpperCase()
	from_currency=(from_currency||"USD").toUpperCase()

	var d = Math.floor(moment(isodate).unix()/(60*60*24))
	if(d<min_day) { return }
	if(d>max_day) { return }
	let x=days[d]	
	
	let fx = x[from_currency]
	let tx = x[to_currency  ]
	
	if((fx!==undefined)&&(tx!=undefined)&&(fx!=0)&&(tx!=0)) // sanity
	{
		return value*fx/tx
	}

}
