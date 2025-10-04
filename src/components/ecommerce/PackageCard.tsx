// import Badge from "../ui/badge/Badge";
import { PackageSummary } from "../../types/packagesSummary";

// interface PackageCardProps {
//     statusName: string;
//     count: number;
//     totalCOD: string;
//     icon: React.ElementType;
//     badgeColor: "success" | "error" | "warning" | "info";
// }

export default function PackageCard(
    // { 
//     statusName, 
//     count, 
//     totalCOD, 
//     icon: Icon, 
//     badgeColor 
// }: PackageCardProps

    {
        id,
        userId,
        title,
        completed,
    }:PackageSummary
)
 {
    
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            {/* <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                <Icon className="text-gray-800 size-6 dark:text-white/90" />
            </div> */}
            
            {/* <div className="flex items-end justify-between mt-5">
                <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {statusName}
                    </span>
                    <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                        {count}
                    </h4>
                </div>
                
                <div className="text-right">
                    <Badge color={badgeColor}>
                        {totalCOD}
                    </Badge>
                </div>
            </div> */}

            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                <span className="text-gray-800 size-6 dark:text-white/90" > {completed?  "✅  ": "❌ "} </span>
            </div>
            <div className="flex items-end justify-between mt-5">
                <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {title}
                    </span>
                    <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                        {id}
                    </h4>
                </div>
                
                <div className="text-right">
                    {/* <Badge color={badgeColor}> */}
                        {userId}
                    {/* </Badge> */}
                </div>
            </div>
        </div>
    );
}
