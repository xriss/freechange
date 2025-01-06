#!/usr/bin/env node
// Copyright (c) 2020 Kriss Blank
// Licensed under the MIT license whose full text can be found at http://opensource.org/licenses/MIT

var cmd=exports;

var ls=function(a) { console.log(util.inspect(a,{depth:null})); }


cmd.parse=function(argv)
{
	argv.filename_dflat=__filename
}


cmd.run=async function(argv)
{
	if( argv._[0]=="download" )
	{
		await require("./download.js").all()
		await require("./csv.js").all()
		return
	}
	if( argv._[0]=="exchange" )
	{
		let freechange=require("../day.js")
		let ret=freechange.by_date( parseFloat( Number( argv._[1]) ) , argv._[2] , argv._[3] , argv._[4] && String(argv._[4]) )
		console.log(ret)
		return
	}

	// help text
	console.log(
`
>	freechange download

Fetch remote files and update cached data this should be run daily to
keep the json files uptodate.

>	freechange exchange 1.0 GBP USD 2000-01-01

Exchange from first currency into second using rates at given date. If
ommited the date will default to today and the cuurencies to USD.

`)
}

// if global.argv is set then we are inside another command so do nothing
if(!global.argv)
{
	global.argv=require('minimist')(process.argv.slice(2))
	cmd.parse(global.argv)
	cmd.run(global.argv)
}
