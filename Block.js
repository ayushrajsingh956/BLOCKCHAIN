let GenesisBlock = require('./genesisblock');
const Hashgenerator = require('./hashgenerator');

let difficulty_number;
class Block{
    constructor({timestamp,prevhash,hash,data,nonce,difficulty}){
        this.timestamp = timestamp;
        this.prevhash = prevhash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    static genesis(){
        return new this(GenesisBlock);
    }

    static mineblock({prevBlock,data}){
        let hash,timestamp;
        const prevhash = prevBlock.hash;
        let difficulty;



        let nonce = 0
        do{
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty({
                originalBlock: prevBlock,
                timestamp,
            });
            hash = Hashgenerator(timestamp,prevhash,data,nonce,difficulty)
        } while(hash.substring(0, difficulty) !== '0'.repeat(difficulty));                  
        
        return new this ({
            timestamp,
            prevhash,
            data,
            hash,
            nonce,
            difficulty
        });
    }
    // static adjustdifficulty(currunttime,prevBlocktime){
    //     let diff_maker = 0;
    //     let timedifference =currunttime - prevBlocktime.timestamp;
    //     if( timedifference <= 1000){
    //         return diff_maker + 1;
    //     }
    //     else if(timedifference > 1000){
    //         return difficulty - 1;
    //     }
    //     console.log(diff_maker);
    // }
    static adjustDifficulty({ originalBlock, timestamp }) {
        const { difficulty } = originalBlock;
        if (difficulty < 1) return 1;
        const difference = timestamp - originalBlock.timestamp;
        if (difference > 1000) return difficulty - 1;
        return difficulty + 1;
    }
}


const block1 = new Block({
    timestamp:2,
    prevhash:'32433x3r45f65v65vhcg34x2',
    data:'evivbrivi',
    hash:'0000x02042rfj9ff49f4hvn494845666',
    difficulty: 3
})



// const genesisBlock = Block.genesis();
// console.log(genesisBlock);

// const result = Block.mineblock({prevBlock:block1,data:'second block'});
// console.log(result);

module.exports = Block;
