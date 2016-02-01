var request = require('request');
var xpath = require('xpath');
var parse5 = require('parse5');
var dom = require('xmldom').DOMParser;
var xmlser = require('xmlserializer');

var options = {
	url : "http://www.idx.co.id/Portals/0/StaticData/HomeHtml/MarketActivityID.html",
}

request( options, function ( error, response, body ){
	var indeks = [], nilai = [], poin = [], persen = [], temporary = {}, getAll = [];
	var documents = parse5.parse(body);
    var xhtml = xmlser.serializeToString(documents);
    var doc = new dom().parseFromString(xhtml);
    var select = xpath.useNamespaces({"x": "http://www.w3.org/1999/xhtml"});
    var nodes = select('//x:li[@class="rpItem"]', doc);
    console.log('------------------------------------');

    for ( var c in nodes ) {

    	temporary = {
    		indeks 	: nodes[c].childNodes[0].firstChild.data,
    		nilai 	: nodes[c].childNodes[1].nextSibling.firstChild.data,
    		poin 	: nodes[c].childNodes[2].nextSibling.nextSibling.firstChild.data,
    		persen 	: nodes[c].childNodes[3].nextSibling.nextSibling.nextSibling.firstChild.data,
    	}

    	getAll.push(temporary)
    }

    console.log(getAll);
    // console.log(nilai);
    // console.log(nodes[0].firstChild.data);
});