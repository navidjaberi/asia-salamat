export interface ClassesDetail {
  Class: Class;
  ClassId: string;
  CreatedAt: string;
  Days: string;
  Hours: string;
  Id: string;
  InstallmentNumber: number;
  InstallmentPrice: string;
  PrePaid: string;
  Price: string;
  ReserveClasses: [];
  TimeHolding: string;
  Title: string;
  TotallHours: string;
  UpdatedAt: string;
  route: string;
}
export interface Class {
  CreatedAt: string;
  Id: string;
  ImageName: string;
  Title: string;
  UpdatedAt: string;
}
