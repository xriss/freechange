// Copyright (c) 2020 Kriss Blank
// Licensed under the MIT license whose full text can be found at http://opensource.org/licenses/MIT

let download=exports;

const fs=require('fs')
const util=require('util')
const ls=function(a) { console.log(util.inspect(a,{depth:null})) }


const fetch          = require('node-fetch')
const csvparse       = require('neat-csv')
const json_stringify = require('json-stable-stringify')


const jml = require('./jml.js')



download.currency=
{
	"HKD":{                                         fred:"HKUS", },
	"TWD":{                                         fred:"TAUS", },
	"VES":{                                         fred:"VZUS", },
	"CRC":{                            oecd:"CRI",               },
	"XDR":{                            oecd:"SDR",               },
	"TRL":{                            oecd:"TUR",               },
	"LVL":{                            oecd:"LVA",               },
	"CNY":{ imf:"Chinese yuan",        oecd:"CHN",  fred:"CHUS", },
	"EUR":{ imf:"Euro",                oecd:"EA19", fred:"USEU", },
	"JPY":{ imf:"Japanese yen",        oecd:"JPN",  fred:"JPUS", },
	"GBP":{ imf:"U.K. pound",          oecd:"GBR",  fred:"USUK", },
	"USD":{ imf:"U.S. dollar",                                   },
	"DZD":{ imf:"Algerian dinar",                                },
	"AUD":{ imf:"Australian dollar",   oecd:"AUS",  fred:"USAL", },
	"BHD":{ imf:"Bahrain dinar",                                 },
	"BWP":{ imf:"Botswana pula",                                 },
	"BRL":{ imf:"Brazilian real",      oecd:"BRA",  fred:"BZUS", },
	"BND":{ imf:"Brunei dollar",                                 },
	"CAD":{ imf:"Canadian dollar",     oecd:"CAN",  fred:"CAUS", },
	"CLP":{ imf:"Chilean peso",        oecd:"CHL",               },
	"COP":{ imf:"Colombian peso",      oecd:"COL",               },
	"CZK":{ imf:"Czech koruna",        oecd:"CZE",               },
	"DKK":{ imf:"Danish krone",        oecd:"DNK",  fred:"DNUS", },
	"HUF":{ imf:"Hungarian forint",    oecd:"HUN",               },
	"ISK":{ imf:"Icelandic krona",     oecd:"ISL",               },
	"INR":{ imf:"Indian rupee",        oecd:"IND",  fred:"INUS", },
	"IDR":{ imf:"Indonesian rupiah",   oecd:"IDN",               },
	"IRR":{ imf:"Iranian rial",                                  },
	"ILS":{ imf:"Israeli New Shekel",  oecd:"ISR",               },
	"KZT":{ imf:"Kazakhstani tenge",                             },
	"KRW":{ imf:"Korean won",          oecd:"KOR",  fred:"KOUS", },
	"KWD":{ imf:"Kuwaiti dinar",                                 },
	"LYD":{ imf:"Libyan dinar",                                  },
	"MYR":{ imf:"Malaysian ringgit",                fred:"MAUS", },
	"MUR":{ imf:"Mauritian rupee",                               },
	"MXN":{ imf:"Mexican peso",        oecd:"MEX",  fred:"MXUS", },
	"NPR":{ imf:"Nepalese rupee",                                },
	"NZD":{ imf:"New Zealand dollar",  oecd:"NZL",  fred:"USNZ", },
	"NOK":{ imf:"Norwegian krone",     oecd:"NOR",  fred:"NOUS", },
	"OMR":{ imf:"Omani rial",                                    },
	"PKR":{ imf:"Pakistani rupee",                               },
	"PEN":{ imf:"Peruvian sol",                                  },
	"PHP":{ imf:"Philippine peso",                               },
	"PLN":{ imf:"Polish zloty",        oecd:"POL",               },
	"QAR":{ imf:"Qatari riyal",                                  },
	"RUB":{ imf:"Russian ruble",       oecd:"RUS",               },
	"SAR":{ imf:"Saudi Arabian riyal",                           },
	"SGD":{ imf:"Singapore dollar",                 fred:"SIUS", },
	"ZAR":{ imf:"South African rand",  oecd:"ZAF",  fred:"SFUS", },
	"LKR":{ imf:"Sri Lankan rupee",                 fred:"SLUS", },
	"SEK":{ imf:"Swedish krona",       oecd:"SWE",  fred:"SDUS", },
	"CHF":{ imf:"Swiss franc",         oecd:"CHE",  fred:"SZUS", },
	"THB":{ imf:"Thai baht",                        fred:"THUS", },
	"TTD":{ imf:"Trinidadian dollar",                            },
	"TND":{ imf:"Tunisian dinar",                                },
	"AED":{ imf:"U.A.E. dirham",                                 },
	"UYU":{ imf:"Uruguayan peso",                                },
	"VEF":{ imf:"Bolivar Fuerte",                                },
}
for( let n in download.currency ) { download.currency[n].iso=n }


download.all=async function()
{
	await download.imf()
	await download.fred()
	await download.oecd()
	
	await download.usd_day()
	await download.usd_month()
	await download.usd_year()

}

download.imf=async function()
{

	let xes_low={};
	for(let n in download.currency)
	{
		let v=download.currency[n]
		if(v.imf)
		{
			xes_low[ v.imf.toLowerCase() ] = n
		}
	}

	let dump={}

	var this_year=(new Date()).getYear()+1900; // get this year
	for(let year=this_year-1;year<=this_year;year++ )
	{
		for(let month=1;month<=12;month++ )
		{
			let month0="0"+month; if(month0.length>2) { month0=month; }
			
			console.log("Downloading Daily IMF data for "+year+"-"+month0)

			let url="https://www.imf.org/external/np/fin/data/rms_mth.aspx?SelectDate="+year+"-"+month0+"-01&reportType=CVSDR&tsvflag=Y"
			let data = await fetch(url).then(res => res.text())
			let lines = await csvparse( data , { separator: '\t' } )

			let dates=[]
			for( line of lines )
			{
				if( line[0] == "Currency" ) // this is a header line
				{
					for( let i=1 ; true ; i++ )
					{
						if( ! line[i] ) { break }

						let dat=new Date(line[i]) // the format is the one javascript understands...
						let y=dat.getFullYear()
						let m=dat.getMonth()+1
						let d=dat.getDate()
						
						let yyyy=""+y ; while(yyyy.length<4) { yyyy="0"+yyyy }
						let   mm=""+m ; while(  mm.length<2) {   mm="0"+mm }
						let   dd=""+d ; while(  dd.length<2) {   dd="0"+dd }

						dates[i]=yyyy+"-"+mm+"-"+dd

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
								if(!dump[date]){dump[date]={}} // init
								dump[date][cid]=value
							}
						}
					}
				}
			}
		}
	}
	
	let filename=__dirname+"/../json/imf.json"
	let old={}
	try{ old=JSON.parse( fs.readFileSync(filename,{encoding:"utf8"}) ) }catch(e){}
	for(let n in old){ if( (!dump[n]) ) { dump[n] = old[n] } } // include old data
	fs.writeFileSync(filename,json_stringify(dump,{ space: ' ' })+"\n");
	
}



download.oecd=async function()
{

	let dump={}
	for( let n in download.currency )
	{
		let v=download.currency[n]
		let cid=v.oecd
		if(cid)
		{

			console.log("Downloading Monthly OECD data for "+cid)
			
			let url="https://stats.oecd.org/restsdmx/sdmx.ashx/GetData/MEI_FIN/CCUS."+cid+".M/all?startTime=1940-01"
			let data = await fetch(url).then(res => res.text())
			let tree
			try{ tree=jml.from_xml(data) }catch(e){}

			if(tree)
			{

				let date="0000-00"		
				jml.walk_xpath(tree,function(it,path){

					if(path=="/message:MessageGroup/DataSet/Series/Obs/Time")
					{
						date=it[1][0]
					}
					else
					if(path=="/message:MessageGroup/DataSet/Series/Obs/ObsValue")
					{
						let value=parseFloat(it.value)

						if( !isNaN(value) )
						{
							if(!dump[date]){dump[date]={}} // init
							dump[date][cid]=value
						}
					}

				})
			}

		}
	}

	let filename=__dirname+"/../json/oecd.json"
	let old={}
	try{ old=JSON.parse( fs.readFileSync(filename,{encoding:"utf8"}) ) }catch(e){}
	for(let n in old){ if( (!dump[n]) ) { dump[n] = old[n] } } // include old data
	fs.writeFileSync(filename,json_stringify(dump,{ space: ' ' })+"\n");

}


download.fred=async function()
{

	let dump={}
	for( let n in download.currency )
	{
		let v=download.currency[n]
		let cid=v.fred
		if(cid)
		{

			console.log("Downloading Daily FRED data for "+cid)
			
			let url="https://fred.stlouisfed.org/graph/fredgraph.csv?id=DEX"+cid
			let data = await fetch(url).then(res => res.text())
			let lines = await csvparse( data )

			for( line of lines )
			{
				let date  = line.DATE
				let value = parseFloat(line["DEX"+cid])
				if( !isNaN(value) )
				{
					if(!dump[date]){dump[date]={}} // init
					dump[date][cid]=value
				}
			}
		}
	}

	let filename=__dirname+"/../json/fred.json"
	let old={}
	try{ old=JSON.parse( fs.readFileSync(filename,{encoding:"utf8"}) ) }catch(e){}
	for(let n in old){ if( (!dump[n]) ) { dump[n] = old[n] } } // include old data
	fs.writeFileSync(filename,json_stringify(dump,{ space: ' ' })+"\n");


}


download.usd_day=async function()
{
	let fred={}
	try{ fred=JSON.parse( fs.readFileSync(__dirname+"/../json/fred.json",{encoding:"utf8"}) ) }catch(e){}

	let imf={}
	try{ imf=JSON.parse( fs.readFileSync(__dirname+"/../json/imf.json",{encoding:"utf8"}) ) }catch(e){}

	let dump={}

	let fred_currency={} // map fred id
	for( let n in download.currency )
	{
		let v=download.currency[n]
		if(v.fred)
		{
			fred_currency[v.fred]=v
		}
	}
	
	for( let date in fred )
	{
		let it=fred[date]
		for( let n in it )
		{
			let c=fred_currency[n]
			if(!dump[date]){dump[date]={}}
			if(n.substring(0,2)=="US") // need to convert
			{
				dump[date][c.iso]=1.0/it[n]
			}
			else
			{
				dump[date][c.iso]=it[n]
			}
		}
	}

	for( let date in imf )
	{
		let it=imf[date]
		if(it.USD)
		{
			for( let n in it )
			{
				let c=download.currency[n]
				if(!dump[date]){dump[date]={}}
				dump[date][c.iso]=it[n]/it.USD
			}
		}
	}

	for( let date in dump )
	{
		dump[date].USD=1 // USD always converts to 1
	}


	let filename=__dirname+"/../json/usd_to_xxx_by_day.json"
	let old={}
	try{ old=JSON.parse( fs.readFileSync(filename,{encoding:"utf8"}) ) }catch(e){}
	for(let n in old){ if( (!dump[n]) ) { dump[n] = old[n] } } // include old data
	fs.writeFileSync(filename,json_stringify(dump,{ space: ' ' })+"\n");

}


download.usd_month=async function()
{
	let oecd={}
	try{ oecd=JSON.parse( fs.readFileSync(__dirname+"/../json/oecd.json",{encoding:"utf8"}) ) }catch(e){}

	let day={}
	try{ day=JSON.parse( fs.readFileSync(__dirname+"/../json/usd_to_xxx_by_day.json",{encoding:"utf8"}) ) }catch(e){}

	let dump={}

	let oecd_currency={} // map fred id
	for( let n in download.currency )
	{
		let v=download.currency[n]
		if(v.oecd)
		{
			oecd_currency[v.oecd]=v
		}
	}
	
	for( let date in oecd )
	{
		let it=oecd[date]
		for( let n in it )
		{
			let c=oecd_currency[n]
			if(!dump[date]){dump[date]={}}
			dump[date][c.iso]=it[n]
		}
	}


	let month={}
	for( let date in day )
	{
		let date_month=date.substring(0,7)
		let it=day[date]
		for( let n in it )
		{
			if( ! month[date_month]    ) { month[date_month]={} }
			if( ! month[date_month][n] ) { month[date_month][n]=[0,0] } // bucket
			month[date_month][n][0]+=it[n]
			month[date_month][n][1]+=1
		}
	}
	for( let date in month )
	{
		let it=month[date]
		for( let n in it )
		{
			if(!dump[date]){dump[date]={}}
			dump[date][n]=it[n][0]/it[n][1] // average of all samples
		}
	}


	for( let date in dump )
	{
		dump[date].USD=1 // USD always converts to 1
	}


	let filename=__dirname+"/../json/usd_to_xxx_by_month.json"
	let old={}
	try{ old=JSON.parse( fs.readFileSync(filename,{encoding:"utf8"}) ) }catch(e){}
	for(let n in old){ if( (!dump[n]) ) { dump[n] = old[n] } } // include old data
	fs.writeFileSync(filename,json_stringify(dump,{ space: ' ' })+"\n");

}


download.usd_year=async function()
{
	let month={}
	try{ month=JSON.parse( fs.readFileSync(__dirname+"/../json/usd_to_xxx_by_month.json",{encoding:"utf8"}) ) }catch(e){}

	let dump={}

	let year={}
	for( let date in month )
	{
		let date_year=date.substring(0,4)
		let it=month[date]
		for( let n in it )
		{
			if( ! year[date_year]    ) { year[date_year]={} }
			if( ! year[date_year][n] ) { year[date_year][n]=[0,0] } // bucket
			year[date_year][n][0]+=it[n]
			year[date_year][n][1]+=1
		}
	}
	for( let date in year )
	{
		let it=year[date]
		for( let n in it )
		{
			if(!dump[date]){dump[date]={}}
			dump[date][n]=it[n][0]/it[n][1] // average of all samples
		}
	}


	for( let date in dump )
	{
		dump[date].USD=1 // USD always converts to 1
	}


	let data = fs.readFileSync(__dirname+"/../mybutt/year.csv",{encoding:"utf8"})
	let lines = await csvparse( data )
	for( let line of lines )
	{
		let date=line.year
		for( let n in line )
		{
			if(n!="year")
			{
				let value=parseFloat(line[n])
				if(!isNaN(value))
				{
					if( (!dump[date]) || (!dump[date][n]) )
					{
						if(!dump[date]){dump[date]={}}
						dump[date][n]=value
					}
				}
			}
		}
	}



	let filename=__dirname+"/../json/usd_to_xxx_by_year.json"
	let old={}
	try{ old=JSON.parse( fs.readFileSync(filename,{encoding:"utf8"}) ) }catch(e){}
	for(let n in old){ if( (!dump[n]) ) { dump[n] = old[n] } } // include old data
	fs.writeFileSync(filename,json_stringify(dump,{ space: ' ' })+"\n");

}
