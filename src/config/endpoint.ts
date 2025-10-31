const COMPANY_ROOT = '/company';

const endpoints = {
  company: {
    list: `${COMPANY_ROOT}/list`,
    byId: (id: string) => `${COMPANY_ROOT}/${id}`,
    new: `${COMPANY_ROOT}/new`,
  },
  user: {
    profile: '/user/current/profile',
    current: '/user/current',
  },
} as const;

export default endpoints;
