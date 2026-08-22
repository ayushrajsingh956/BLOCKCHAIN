const redis = require('redis');

const Channels = {
    TEST:'TEST',
    BLOCKCHAIN : 'BLOCKCHAIN'
};
class PubSub{
    constructor({blockchain}){
        this.blockchain = blockchain;
        this.publisher = redis.createClient();
        this.subscriber = redis.createClient();

        this.subscriber.subscribe(Channels.TEST);
        this.subscriber.subscribe(Channels.BLOCKCHAIN);

        this.subscriber.on('message',(channel,message) =>
            this.handle_message(channel,message))
    }

    handle_message(channel,message){
        console.log(`Message recevied. Channel: ${channel} and Message${message}`);
        const praseMessage = JSON.parse(message);

        if(channel === Channels.BLOCKCHAIN){
            this.blockchain.replaceChain(praseMessage);
        }
    }

    publish({channel,message}){
        this.publisher.publish(channel,message);
    }

    broadcastMessage(){
        this.publish({
            channel:Channels.BLOCKCHAIN,
            message:JSON.stringify(this.blockchain.blockchain_array)
        })
    }
}

// const checkPubsub = new PubSub();
// setTimeout(
//     () => checkPubsub.publisher.publish(Channel.TEST,' My first Redis code is running well.'),
//     1000
// );
module.exports = PubSub;