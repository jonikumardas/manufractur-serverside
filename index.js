const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const res = require('express/lib/response');


// medile were 
app.use(cors());
app.use(express.json())
// medile were has done
const uri = `mongodb+srv://${process.env.USER_name}:${process.env.DB_password}@cluster0.mbpwyuz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const productCollection = client.db("manufractur").collection("product");
        const orderCollection = client.db("manufractur").collection("order");
        const adminCollection = client.db("manufractur").collection("admin");
        app.get('/service', async (req, res) => {
            const quary = {};
            const service = await productCollection.find(quary).toArray();
            res.send(service);
        })
        app.post('/order', async (req, res) => {
            const requst = req.body;
            const result = await orderCollection.insertOne(requst);
            res.send(result);
            console.log(result);
        })
        app.get('/orders', async (req, res) => {
            const quary = {};
            const order = await orderCollection.find(quary).toArray();
            res.send(order);
        })
        app.post('/email', async (req, res) => {
            const requst = req.body;
            const result = await adminCollection.insertOne(requst);
            res.send(result);
            console.log(result);
        })

        app.get('/admin', async (req, res) => {
            const quary = {};
            const order = await adminCollection.find(quary).toArray();
            res.send(order);
        })
    } finally {
        // client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello react js!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})