import { useEffect, useState } from "react";
import { VerficationService } from "../services/verficationService";
import { VerficationStatuse } from "../types/verfication";

export default function UseVerfication(){
    const [verficatinStatus, setVerficationStatus] = useState<VerficationStatuse| null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError ] = useState<string | null>(null );

    useEffect(()=>{
        async function LoadVerficationStatus(){
            try{
                const data = await VerficationService();
                setVerficationStatus( data);
                
                //**try if the response is true**//

                // const fakeResponse: VerficationStatuse = {
                // qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?data=test",
                // newlyGenerated: true, // 👈 force it to be true for testing navigation
                // };
                // await new Promise((resolve) => setTimeout(resolve, 500));

                // setVerficationStatus(fakeResponse);
            }
            catch(error){
                setError(error as string);
            }
            finally{
                setLoading(false)
            }
        }
        LoadVerficationStatus();
    },[]);
    return {verficatinStatus,loading,error}
}

