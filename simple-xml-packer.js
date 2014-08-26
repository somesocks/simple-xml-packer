
var SAX = require("sax");
var Types = require("simple-types");
var JSONPacker = require("simple-packer");

var Packer = {};

Packer.TYPE_TAG = Types.TAG;
Packer.CHILD_TAG = "children";

var packers = {};
var unpackers = {};

Packer.register = function(type, packer, unpacker){
	packers[type] = packer;
	unpackers[type] = unpacker;
};


Packer.unpack = function(xml){
	var parser = SAX.parser(true);
	
	var stack = [];	

	parser.onerror = function(error){
		//console.log("parser error " + error);
	};

	parser.ontext = function(text){
		//console.log("parser text " + text);
	};

	parser.onopentag = function(node){
		//console.log("parser onopentag " + JSONPacker.pack(node));
		node.children = [];
		stack.push(node);
	};

	parser.onattribute = function(attr){
		//console.log("parser onattribute " + JSONPacker.pack(attr));
	};

	parser.onclosetag = function(name){
		//console.log("parser onclosetag " + name);
		var obj = stack.pop();

		var unpacker = unpackers[obj.name];
		if(unpacker){obj = unpacker(obj.name,obj.attributes,obj.children);}

		var parent = stack.pop();
		if(parent){
			parent.children.push(obj);
			stack.push(parent);
		}else{
			stack.push(obj);
		}
	};

	parser.write(xml).close();

	return stack.pop();
};

Packer.pack = function(obj){

	var name = Types.getType(obj);
	if(!name){
		name = obj.name;
	}

	var packer = packers[name];
	
	if(packer){obj = packer(obj)};

	var xml = "";

	xml = xml + "<" + name;

	var attributes = obj.attributes;
	for(key in attributes){
		if(attributes.hasOwnProperty(key)){
			xml = xml + " " + key + "=\"" + attributes[key] + "\"";
		}
	}

	if(obj.children.length > 0){
		xml = xml +">\n";

		for(var i=0;i<obj.children.length;i++){
			xml = xml + Packer.pack(obj.children[i]);
		}

		xml = xml +"</" + name + ">\n";
	}else{
		xml = xml + " />\n";
	}

	return xml;
};




module.exports = Packer;
