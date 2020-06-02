#!/usr/bin/env node
// Copyright (c) 2020 Kriss Blank
// Licensed under the MIT license whose full text can be found at http://opensource.org/licenses/MIT

var cmd=exports;

var pfs=require("pify")( require("fs") )


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
		return
	}

	// help text
	console.log(
`
>	freechange download

Fetch remote files and update cached data

`)
}

// if global.argv is set then we are inside another command so do nothing
if(!global.argv)
{
	global.argv=require('minimist')(process.argv.slice(2))
	cmd.parse(global.argv)
	cmd.run(global.argv)
}
