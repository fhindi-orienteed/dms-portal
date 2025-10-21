// // import axios from "axios";
// // import { PackageSummary } from "../types/packagesSummary";

// // export async function getPackages(): Promise<PackageSummary[]> {
// //   try {
// //       const response = await axios.get("http://api-dms.orienteed.ps/v1/web/packages/summary");
// //     //  const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
// //     const data: PackageSummary[] = response.data;

// //     return data.map((item) => ({
// //       id: item.id,
// //       userId: item.userId,
// //       title: item.title,
// //       completed: item.completed,
// //     }));
// //   } catch (error) {
// //     console.error("Error fetching packages:", error);
// //     return [];
// //   }
// // }
// //******************************************************************************* */
//  import axios from "axios";
// import { PackageSummary } from "../types/packagesSummary";

// export async function getPackages(): Promise<PackageSummary[]> {
//   try {
//       const response = await axios.get("http://api-dms.orienteed.ps/v1/web/packages/summary");
//     //  const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
//     const data: PackageSummary[] = response.data;

//     return data;
//   } catch (error) {
//     console.error("Error fetching packages:", error);
//     return [];
//   }
// }


//******************************************************************************** */
import axios from "axios";
import { PackageSummary } from "../types/packagesSummary";

const API_URL = "http://api-dms.orienteed.ps/v1";

export async function getPackages(): Promise<PackageSummary> {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("⚠️ No auth token found — login first!");
      return {} as PackageSummary;
    }

    const response = await axios.get(`${API_URL}/web/packages/summary`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("📦 API response:", response.data);
    return response.data;
    // // Handle API response safely
    // const rawData = Array.isArray(response.data)
    //   ? response.data
    //   : Array.isArray(response.data.data)
    //   ? response.data.data
    //   : [];

    // // Map to your PackageSummary type
    // return rawData.map((item: PackageSummary) => ({
    //   collectionAmount: item.collectionAmount,
    //   code: item.code,
    //   cout: item.count,
    // }));
  } catch (error) {
    console.error("❌ Error fetching packages:", error);
    return {} as PackageSummary   ;
  }
}

