const express = require('express');
const http = require('http');
const cors = require('cors');
const socketio = require('socket.io');
const {Blockchain, systemKey, enumSysSender} = require('./src/core/blockchain');
const socketEvt = require('./src/core/sockEvt');
const app = express();
const axios = require('axios');

const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());
const server = http.createServer(app);
const io = socketio(server,{
    cors: {
      origin: [`http://localhost:3000`, `http://192.168.43.217:3000`],
      methods: ["GET", "POST"]
    }
  });

const blockchain = new Blockchain(io);

app.get('/', (req, res) => {
    res.send('hello world!!');
})

app.get('/blocks', (req,res) => {
        
    res.json(blockchain.getBlockChain());
})

app.post('/transactions', (req,res) => {
    blockchain.addTransaction((req.body));
    io.emit(socketEvt.ADD_TRANSACTION, (req.body));
    if (blockchain.checkMine()){
        blockchain.setMine(true);
        setTimeout(() => { 
            const lastBlock = blockchain.getLastBlock();
            io.emit(socketEvt.START_MINING, ({index: lastBlock.index+1,transactions: blockchain.getPendingTransactions(), timeStamp: new Date().toString(), prevHash: lastBlock.hash}));
        }, 1000);
    }
    res.json({ message: 'add transaction success' }).end();
})

app.post('/transactions/buycoin',async (req,res)=>{
    const {address, amount} = req.body;

    const systemSend = await blockchain.generateTransaction(enumSysSender.COIN_SYSTEM, address, amount, systemKey.getPrivate('hex'));
    await axios.post('http://localhost:8080/transactions', systemSend);

    res.json({ message: 'add transaction success' }).end();
})

app.get('/transactions/:address', (req,res)=>{
    res.json(blockchain.getTransactionsByAddress(req.params.address));
})

app.get('/blocks/lastblock', (req,res)=> {
    res.json({lastBlock: blockchain.getLastBlock()});
})

app.get('/hashblocks/:id', (req,res)=> {
    res.json({hash: blockchain.hashBlock(blockchain.blocks[+req.params.id])});
})

app.get('/balance/:address', (req,res)=> {
    res.json({balance: blockchain.getBalance(req.params.address)});
})

app.get('/unspentTxOuts', (req,res)=> {
    res.json({unspentTxOuts: blockchain.getUnspentTxOuts()});
})

app.get('/pendingTransactions', (req,res) => {
    res.json({pendingTransactions: blockchain.getPendingTransactions()});
})

io.on('connection', (socket) => {
    console.log(`Socket connected, ID: ${socket.id}`);
    blockchain.addNode(socket);
    socket.emit(socketEvt.ADD_NODE, {blocks: blockchain.getBlockChain(),
                                    pendingTransactions: blockchain.getPendingTransactions(),
                                    unspentTxOuts: blockchain.getUnspentTxOuts() });
    socket.on(socketEvt.BROADCAST_ENDMINING, ({result})=>{
        console.log(`broadcast ${socket.id}`);
        blockchain.setMine(false);
        blockchain.addBlock(result);
        socket.broadcast.emit(socketEvt.END_MINING, result);
        io.emit(socketEvt.UPDATE_TRANSACTION, ({}));
    })
    socket.on('disconnect', () => {
        blockchain.deleteNode(socket);
        console.log(`Socket disconnected, ID: ${socket.id}`);
    })
})

server.listen(PORT , () => { console.info(`Express server running on https://localhost:${PORT}`);})