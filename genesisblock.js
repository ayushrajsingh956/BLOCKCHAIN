let Initial_DIfficulty = 1;
const MINE_RATE = 1000;
const genesis_data = {
    timestamp : Date.now(),
    prevhash : '0000000000000000000000x00',
    data : 'First Block',
    hash : '03123hkgferkf2289r0hsdfw78t',
    nonce : 0,
    difficulty : Initial_DIfficulty
};

module.exports = genesis_data;