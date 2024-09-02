import connectDB from "@/db"; 
import Hotel from "@/models/hotel-model";



export default async function handler(req,res){
    // connectDB();
    

    // // for creating a hotem
    // // if(req.method === "POST"){
    // //     const newHotel = new Hotel(req.body);
    // //     const result = await newHotel.save();
    // //     res.status(201).json({msg:"Hotel Added !", result })

    // // }

    if(req.method === "POST"){
        connectDB();
          try {
              const {name , description, banner, gallery, price,discount, facilities, location, owner} = req.body;
  
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
              
              return res.status(201).json({ msg: "product add successfully!" , property})
  
          } catch (error) {
            return res.status(500).json({ msg: "error while adding hotel!"})
          }

    }

 


}