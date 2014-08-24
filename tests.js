
var XMLPacker = require("simple-xml-packer");
var JSONPacker = require("simple-packer");


var xml1 = "<RootView>\n\t<YList>\n\t\t<XList >\n\t\t\t<Space x-give=\"1\"/>\n\t\t\t<TextView x-size=\"128\" y-size=\"32\" text=\"BreadCrumb1\"/>\n\t\t\t<Space x-size=\"8\"/>\n\t\t\t<TextView x-size=\"128\" y-size=\"32\" text=\"BreadCrumb2\"/>\n\t\t\t<Space x-size=\"8\"/>\n\t\t\t<TextView x-size=\"128\" y-size=\"32\" text=\"BreadCrumb3\"/>\n\t\t\t<Space x-give=\"1\"/>\n\t\t\t<TextView x-size=\"128\" y-size=\"32\" text=\"BreadCrumb4\"/>\n\t\t\t<Space x-size=\"8\"/>\n\t\t\t<TextView x-size=\"128\" y-size=\"32\" text=\"BreadCrumb5\"/>\n\t\t\t<Space x-size=\"8\"/>\n\t\t\t<TextView x-size=\"128\" y-size=\"32\" text=\"BreadCrumb6\"/>\n\t\t\t<Space x-give=\"1\"/>\n\t\t</XList>\n\t</YList>\n</RootView>";

var res = XMLPacker.unpack(xml1);

console.log("XML unpacking result " + JSONPacker.pack(res));
