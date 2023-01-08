import clientPromise from "../../lib/mongodb";

export default async function handler(req: any, res: any) {
  try {
    const client = await clientPromise;
    const db = client.db("xsauce-telegram");
    const timeline = req.body.duration;
    let limit:number;
    if (timeline === 'daily') {
        limit = 12
    }
    if (timeline === 'weekly') {
        limit = 8
    }
    const search = async () => {
      const search = await db
      .collection("index_stats")
      .find({name:req.body.name})
      .sort({date:1})
      .limit(limit)
      .toArray();
      return res.json(search)
    }
    
   return search()
   

  } catch (e: any) {
    res.status(500).send({ message: e.message });
  }
}
