const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');


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
        app.get('/service', async (req, res) => {
            const quary = {};
            const service = await productCollection.find(quary).toArray();
            res.send(service);
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