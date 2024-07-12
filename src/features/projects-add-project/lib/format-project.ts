import { TProject } from '../model/add-project-store';
import { TFormatedProject } from '../model/formated-project.type';

export const formatProject = (project: TProject): TFormatedProject => {
  return {
    accounterId: Number(project.accounters),
    customer: project.name,
    phone: project.phone,
    stagesCount: Number(project.stages),
    login: project.login,
    password: project.password,
    payed: project.payed,
    remain: project.needPay,
    timegates: {
      firstPayment: (project.payDate as Date).getTime(),
      start: (project.startDate as Date).getTime(),
      end: (project.endDate as Date).getTime(),
    },
  };
};
