export type TProjectTableElement = {
  id: number;
  accounterId: number;
  status: null | string;
  customer: string;
  timegates: {
    id: number;
    first_payment: string;
    start_date: string;
    end_date: string;
  };
  lastAccounting: { date: string; status: string };
  lastTask: string;
  paymentStages: [];
  payed: number;
  remain: number;
  order: null | number;
};
