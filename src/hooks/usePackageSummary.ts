
import { PackageSummary } from "../types/packagesSummary";
import { getPackages } from "../services/packageService";
import { useEffect, useState } from "react";

export function usePackages(){
    const [packages, setPackages] = useState<PackageSummary[]> ([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null >(null);

    useEffect(()=>{
        async function loadPackages(){
            try{
                const data = await getPackages();
                setPackages(data);
            }
            catch(err){
                setError(err as Error);
            }
            finally{
                setLoading(false);
            }
        } 
        loadPackages();
    } , []);
    return {packages,loading,error};
}