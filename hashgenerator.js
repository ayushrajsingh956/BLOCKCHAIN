const crypto = require("crypto");

const cryptohash = (...inputs) =>{
    const hash = crypto.createHash("sha256");
    hash.update(inputs.sort().join(""));
    return hash.digest("hex");
};

//result = cryptohash("I am working on blockchain",'and Iwant to be blockchain developer');
//console.log(result);
module.exports = cryptohash;