import { IUserProfile } from '../types/UserProfile';

export default class UserProfile implements IUserProfile {
  email: string | null;
  role: string;
  firstName: string;
  lastName: string;
  mobile: string;
  address: string;
  photo: string;
  companyDetails: string;
  driverDetails: string;

  constructor(data: IUserProfile) {
    this.email = data.email;
    this.role = data.role || '';
    this.firstName = data.firstName || '';
    this.lastName = data.lastName || '';
    this.mobile = data.mobile || '';
    this.address = data.address || '';
    this.photo = data.photo || '';
    this.companyDetails = data.companyDetails || '';
    this.driverDetails = data.driverDetails || '';
  }

  get displayName() {
    return `${this.firstName || ''} ${this.lastName || ''}`.trim();
  }
}
