import api from "../config/api";
import { VerficationStatuse } from "../types/verfication";

export async function VerficationService():Promise<VerficationStatuse>{
    try{
       
        const response = await api.get("/auth/2fa/setup");
        const result = response.data;
        return result;
    }
    catch(error){
        console.log(error);
        return {} as VerficationStatuse;
    }
}