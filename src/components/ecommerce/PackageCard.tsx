import Badge from "../ui/badge/Badge";

interface PackageCardProps {
    statusName: string;
    count: number;
    totalCOD: string;
    icon: React.ElementType;
    badgeColor: "success" | "error" | "warning" | "info";
    userId?: number;
    title?: string;
    completed?: boolean;
}

export default function PackageCard({ 
    statusName, 
    count, 
    totalCOD, 
    icon: Icon, 
    badgeColor
}: PackageCardProps) {
    
    return (
        <div className="flex  rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div className="flex items-center justify-center w-18 h-18 bg-gray-100 rounded-xl dark:bg-gray-800">
                <Icon className="text-gray-800 size-12 dark:text-white/90" />
            </div>
            
            <div className="flex flex-col ml-5">
                <div className="flex flex-row justify-between  ">
                    <h4 className=" flex items-start  font-bold text-gray-800 text-title-sm dark:text-white/90">
                        {count}
                    </h4>
                    <span className="flex items-end  w-8 text-center">
                        <Badge color={badgeColor} >
                            {totalCOD}
                        </Badge>
                    </span>
                </div>
                
                <div className="text-left">
                    <span className="text-lg text-gray-500 dark:text-gray-400">
                        {statusName}
                    </span>
                </div>
            </div>
        </div>
    );
}
