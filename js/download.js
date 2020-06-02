// Copyright (c) 2020 Kriss Blank
// Licensed under the MIT license whose full text can be found at http://opensource.org/licenses/MIT

let download=exports;

const fs=require('fs')
const util=require('util')
const ls=function(a) { console.log(util.inspect(a,{depth:null})) }


const fetch          = require('node-fetch')
const csvparse       = require('neat-csv')
const moment         = require('moment')
const json_stringify = require('json-stable-stringify')


download.all=async function()
{
	await download.imf()
}

download.imf=async function()
{

	let xes={

"Chinese yuan"				:	"CNY",
"Euro"						:	"EUR",
"Japanese yen"				:	"JPY",
"U.K. pound"				:	"GBP",
"U.S. dollar"				:	"USD",
"Algerian dinar"			:	"DZD",
"Australian dollar"			:	"AUD",
"Bahrain dinar"				:	"BHD",
"Botswana pula"				:	"BWP",
"Brazilian real"			:	"BRL",
"Brunei dollar"				:	"BND",
"Canadian dollar"			:	"CAD",
"Chilean peso"				:	"CLP",
"Colombian peso"			:	"COP",
"Czech koruna"				:	"CZK",
"Danish krone"				:	"DKK",
"Hungarian forint"			:	"HUF",
"Icelandic krona"			:	"ISK",
"Indian rupee"				:	"INR",
"Indonesian rupiah"			:	"IDR",
"Iranian rial"				:	"IRR",
"Israeli New Shekel"		:	"ILS",
"Kazakhstani tenge"			:	"KZT",
"Korean won"				:	"KRW",
"Kuwaiti dinar"				:	"KWD",
"Libyan dinar"				:	"LYD",
"Malaysian ringgit"			:	"MYR",
"Mauritian rupee"			:	"MUR",
"Mexican peso"				:	"MXN",
"Nepalese rupee"			:	"NPR",
"New Zealand dollar"		:	"NZD",
"Norwegian krone"			:	"NOK",
"Omani rial"				:	"OMR",
"Pakistani rupee"			:	"PKR",
"Peruvian sol"				:	"PEN",
"Philippine peso"			:	"PHP",
"Polish zloty"				:	"PLN",
"Qatari riyal"				:	"QAR",
"Russian ruble"				:	"RUB",
"Saudi Arabian riyal"		:	"SAR",
"Singapore dollar"			:	"SGD",
"South African rand"		:	"ZAR",
"Sri Lankan rupee"			:	"LKR",
"Swedish krona"				:	"SEK",
"Swiss franc"				:	"CHF",
"Thai baht"					:	"THB",
"Trinidadian dollar"		:	"TTD",
"Tunisian dinar"			:	"TND",
"U.A.E. dirham"				:	"AED",
"Uruguayan peso"			:	"UYU",
"Bolivar Fuerte"			:	"VEF",

}


	let unknown={}

	let xes_low={};
	for(let n in xes) { xes_low[ n.toLowerCase() ]=xes[n]; } //l case
		
	let dump={}

	var this_year=(new Date()).getYear()+1900; // get this year
	for(let year=this_year-1;year<=this_year;year++ )
	{
		for(let month=1;month<=12;month++ )
		{
			let month0="0"+month; if(month0.length>2) { month0=month; }
			
			console.log("Downloading Daily IMF data for "+year+"-"+month0)

			let url="https://www.imf.org/external/np/fin/data/rms_mth.aspx?SelectDate="+year+"-"+month0+"-01&reportType=CVSDR&tsvflag=Y"
			let lines = await csvparse( await fetch(url).then(res => res.text()) , { separator: '\t' } )

			let dates=[]
			for( line of lines )
			{
				if( line[0] == "Currency" ) // this is a header line
				{
					for( let i=1 ; true ; i++ )
					{
						if( ! line[i] ) { break }
						dates[i]=moment(line[i],"MMMM DD, YYYY").format("YYYY-MM-DD")
					}
				}
				else // try for a currency line
				{
					var cid=xes_low[ (line[0]||"").toLowerCase() ]
					if( cid ) // valid currency
					{
						for( let i=1 ; true ; i++ )
						{
							if( ! line[i] ) { break }
							let date=dates[i]
							let value=parseFloat(line[i])
							if( !isNaN(value) )
							{
								if(!dump[date]){dump[date]={XDR:1}} // init
								dump[date][cid]=value
							}
						}
					}
				}
			}
		}
	}
	
	let filename=__dirname+"/../json/imf_toxdr_day.json"
	let old={}
	try{ old=JSON.parse( fs.readFileSync(filename,{encoding:"utf8"}) ) }catch(e){}
	for(let n in old){ if( (!dump[n]) || (!dump[n].XDR) ) { dump[n] = old[n] } } // include old data
	fs.writeFileSync(filename,json_stringify(dump,{ space: ' ' })+"\n");
	
}

