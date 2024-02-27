// Import required packages
import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';

// Initialize the Express application
const app = express();
const port = 3000; 

// In the MongoDB Atlas connection string. Replace '<password>' with your actual password
const connectionString = 'mongodb+srv://sfel:AnAQg22HjNH9hriC@cluster0.bwtipah.mongodb.net/?retryWrites=true&w=majority';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(connectionString, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);

// Connect to MongoDB Atlas
// connect(connectionString, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => {
//   console.log('connection sucessful');
// })
// .catch(err => {
//   console.error('Connection error', err);
// });

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the Express server
app.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}`);
});