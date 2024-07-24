// Option Factory Address
export const optionFactory = "0xd42FdE6daCDCC075c44C1977b57d1a3Fcd0fe8c6";

// Testnet Note Address
export const noteAddress = "0x03F734Bd9847575fDbE9bEaDDf9C166F880B5E5f";

// Testnet Tokens Mapping 
export const tokenMapping : { [key : string] : string } = {
    "0xCa03230E7FB13456326a234443aAd111AC96410A" : "ETH",
    "0x04a72466De69109889Db059Cb1A4460Ca0648d9D" : "WCANTO",
    "0x40E41DC5845619E7Ba73957449b31DFbfB9678b2" : "ATOM"
}

// Reverse Testnet Tokens Mapping
export const reverseTokenMapping : { [key : string] : string } = {
    "ethereum" : "0xCa03230E7FB13456326a234443aAd111AC96410A",
    "wcanto" : "0x04a72466De69109889Db059Cb1A4460Ca0648d9D",
    "atom" : "0x40E41DC5845619E7Ba73957449b31DFbfB9678b2"
}

// Pyth Price IDs
export const cantoPythId = "0x972776d57490d31c32279c16054e5c01160bd9a2e6af8b58780c82052b053549";
export const ethPythId = "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace";
export const atomPythId = "0xb00b60f88b03a6a625a8d1c048c3f66653edf217439983d037e7222c4e612819";