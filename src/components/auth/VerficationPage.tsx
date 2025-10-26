 
import ThinGridShape from "../common/ThinGridShape";
import { Button } from "../ui";

 
export default function VerficationPage(){
    return(
        <>
        <div className="flex flex-row  ">
          
            <div className="w-[75%] h-screen flex justify-center items-center">
                <span className="absolute top-10 left-80 ">
                    <p className="text-gray-800 text-sm ">&lt;  <a href="/">back to dashboard</a> </p>
                </span>
                <div className="w-[45%] p-2  ">
                    <h1 className="font-bold text-4xl">Two Step Verfication</h1>
                    <p className="text-lg text-gray-800">A verfication code has been sent to your mobile. Please enter it in the field below.</p>
                    <br>
                    </br>
                    <p className="text-gray-800">type your 6 digits security code</p>

                    <span className="mt-2 mb-2 ">
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
                         <p>Didn't get the code? <a className="text-blue-800" >Resend</a></p> 
                    </span>
                     
                </div>
                
            </div>
            <div className="bg-blue-950 text-white w-[25%] h-screen">
                <ThinGridShape />
            </div>
           
        </div>
         
        </>
    );
}