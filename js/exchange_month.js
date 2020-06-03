// Copyright (c) 2020 Kriss Blank
// Licensed under the MIT license whose full text can be found at http://opensource.org/licenses/MIT


let iso_month=require('../json/usd_month.json')

let min_month= 9999*12
let max_month=-9999*12
let months=[] // number of months since epoch of 1970-01-01 which is considered month 0

for( const ms in iso_month )
{
	let sy=parseInt( ms.substring(0,4) , 10 )
	let sm=parseInt( ms.substring(5,7) , 10 )
	let m=((sy-1970)*12)+sm-1
	
	let it=iso_month[ms]

	months[m]=it
	if(m<min_month) { min_month=m }
	if(m>max_month) { max_month=m }
}
delete iso_month

// first make sure all known currencies have a starting value
let start={}
for( let mi=min_month ; mi<=max_month ; mi++ )
{
	for( const n in months[mi] )
	{
		if( start[n] === undefined )
		{
			start[n] = months[mi][n]
		}
	}
}
months[min_month]=start

// now fill in all gaps going forwards
for( let mi=min_month+1 ; mi<=max_month ; mi++ )
{
	let it={}
	for( const n in months[mi-1] )
	{
		it[n]=months[mi-1][n]
	}
	for( const n in months[mi] )
	{
		it[n] = months[mi][n]
	}
	months[mi]=it
}


exports.byisodate=function(value,to_currency,from_currency,isodate)
{
	value=Number(value||0)||0
	to_currency=(to_currency||"USD").toUpperCase()
	from_currency=(from_currency||"USD").toUpperCase()

	let sy=parseInt( isodate.substring(0,4) , 10 )
	let sm=parseInt( isodate.substring(5,7) , 10 )
	let m=((sy-1970)*12)+sm-1
	if(m<min_month) { return }
	if(m>max_month) { return }
	let x=months[m]	
	
	let fx = x[from_currency]
	let tx = x[to_currency  ]
	
	if((fx!==undefined)&&(tx!=undefined)&&(fx!=0)&&(tx!=0)) // sanity
	{
		return value*fx/tx
	}

}
