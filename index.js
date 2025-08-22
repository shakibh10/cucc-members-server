const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://shakibhasan1070:4TePn1tCGPyf7sdK@cluster0.n6dx8hf.mongodb.net/?retryWrites=true&w=majority";

// MongoDB Client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const database = client.db("CUCC");
    const membersCollection = database.collection("members");

    // GET all members
    app.get("/members", async (req, res) => {
      try {
        const members = await membersCollection.find().toArray();
        res.json(members);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
      }
    });

    // POST → add new member
    app.post("/members", async (req, res) => {
      const member = req.body;

      try {
        const existing = await membersCollection.findOne({ id: member.id });
        if (existing) {
          return res.status(400).json({ error: "This ID is already registered" });
        }

        const result = await membersCollection.insertOne(member);
        res.status(201).json({ success: true, result });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
      }
    });

    // DELETE → delete member
    app.delete("/members/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const result = await membersCollection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
          return res.status(404).json({ error: "Member not found" });
        }

        res.json({ success: true });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
      }
    });

    // PUT → update member
    app.put("/members/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const updatedMember = { ...req.body };
        delete updatedMember._id; // remove _id to prevent MongoDB error

        const result = await membersCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updatedMember }
        );

        if (result.matchedCount === 0) {
          return res.status(404).json({ error: "Member not found" });
        }

        res.json({ success: true });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
      }
    });

    console.log("✅ MongoDB connected and server is ready!");
  } finally {
    // Connection remains open
  }
}
run().catch(console.dir);

// Root route
app.get("/", (req, res) => {
  res.send("CUCC Server is running");
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
