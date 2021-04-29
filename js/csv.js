// Copyright (c) 2020 Kriss Blank
// Licensed under the MIT license whose full text can be found at http://opensource.org/licenses/MIT

var csv=exports;

const fs=require('fs')
const util=require('util')
const ls=function(a) { console.log(util.inspect(a,{depth:null})) }

csv.all=function()
{
	
	csv.writefile( "usd_to_xxx_by_day" , JSON.parse( fs.readFileSync(__dirname+"/../json/usd_to_xxx_by_day.json",{encoding:"utf8"}) ) )

	csv.writefile( "usd_to_xxx_by_month" , JSON.parse( fs.readFileSync(__dirname+"/../json/usd_to_xxx_by_month.json",{encoding:"utf8"}) ) )

	csv.writefile( "usd_to_xxx_by_year" , JSON.parse( fs.readFileSync(__dirname+"/../json/usd_to_xxx_by_year.json",{encoding:"utf8"}) ) )

}



// write the csv versions of the json data to disk

csv.writefile=function(name,data)
{
	let filename=__dirname+"/../csv/"+name+".csv"
	let fp=fs.openSync(filename,"w")

	let names_used={}
	
	for( let date in data)
	{
		let row=data[date]
		for( let name in row)
		{
			names_used[name]=true
		}
	}

	let names=[]
	for( let name in names_used)
	{
		names.push(name)
	}
	names.sort()

	fs.writeSync(fp,"DATE");
	for( let name of names)
	{
		fs.writeSync(fp,","+name);
	}
	fs.writeSync(fp,"\n");

	for( let date in data)
	{
		let row=data[date]
		let s=date
		let c=1

		for( let name of names)
		{
			if( row[name] !== undefined )
			{
				s=s+(",".repeat(c))+row[name]
				c=1
			}
			else
			{
				c=c+1
			}
		}
		
		fs.writeSync(fp,s+"\n");
	}

	fs.closeSync(fp)
}
