
export type TrademarkEvent = {
  date: string;
  title: string;
  detail: string;
};

export type Trademark = {
  id: string;
  name: string;
  applicationNumber: string;
  registrationNumber: string;
  owner: string;
  classNumber: number;
  country: string;
  status: string;
  filingDate: string;
  registrationDate: string;
  description: string;
  events: TrademarkEvent[];
};
