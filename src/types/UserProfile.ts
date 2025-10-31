export interface IUserProfile {
  email: string | null;
  role: string | null;
  firstName: string | null;
  lastName: string | null;
  mobile: string | null;
  address: string | null;
  photo?: string | null;
  companyDetails?: string | null;
  driverDetails?: string | null;
}
