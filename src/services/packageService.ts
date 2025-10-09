import axios from "axios";
 import { PackageSummary } from "../types/packagesSummary";

export async function getPackages() {
   
    const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
    const data :PackageSummary[] = await response.data;
 
    return data.map((item) =>({
        id : item.id,
        userId : item.userId,
        title : item.title,
        completed : item.completed,

    })); 
    
}
  

