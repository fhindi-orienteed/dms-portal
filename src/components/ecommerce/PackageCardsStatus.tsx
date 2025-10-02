import {
   DeliveredPackage,
  PendingPackage,
  ReturnedPackage,
} from "../../icons";


const packageStatus = [
    { statusName: "In Transit", count: 10, totalCOD: "500$" ,icon:   DeliveredPackage},
    { statusName: "Delivered", count: 5, totalCOD: "200$",icon:DeliveredPackage },
    { statusName: "Pending Pickup", count: 3, totalCOD: "100$",icon:  PendingPackage},
    { statusName: "Returned", count: 2, totalCOD: "50$" ,icon:ReturnedPackage},
    { statusName: "Returned", count: 2, totalCOD: "50$" ,icon:ReturnedPackage},
    { statusName: "Returned", count: 2, totalCOD: "50$" ,icon:ReturnedPackage},
];

function PackageCard (){
   
    {
        return(
            <>
                <h3 className="text-lg mb-2 font-semibold text-gray-800 dark:text-white/90">Active packeges status</h3>
                <div className="grid grid-cols-1  gap-4 sm:grid-cols-2  md:grid-cols-4 lg:grid-cols-5 md:gap-6 bg-gray"> 
                    { 
                        packageStatus.map((status , index) => {
                            const StatusIcon: React.ElementType = status.icon;
                            return(
                                <div key={index} className="rounded-2xl border border-gray-200 bg-red p-5 dark:border-gray-800 bg-white dark:bg-white/[0.03] md:p-6">
                                    <div className="rounded-xl w-12 h-12 bg-gray-100 flex items-center justify-center">
                                        <StatusIcon className="text-gray-800 size-6 "/>
                                    </div>
                                    
                                    <div className=" mt-5 flex items-end justify-between">
                                        <div>
                                            <span className="text-sm text-gray-500  dark:text-white/90">{status.statusName}</span>
                                            <h4  className="text-lg font-bold text-gray-800  text-title-sm mt-2 dark:text-white/90"> {status.count}</h4>
                                        </div>
                                        
                                        <h4 className="text-lg font-bold text-gray-800 mt-2 text-title-sm dark:text-white/90">{status.totalCOD}</h4>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div> 
            </>
        );
    }
}

export default function StatusCards(){
    
    return(
        <PackageCard/>
    );
}