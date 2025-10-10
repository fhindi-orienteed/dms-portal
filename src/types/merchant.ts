export interface Merchant {
    id: number;
    merchantName:string,
    mainAddress:string,
    createdDate:string,
    branchCount:number,
    userCount:number,
    status: "All status" | "Pending" | "In Transit" | "Delivered" | "Failed Delivery";
    totalPackage:number,
}