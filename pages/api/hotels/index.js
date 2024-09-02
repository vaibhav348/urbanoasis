import connectDB from "@/db"; 
import Hotel from "@/models/hotel-model";



export default async function handler(req,res){
    connectDB();
    

    // for creating a hotem
    // if(req.method === "POST"){
    //     const newHotel = new Hotel(req.body);
    //     const result = await newHotel.save();
    //     res.status(201).json({msg:"Hotel Added !", result })

    // }

    if(req.method === "POST"){
        connectDB();
       try {
             const {name , description, banner, gallery, price, discount,
                facilities, location,owner} = req.body;
 
             const newProperty = new Hotel({
                 name , 
                 description, 
                 banner, 
                 gallery, 
                 price,  
                 discount, 
                 facilities,
                 location,
                 owner
             })
             const property =  await newProperty.save();
             
             return res.status(201).json({ msg :"product add successfully!" , property})
 
       } catch (error) {
        console.log("Error while in backend with adding hotels:", error);
        return res.status(500).json({msg:"Internal Server Error"});
       }

    }


    //for get hotel
    if (req.method === "GET") {
        const { city, owner } = req.query;
    
        let query = {};
    
        // Add city filter if present
        if (city) {
            query.$or = [
                { location: { $regex: city, $options: 'i' } },
                { name: { $regex: city, $options: 'i' } }
            ];
        }
    
        // Add owner filter if present
        if (owner) {
            query.owner = owner;
        }
    
        // Find hotels based on the query
        const hotels = await Hotel.find(query);
    
        if (hotels.length > 0) {
            return res.status(200).json({ msg: "Hotels found", hotels });
        }
    
        // If no hotels are found and no filters were applied, return all hotels
        if (!city && !owner) {
            const allHotels = await Hotel.find({});
            return res.status(200).json({ msg: "All hotels", hotels: allHotels });
        }
    
        // If no hotels are found and filters were applied, return an empty list
        return res.status(404).json({ msg: "No hotels found", hotels: [] });
    }
    

}