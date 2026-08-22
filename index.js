const Blockchain = require('./Blockchain');
const express = require("express");
const body_Parser = require("body-parser");
const PubSub = require('./publishsubscribe');
const request = require("request");

const app = express();
const blockchain = new Blockchain();
const pubsub = new PubSub({blockchain});

const Default_Port = 3000;
let ROOT_NODE_ADDRESS = `http://localhost:${Default_Port}`;

setTimeout(() =>
    pubsub.broadcastMessage(), 1000);

app.use(body_Parser.json());
app.get("/api/blocks", (request,responce) => {
    responce.json(blockchain.blockchain_array)
});

app.post("/api/mine" , (request,responce)=>{
    const {data} = request.body;

    blockchain.add_block({data});
    pubsub.broadcastMessage();
    responce.redirect("/api/blocks");
})

const synChains = () => {
  request(
    { url: `${ROOT_NODE_ADDRESS}/api/blocks` },
    (error, reposnse, body) => {
      if (!error && reposnse.statusCode === 200) {
        const rootChain = JSON.parse(body);
        console.log("Replace chain on sync with", rootChain);
        blockchain.replaceChain(rootChain);
      }
    }
  );
};

let peer_port;
if (process.env.GENERATE_PEER_PORT === "true") {
  peer_port = Default_Port + Math.ceil(Math.random() * 1000);
}

const Port = peer_port||Default_Port;
app.listen(Port,() =>{
    console.log(`listing to PORT:${Port}`);
    synChains();
})