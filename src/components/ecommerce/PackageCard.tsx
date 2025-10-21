 import Badge from "../ui/badge/Badge";
 import { PackageSummary } from "../../types/packagesSummary";
 import { BoxIcon } from "../../icons";

export default function PackageCard({ 
   code, collectionAmount ,count
}: PackageSummary) {
    
    return (
        
        <div className="flex  rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div className="flex items-center justify-center w-18 h-18 bg-gray-100 rounded-xl dark:bg-gray-800">
                <BoxIcon  className="text-gray-800 size-12 dark:text-white/90" ></BoxIcon> 
            </div>
            
            <div className="flex flex-col ml-5">
                <div className="flex flex-row justify-between  ">
                    <span className=" flex items-start  font-bold text-gray-800 text-title-sm dark:text-white/90">
                        {count}
                    </span>
                    <span className="flex items-end  font-bold text-gray-800 text-title-sm dark:text-white/90">
                        <Badge color={"success"} > 
                            {collectionAmount} 
                        </Badge>
                        
                    </span>
                </div>
                
                <div className="text-left">
                    <span className="text-md text-gray-500 dark:text-gray-400">
                        {code}
                    </span>
                </div>
            </div>
        </div>
         
    );
}
