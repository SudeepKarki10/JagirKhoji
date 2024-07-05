// // pages/api/createUser.js

// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI; // Replace with your MongoDB connection string
// const client = new MongoClient(uri!);

// export default async function handler(req: any, res: any) {
//   if (req.method === "POST") {
//     try {
//       await client.connect(); //to connect to the mongodb server
//       const database = client.db("JobKhoj"); // Replace with your database name
//       const Jobs = database.collection("Jobs"); // Replace with your collection name

//       const jobData = await req.body;

//       if (!jobData) {
//         res.status(400).json({ message: "Invalid request" });
//       } else {
//         const jobCreated = await Jobs.insertOne(jobData);
//       }
//     } catch (error) {
//       res.status(500).json({ error: "Error creating user" });
//     }
//   }
//   if (req.method === "GET") {
//     try {
//       await client.connect(); //to connect to the mongodb server
//       const database = client.db("JobKhoj"); // Replace with your database name
//       const Jobs = database.collection("Jobs"); // Replace with your collection name

//       const jobs = await Jobs.find({}).toArray();
//       res.status(200).json(jobs);
//     } catch (error) {
//       res.status(500).json({ error: "Error fetching jobs" });
//     }
//   } else {
//     res.status(405).json({ message: "Method not allowed" });
//   }
// }
