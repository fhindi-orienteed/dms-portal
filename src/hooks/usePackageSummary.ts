
import { PackageSummary } from "../types/packagesSummary";
import { getPackages } from "../services/packageService";
import { useEffect, useState } from "react";
// import { Package } from "../types/packages";

export function usePackages(){
    const [packages, setPackages] = useState<PackageSummary> ({} as PackageSummary);
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
//*********************************************************** */
// // src/hooks/usePackageSummary.ts
// import { useState, useEffect } from "react";
// import { getPackages } from "../services/packageService";
// import { PackageSummary } from "../types/packagesSummary";

// export function usePackageSummary() {
//   const [packages, setPackages] = useState<PackageSummary[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function loadPackages() {
//       try {
//         setLoading(true);
//         const data = await getPackages(); // call service
//         setPackages(data);
//         setError(null);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load packages");
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadPackages();
//   }, []);

//   return { packages, loading, error };
// }
