let block = require('./Block');
const { timestamp, prevhash } = require('./genesisblock');
let hashgenerator = require('./hashgenerator');

class blockchain {
    constructor(){
        this.blockchain_array = [block.genesis()];
    }

    add_block({data}){
        const new_Block = block.mineblock({
            prevBlock:this.blockchain_array[this.blockchain_array.length - 1],
            data
        });
        this.blockchain_array.push(new_Block);
    }
    static isValidChain(chain){
        if(JSON.stringify(chain[0])!==JSON.stringify(block.genesis())){
            return false;
        }
        for(let i = 1;i<chain.length;i++){
            let hash1 = chain[i].prevhash;
            let hash2 = chain[i-1].hash;

            if(hash1===hash2){
                return true;
            }
            const checkHash = hashgenerator(
                timestamp,
                prevhash,
                data
            );
            if (hash === checkHash){
                return true;
            }
        }
    }
    replaceChain(chain) {
        if (chain.length <= this.blockchain_array.length) {
            console.error("The incoming chain is not longer");
            return;
        }
        if (!blockchain.isValidChain(chain)) {
        console.error("The incoming chain is not valid");
        return;
        }
        this.blockchain_array = chain;
    }
}

// const myBlockchain = new blockchain();
// myBlockchain.add_block({ data: "First transaction data" });
// myBlockchain.add_block({ data: "Second transaction data" });
// console.log(myBlockchain);

//block.valueofdifficulty(blockchain.adjustDifficulty(myBlockchain.blockchain_array));



//const result = blockchain.adjustDifficulty(myBlockchain.blockchain_array);
// console.log(result);


module.exports = blockchain;