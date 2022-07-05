# MeterDomainSDK

Nodejs SDK

Npm: https://www.npmjs.com/package/meterdomainjs

Github: https://github.com/MeterDomains/Meter-Domains-SDK

Before installing the package you need to check and be sure to install the packages below:

```
npm install web3 
```

Install Package

```
npm install meterdomainjs
```

Call 
```
const domainjs = require('meterdomainjs');
```

Set config
```
const config = 
{
	testnet:{
		rpcUrl: "",
		contractAddress: ""
	},
	mainnet:{ 
		rpcUrl: "https://rpc.meter.io/",
		contractAddress: "0xc518477643732dfccdc78f4e8484cc6ee44900bb"
	},
	defaultNetwork: "mainnet"
}
```

Install

```
const sdk = domainjs.SDK(config);
```
```
// your domains
const _domain = "meter.mtr";
	
// resolve domain to get the address of the owner.
const owner = await sdk.getOwner(_domain);

console.log(owner);

// your address
const _address = "0x5aEa3F3f358347Abf94B554389174F966faeEfbB";

// get a domain default from a user's address, requiring the user to set the default domain name initially.
const domain = await sdk.getDomain(_address);

console.log(domain);
```
Pls update test.js for specific instructions

Thanks!



