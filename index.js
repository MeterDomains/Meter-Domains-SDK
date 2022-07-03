const Web3 = require('web3');

const contract = require('./contracts/abi.json');

const abi = contract.abi;

const config = 
{
	testnet:{
		rpcUrl: "",
		contactAddress: ""
	},
	mainnet:{ 
		rpcUrl: "https://rpc.meter.io/",
		contactAddress: "0xc518477643732dfccdc78f4e8484cc6ee44900bb"
	},
	defaultNetwork: "mainnet"
}

const defaultKeys = ["avatar","cover","website","email","social:twitter","social:facebook","social:telegram","social:discord","social:instagram"];

var exports=module.exports={};

exports.SDK = function (options) {
	
	var _config = config;
	if (options){
		_config  = options;
	}
	
	var rpcUrl = _config.testnet.rpcUrl;
	var contractAddress = _config.testnet.contactAddress;
	if (_config.defaultNetwork == 'mainnet'){
		rpcUrl = _config.mainnet.rpcUrl;
		contractAddress = _config.mainnet.contactAddress;
	}

	const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));
	
	const contractFirst = new web3.eth.Contract(abi, contractAddress);
	
	const func = new Object();
	
	func.balanceOf = async (address) => 
	{
		const balance = await contractFirst.methods.balanceOf(address).call();
		return balance;
	}
	
	
	func.getOwner = async (domain, metadata = false) => 
	{
		const ownerAddress = await contractFirst.methods.getOwner(domain).call();
		const addr = iotex.from(ownerAddress).string();
		const obj = new Object();
		obj.owner = ownerAddress;
		obj.native = addr;
		var arg = [];
		if (metadata == true){
			const tokenId = await contractFirst.methods.genTokenId(domain).call();
			const values = await contractFirst.methods.getMany(defaultKeys, tokenId).call();

			for (let i = 0; i < defaultKeys.length; ++i) {
				const _obj = new Object();
				_obj.key = defaultKeys[i];
				_obj.value = values[i];
				arg.push(_obj)
			}
		}
		obj.metadata = arg;
		return obj;
	}
	
	func.getDomain = async (address) => 
	{
		const defaultDomain = '';
		try{
			defaultDomain = await contractFirst.methods.reverseOf(address).call();
		}catch{}
		return defaultDomain;
	}
  
    func.getDomains = async (address) => 
	{
		const domains = [];
		try{
			const arg = await contractFirst.methods.getDomainbyAddress(address).call();
			return arg.domains;
		}catch{}
		return domains;
	}
	
	func.getMetadata = async (key, domain) => 
	{
		const tokenId = await contractFirst.methods.genTokenId(domain).call();
		var value = await contractFirst.methods.get(key, tokenId).call();
		var obj = new Object();
		obj.key = key
		obj.value = value
		return obj;
	}
	
	func.getMetadatas = async (keys, domain) => 
	{
		const tokenId = await contractFirst.methods.genTokenId(domain).call();
		const values = await contractFirst.methods.getMany(keys, tokenId).call();
		var arg = [];
		for (let i = 0; i < keys.length; ++i) {
			var obj = new Object();
			obj.key = keys[i];
			obj.value = values[i];
			arg.push(obj)
		}
		return arg;
	}
	
	func.hashname = async (domain) => 
	{
		const hash = await contractFirst.methods.genTokenId(domain).call();
		return hash;
	}
	
	return func;	
}

