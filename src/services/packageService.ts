import axios from "axios";
import { PackageSummary } from "../types/packagesSummary";

export async function getPackages(): Promise<PackageSummary[]> {
  try {
      const response = await axios.get("http://api-dms.orienteed.ps/v1/web/packages/summary");
    //  const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
    const data: PackageSummary[] = response.data;

    return data.map((item) => ({
      id: item.id,
      userId: item.userId,
      title: item.title,
      completed: item.completed,
    }));
  } catch (error) {
    console.error("Error fetching packages:", error);
    return [];
  }
}
