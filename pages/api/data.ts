import clientPromise from "../../lib/mongodb";

export default async function handler(req: any, res: any) {
  try {
    const client = await clientPromise;
    const db = client.db("xsauce-telegram");
    const timeline = req.body.duration;

    const searchFunction = async () => {
      if (timeline === "daily") {
        const daily = await db
          .collection("index_stats")
          .find({ name: req.body.name })
          .sort({ date: -1 })
          .limit(12)
          .toArray();
        daily.reverse();
        return res.json(daily);
      }
      // if (timeline === "3 Day") {
      //   const weekly = await db
      //     .collection("index_stats")
      //     .find({ name: req.body.name })
      //     .sort({ date: -1 })
      //     .limit(35)
      //     .toArray();
      //   weekly.reverse();
      //   return res.json(weekly);
      // }
    };

    return searchFunction();
  } catch (e: any) {
    res.status(500).send({ message: e.message });
  }
}

//To remove duplicates

// for(let x = 0; x < search.length; x++) {
//   let targetDate = search[x].date
//   let targetId = search[x].time
//   console.log(targetDate, targetId)

//   for(let y = x + 1; y < search.length; y++) {
//     if (targetDate === search[y].date) {
//       db.collection("index_stats")
//       .deleteMany({"time": targetId})
//     }
//   }
// }
