
var XMLPacker = require("simple-xml-packer");
var JSONPacker = require("simple-packer");


var xml1 = "<RootView>\n\t<YList>\n\t\t<XList >\n\t\t\t<Space x-give=\"1\"/>\n\t\t\t<TextView x-size=\"128\" y-size=\"32\" text=\"BreadCrumb1\"/>\n\t\t\t<Space x-size=\"8\"/>\n\t\t\t<TextView x-size=\"128\" y-size=\"32\" text=\"BreadCrumb2\"/>\n\t\t\t<Space x-size=\"8\"/>\n\t\t\t<TextView x-size=\"128\" y-size=\"32\" text=\"BreadCrumb3\"/>\n\t\t\t<Space x-give=\"1\"/>\n\t\t\t<TextView x-size=\"128\" y-size=\"32\" text=\"BreadCrumb4\"/>\n\t\t\t<Space x-size=\"8\"/>\n\t\t\t<TextView x-size=\"128\" y-size=\"32\" text=\"BreadCrumb5\"/>\n\t\t\t<Space x-size=\"8\"/>\n\t\t\t<TextView x-size=\"128\" y-size=\"32\" text=\"BreadCrumb6\"/>\n\t\t\t<Space x-give=\"1\"/>\n\t\t</XList>\n\t</YList>\n</RootView>";

var res = XMLPacker.unpack(xml1);


var t = new Date().getTime();
for(var i=0;i<1000;i++){
	XMLPacker.unpack(xml1);
}
t = new Date().getTime() - t;

console.log("XML unpack timing " + t);
console.log("XML unpacking result " + JSONPacker.pack(res));

t = new Date().getTime();
for(var i=0;i<1000;i++){
	XMLPacker.pack(res);
}
t = new Date().getTime() - t;

console.log("XML pack timing " + t);
console.log("XML packing result \n" + XMLPacker.pack(res));
