
 import { PackageSummary } from "../types/packagesSummary";

export async function getPackages() {
   
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data :PackageSummary[] = await response.json();
 
    return data.map((item) =>({
        id : item.id,
        userId : item.userId,
        title : item.title,
        completed : item.completed,

    })); 
    
}
  

