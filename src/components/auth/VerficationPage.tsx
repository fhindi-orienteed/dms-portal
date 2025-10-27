 import { Button } from "../ui";

export default function VerficationPage(){
    return(
        <>
        <div className="w-[50%] flex flex-row md:justify-center ">
           <div className="  h-screen flex justify-center items-center ">
                <span className="absolute top-10 left-30 dark:text-gray-400  ">
                    <p className="text-gray-800 text-sm ">&lt;  <a href="/">back to dashboard</a> </p>
                </span>
                <div className=" p-20 m-10 ">
                    <h1 className="font-bold text-4xl mb-2 dark:text-white/90">Two Step Verfication</h1>
                    <p className="text-lg text-gray-800 dark:text-gray-400">A verfication code has been sent to your mobile. Please enter it in the field below.</p>
                    <br>
                    </br>
                    <p className="text-gray-800 dark:text-gray-400 mb-2">type your 6 digits security code</p>

                    <span >
                        {[...Array(6)].map((_,i)=>(
                            <input
                                key={i}
                                type="text"
                                maxLength={1}
                                className= "h-10 border border-gray-500 rounded-lg mr-3 text-center w-[70px]"
                            />
                        ))}
                    <br></br>
                         <Button className="text-center w-full mt-3 mb-3">Verfy my account</Button>
                         <p className="dark:text-gray-400">Didn't get the code? <a className="text-blue-800 dark:text-gray-400" >Resend</a></p> 
                    </span>
                     
                </div>
                
            </div>
                                
        </div>
         
        </>
    );
}