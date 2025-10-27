import { Link } from "react-router";
import { ChevronLeftIcon } from "../../icons";
import { Button } from "../ui";

export default function VerficationPage(){
    return(
        <>
            <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar ">
           
                <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
                    <Link
                        to="/"
                        className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                        <ChevronLeftIcon className="size-5" />
                        Back to dashboard
                    </Link>
                </div>

                <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
                    <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">Two Step Verfication </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        A verfication code has been sent to your mobile. Please enter it in the field below.
                    </p>
                    <br>
                    </br>
                    <label className="text-sm text-simibold text-gray-800 dark:text-gray-400">type your 6 digits security code</label>

                    <span className="flex flex-row mt-2">
                        {[...Array(6)].map((_,i)=>(
                            <input
                                key={i}
                                type="text"
                                maxLength={1}
                                className= "h-10 border border-gray-500 rounded-lg mr-2 text-center w-[70px]"
                                placeholder="#"
                            />
                        ))}
                    </span>

                    <Button className="text-center w-full mt-3 mb-3">Verfy my account</Button>
                    <div className="mt-5">
                        <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                            Didn't got the code? {""}
                            <Link
                            to=""
                            className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                            >
                            Resend
                            </Link>
                        </p>
                    </div>                    
                     
                </div>
            </div>
         
        </>
    );
}