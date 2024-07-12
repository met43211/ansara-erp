export type TFormatedProject = {
  accounterId: number;
  customer: string;
  phone: string;
  stagesCount: number;
  login: string;
  payed: number;
  remain: number;
  password: string;
  timegates: {
    firstPayment: number;
    start: number;
    end: number;
  };
};
