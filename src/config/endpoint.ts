const COMPANY_ROOT = '/company';

const endpoints = {
  company: {
    list: `${COMPANY_ROOT}/list`,
    byId: (id: string) => `${COMPANY_ROOT}/${id}`,
    new: `${COMPANY_ROOT}/new`,
    branch: {
      list: (merchantId: string) => `${COMPANY_ROOT}/${merchantId}/branch/list`,
    },
  },
  user: {
    profile: '/user/current/profile',
    current: '/user/current',
  },
} as const;

export default endpoints;
