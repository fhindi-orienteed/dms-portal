const COMPANY_ROOT = '/company';

const endpoints = {
  company: {
    list: `${COMPANY_ROOT}/list`,
    byId: (id: number) => `${COMPANY_ROOT}/${id}`,
    new: `${COMPANY_ROOT}/new`,
  },
} as const;

export default endpoints;
