import Input from "../../components/form/input/InputField";
import { SearchIcon } from "../../icons";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Merchant } from "../../types/merchant";
import { UserCircleIcon } from "../../icons"; 
import { PageMeta } from "../../components/common";

const status = [
    "All status",
    "Pending",
     "In Transit",
      "Delivered", 
      "Failed"
    ];
const merchantList :Merchant[] =[
    {
        merchantName:"Ali Ahmad",
        mainAddress:"Jenin",
        createdDate:"20/3/2025",
        branchCount:5002,
        userCount:7,
        status:"Delivered",
        totalPackage:17,   
    },
    {
        merchantName:"khaled Ahmad",
        mainAddress:"Nablus",
        createdDate:"20/3/2025",
        branchCount:5003,
        userCount:2,
        status:"Failed Delivery",
        totalPackage:7,   
    },
    {
        merchantName:"Omar ",
        mainAddress:"Nablus",
        createdDate:"20/5/2025",
        branchCount:5007,
        userCount:7,
        status:"In Transit",
        totalPackage:5,   
    },
    {
        merchantName:"Othman",
        mainAddress:"Nablus",
        createdDate:"15/3/2025",
        branchCount:5009,
        userCount:7,
        status:"Pending",
        totalPackage:17,   
    }
];
export default function List(){
    const [searchTerm, setSearchTerm] = useState("");
    const [merchants] = useState<Merchant[]>(merchantList);
    const [filterInput,setFilterInput] = useState("");
    const { t } = useTranslation();

    const filteredMerchants = useMemo(()=>{
        return merchants.filter(mer =>{
            const matchesSearch = 
                mer.merchantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                mer.branchCount.toString().includes(searchTerm.toString())||
                mer.mainAddress.toLowerCase().includes(searchTerm.toLowerCase());

            const statusFilterResult = mer.status.toString().includes(filterInput) || filterInput === "All status";
            return matchesSearch && statusFilterResult;    
           
        });
    });
    return (
        <>
            <PageMeta 
                title={`${t('merchants.allMerchants')} | TailAdmin - React.js Admin Dashboard Template`} 
                description={`${t('merchants.allMerchants')} - TailAdmin - React.js Tailwind CSS Admin Dashboard Template`}
            />
            <h2 className="text-xl font-semibold text-gray-800  flex flex-col pl-6 pr-6 dark:text-white/90"> All Merchants </h2>
            <div className="bg-white rounded-lg h-1000px border border-gray-200 mt-6 dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="flex flex-col pl-6 pr-6">
                    <span className ="mt-2">All merchants</span>
                    <p className="text-sm text-gray-500 mt-1">4 merchants found</p>
                    <hr className="mt-6 text-gray-100"></hr>
                {/* inputs */}
                <div className="flex justify-between ">
                    {/* search input */}
                    <div className="relative flex-1 max-w-md mt-4">
                        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                        <Input
                            type="text"
                            placeholder={t('common.search')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    {/* search input */}

                    
                    {/* status filter */}
                    <select className="relative flex-1 max-w-sm mt-4 border border-gray-200 rounded-lg text-md text-gray-800 w-[30%]"
                        value={filterInput}
                        onChange={(e)=> setFilterInput(e.target.value) } >
                        {status.map((state) =>(
                            <option value={state}>{state}</option>
                        ))}
                    </select>
                    {/* status filter */}

                
                  
                </div>
                {/* inputs */}
                
                {/* list of merhants */}
                <div className="border border-gray-200 mt-8 mb-8 rounded-lg" >
                    {/* headers */}
                    <div className="text-sm text-gray-500 flex flex-row justify-center p-2">
                        <div className="flex flex-1 text-center">Merchant Name</div>
                        <div className="flex flex-1 text-center">Main Address</div>
                        <div className="flex flex-1 text-center">Created Date</div>
                        <div className="flex flex-1 text-center"> Branch Count</div>
                        <div className="flex flex-1 text-center">User Count</div>
                        <div className="flex flex-1 text-center"> Status</div>
                        <div className="flex flex-1 text-center">Total Package</div>
                       
                    </div>
                     <hr></hr>
                    {/* headers */}

                    {/* table content */}
                    <div>
                        {  filteredMerchants.map((merr ,index) => (
                            <div className="flex flex-row justify-center text-theme-sm text-black p-2" key={index}>
                                <div className="flex flex-1 items-center" >
                                    <div className="rounded-full bg-blue-100 w-10 h-10 flex justify-center items-center mr-1">
                                        <UserCircleIcon className="text-lg text-blue-800 " /> 
                                    </div>
                                    {merr.merchantName }
                                </div>
                                <div className="flex flex-1 items-center" > {merr.mainAddress}</div>
                                <div className="flex flex-1 items-center" > {merr.createdDate}</div>
                                <div className="flex flex-1 items-center" > {merr.branchCount}</div>
                                <div className="flex flex-1 items-center" > {merr.userCount}</div>
                                <div className="flex flex-1 items-center" >
                                    <span className={`text-center rounded-lg  ${merr.status === "Delivered"
                                                                            ? "bg-success-50 text-success-800"
                                                                            :merr.status==="In Transit" 
                                                                            ? "bg-blue-light-50 text-blue-800"
                                                                            :merr.status ==="Pending"
                                                                            ? "bg-yellow-50 text-yellow-800"
                                                                            :merr.status ==="Failed Delivery"
                                                                            ?" bg-error-50 text-error-800"
                                                                            : "bg-gray-50 text-gray-600"
                                                                            }
                                                `}
                                    >
                                    {merr.status}
                                    </span> 
                                 
                                </div>
                                <div className="flex flex-1 items-center" > {merr.totalPackage}</div>
                                

                            </div>
                            
                        ))}
                        </div> 
                        {/* table content */}
                    </div>
                    {/* list of merhants */}
                </div>
            </div>
        </>
    );
}