import axios from "axios"

export const getAddresshCoordinate=async(address,res)=>{

    // {
    //     "web": {
    //         "client_id": "414033608266-slqqnf60fko2icbp8c0459rsunmhi84v.apps.googleusercontent.com",
    //         "project_id": "aicallings",
    //         "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    //         "token_uri": "https://oauth2.googleapis.com/token",
    //         "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    //         "client_secret": "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",
    //         "redirect_uris": [
    //             "https://backend.aicallings.com/re-connect-google"
    //         ],
    //         "javascript_origins": [
    //             "https://app.aicallings.com"
    //         ]
    //     }
    // }


    // this is for google map api if use it 
    // const apiKey=process.env.API_KEY;
    // const url =`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    // try {
        
    //     const res = await axios.get(url);
    //     // please check your  respone accordingly
    //     console.log(res)
    //     if(res.data.status ==="ok"){
    //         const location =res.data.results[0].geometry.location;
    //         return {
    //             ltd:location.lat,
    //             lng:location.lng,
    //         }
    //     }

    // } catch (error) {
    //     console.log("eror")
    //     console.log(error)
    // }





    try {
        // Call Nominatim API for geocoding this is from chatGpt
        // const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        //   params: {
        //     q: address,
        //     format: 'json',
        //     limit: 1 // Return only the most relevant result
        //   }
        // });

        // this is from documantaiton

        const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${address}&format=json&limit=1`)

    
        if (response.data.length === 0) {
          return res.status(404).json({ error: 'Location not found' });
        }
    
        const { lat, lon } = response.data[0];

        console.log(lat,lon,response.data.length)
        
        return {
                        ltd:lat,
                        lng:lon,
                    }


      } catch (error) {
        // console.error(error);
        res.status(500).json({ error: 'Failed to fetch coordinates' });
      }

}




export const getDisTim =async(origin,destination)=>{
    if(!origin || ! destination){
        throw new Error("please give all the fields");
    }

    // const apiKey="";
    // const url=`https://maps.googleapis.com/maps/api/distancematrix/json?origin=${encodeURIComponent(address)}&distination=${encodeURIComponent(destination)}&key=${apiKey}`;

    // try {
        
    //     const respone = await axios.get(url);

    //     if(respone.data.status==="ok"){
    //         if(respone.data.row[0].elements[0].status ==="ZERO_RESULTS"){
    //             throw new Error("no routes finded");
    //         }
    //     return respone.data.row[0].elements[0];
            
    //     }else{
    //         throw new Error("error in distance component")
    //     }

    // } catch (error) {
    //     throw new Error("error in finding routes");
    // }

//     const caj ={
//         and:"this",
//         or:"that"
//     }
//     console.log("origiin")
//   console.log(origin)
//   console.log("destination")
//   console.log(destination)
//   console.log(`start=${origin.ltd},${origin.lng}`);
//   console.log(`whooooo=$${caj.and,caj.or}`)
    try {
        const apiKey = process.env.OPEN_ROUTE_API;
        const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248d73cdf5eca194792ae52641e5251ddfa&start=${origin.lng},${origin.ltd}&end=${destination.lng},${destination.ltd}`

        const response =await axios.get(url);

        // console.log(response.data.features)

        const {distance,duration} =response.data.features[0].properties.segments[0]

        if(response.status===200){
            // console.log("here inside 1")
            return {
               data:{
                distance,
                duration
               } ,
            }
        }else{
            // console.log("here inside 2")
        throw new Error("can't find the routes")
        }

    
    } catch (error) {
        console.log("error in finding the route")
    }


}