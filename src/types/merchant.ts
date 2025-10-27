export interface Merchant {
    id: number;
    merchantName: string;
    registrationNumber?: string;
    merchantLogo?: string;
    mainAddress: string;
    country?: string;
    city?: string;
    address?: string;
    merchantPhone?: string;
    merchantEmail?: string;
    socialLinks?: {
        facebook?: string;
        twitter?: string;
        instagram?: string;
        linkedin?: string;
        website?: string;
    };
    createdDate: string;
    branchCount: number;
    userCount: number;
    status: "All status" | "Pending" | "In Transit" | "Delivered" | "Failed Delivery" | "Active" | "Inactive" | "Suspended";
    totalPackage?: number;
}

export interface MerchantApiResponse {
    id: number;
    name: string;
    registrationNumber?: string;
    logo?: string;
    address?: {
        country?: string;
        city?: string;
        street?: string;
        fullAddress?: string;
    };
    phone?: string;
    email?: string;
    socialLinks?: {
        facebook?: string;
        twitter?: string;
        instagram?: string;
        linkedin?: string;
        website?: string;
    };
    status: string | null;
    createdAt: string;
    branchCount: number;
    userCount: number;
}