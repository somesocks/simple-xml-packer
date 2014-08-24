
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
		console.log("parser error " + error);
	};

	parser.ontext = function(text){
		console.log("parser text " + text);
	};

	parser.onopentag = function(node){
		console.log("parser onopentag " + JSONPacker.pack(node));

		var obj = {};
		Types.setType(obj,node.name);
		obj.children = [];

		for (key in node.attributes){
			obj[key] = node.attributes[key];
		}

		stack.push(obj);
	};

	parser.onattribute = function(attr){
		console.log("parser onattribute " + JSONPacker.pack(attr));

		//var obj = stack.pop();
		//obj[attr.name] = attr.value;
		//stack.push(obj);
	};

	parser.onclosetag = function(name){
		console.log("parser onclosetag " + name);

		var obj = stack.pop();
		var unpacker = unpackers[Types.getType(obj)];
		if(unpacker){obj = unpacker(obj);}

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
};

module.exports = Packer;
