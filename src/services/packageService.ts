import api from "../config/api";
import { PackageSummary } from "../types/packagesSummary";

export async function getPackages(): Promise<PackageSummary> {
  try {
    
    const response = await api.get("/packages/summary");

    console.log("📦 API response:", response.data);
    return response.data;
  } 
  catch (error) {
    console.error("❌ Error fetching packages:", error);
    return {} as PackageSummary;
  }
}
