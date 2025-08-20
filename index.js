const express =require('express')
const cors =require('cors')
const app =express()
const port =process.env.PORT || 5000

//middleware 

app.use(cors())
app.use(express.json())





const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://shakibhasan1070:4TePn1tCGPyf7sdK@cluster0.n6dx8hf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
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



    const database =client.db('CUCC');
    const membersCollection =database.collection('members');


    app.post('/members',async(req,res)=>{
    const member = req.body;
    console.log( member); 
    const result = await membersCollection.insertOne(member);
    res.send(result);
    
    })


    app.get('/members',async(req,res)=>{
        const cursor = membersCollection.find()
        const result = await cursor.toArray()
        res.send(result)  
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);




app.get('/',(req,res)=>{
    res.send('This is cucc server')
})

app.listen(port,()=>{
    console.log(`Cucc server is running on port ${port}`);
})




 









//
/*
const [formData, setFormData] = useState({
    name: "",
    id: "",
    batch: "",
    section: "",
    yearSemester: "",
    dateOfBirth: "",
    gender: "",
    shift: "",
    bloodGroup: "",
    religion: "",
    mobile: "",
    whatsapp: "",
    presentAddress: "",
    permanentAddress: "",
    emergencyContact: "",
    email: "",
    fieldOfInterest: [],
    technicalSkills: [],
    extraCurricular: [],
    otherField: "",
    otherSkill: "",
    otherActivity: "",
  });

  const [showOtherField, setShowOtherField] = useState(false);
  const [showOtherSkill, setShowOtherSkill] = useState(false);
  const [showOtherActivity, setShowOtherActivity] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (e, field) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const updated = checked
        ? [...prev[field], value]
        : prev[field].filter((v) => v !== value);
      return { ...prev, [field]: updated };
    });

    if (field === "fieldOfInterest" && value === "Others") {
      setShowOtherField(checked);
    }
    if (field === "technicalSkills" && value === "Others") {
      setShowOtherSkill(checked);
    }
    if (field === "extraCurricular" && value === "Others") {
      setShowOtherActivity(checked);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Form submitted successfully!");
      } else {
        alert("Failed to submit form.");
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting form.");
    }
  };

*/





