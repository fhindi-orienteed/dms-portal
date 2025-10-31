import { IMerchantBranch } from '../types/interface';

export default class MerchantBranch implements IMerchantBranch {
  id: string | null;
  companyId: string | null;
  createdDate: string | null;
  name: string | null;
  country: string | null;
  city: string | null;
  address: string | null;
  email: string | null;
  phone: string | null;
  mobile: string | null;
  status: string | null;

  constructor(data: IMerchantBranch) {
    this.id = data.id;
    this.companyId = data.companyId;
    this.createdDate = data.createdDate;
    this.name = data.name;
    this.country = data.country;
    this.city = data.city;
    this.address = data.address;
    this.email = data.email;
    this.phone = data.phone;
    this.mobile = data.mobile;
    this.status = data.status;
  }
}
