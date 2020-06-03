// Copyright (c) 2020 Kriss Blank
// Licensed under the MIT license whose full text can be found at http://opensource.org/licenses/MIT


let iso_year=require('../json/usd_year.json')

let min_year= 9999
let max_year=-9999
let years=[] // number of years since epoch of 1970-01-01 which is considered year 0

for( const ys in iso_year )
{
	let sy=parseInt( ys.substring(0,4) , 10 )
	let y=(sy-1970)
	
	let it=iso_year[ys]

	years[y]=it
	if(y<min_year) { min_year=y }
	if(y>max_year) { max_year=y }
}
delete iso_year

// first make sure all known currencies have a starting value
let start={}
for( let yi=min_year ; yi<=max_year ; yi++ )
{
	for( const n in years[yi] )
	{
		if( start[n] === undefined )
		{
			start[n] = years[yi][n]
		}
	}
}
years[min_year]=start

// now fill in all gaps going forwards
for( let yi=min_year+1 ; yi<=max_year ; yi++ )
{
	let it={}
	for( const n in years[yi-1] )
	{
		it[n]=years[yi-1][n]
	}
	for( const n in years[yi] )
	{
		it[n] = years[yi][n]
	}
	years[yi]=it
}


exports.byisodate=function(value,to_currency,from_currency,isodate)
{
	value=Number(value||0)||0
	to_currency=(to_currency||"USD").toUpperCase()
	from_currency=(from_currency||"USD").toUpperCase()

	let sy=parseInt( isodate.substring(0,4) , 10 )
	let y=(sy-1970)
	if(y<min_year) { y=min_year }
	if(y>max_year) { y=max_year }
	let x=years[y]	
	
	let fx = x[from_currency]
	let tx = x[to_currency  ]	

	if((fx!==undefined)&&(tx!=undefined)&&(fx!=0)&&(tx!=0)) // sanity
	{
		return value*fx/tx
	}
	
}
