// Copyright (c) 2020 Kriss Blank
// Licensed under the MIT license whose full text can be found at http://opensource.org/licenses/MIT


exports.build=function(base,rawdata)
{
	base.min_idx= 9999*12*32
	base.max_idx=-9999*12*32
	base.data={}

	// convert from date string to idx integer
	for( const date in rawdata )
	{
		let idx=base.date_to_idx(date)
		
		let it=rawdata[date]

		base.data[idx]=it
		if(idx<base.min_idx) { base.min_idx=idx }
		if(idx>base.max_idx) { base.max_idx=idx }
	}
	delete rawdata

	// get the starting value for all know currencies
	let start={}
	for( let idx=base.min_idx ; idx<=base.max_idx ; idx++ )
	{
		for( const n in base.data[idx] )
		{
			if( start[n] === undefined )
			{
				start[n] = base.data[idx][n]
			}
		}
	}
	base.min_idx=base.min_idx-1
	base.data[base.min_idx]={} // min_idx is always empty (so we know to move from day to month to year when date is clamped to min/max)
	base.data[base.min_idx-1]=start // min_idx-1 is always full of oldest data we have

	// all start values can be found at data[min_idx-1]
	// data[min_idx] will always be empty
	// all end values can be found at data[max_idx]

	// now fill in all gaps going forwards
	for( let idx=base.min_idx+1 ; idx<=base.max_idx ; idx++ )
	{
		let it={}
		for( const n in base.data[idx-1] )
		{
			it[n]=base.data[idx-1][n]
		}
		for( const n in base.data[idx] )
		{
			it[n] = base.data[idx][n]
		}
		base.data[idx]=it
	}


	base.by_date=function(value,from_currency,to_currency,date)
	{
		value=Number(value||0)||0
		to_currency=(to_currency||"USD").toUpperCase()
		from_currency=(from_currency||"USD").toUpperCase()

		let idx=base.date_to_idx(date)
		let x=base.data[idx]
		if( !x ) { return }

		let fx = x[from_currency]
		let tx = x[to_currency  ]	

		if( fx && tx ) // sanity numbers must exist and not be zero
		{
			return value*tx/fx
		}
		
	}

	base.clamp_date=function(date)
	{
		let idx=base.date_to_idx(date)
		if( idx < base.min_idx ) { idx = base.min_idx }
		if( idx > base.max_idx ) { idx = base.max_idx }
		return base.idx_to_date(idx)
	}

}
