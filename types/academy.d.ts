export interface Academy {
  ClassCategories:ClassCategories[] | [],
  CreatedAt: string,
  Id: string,
  ImageName: string,
  Title: string,
  UpdatedAt: string,
  disable?:boolean
  image: string,
  link?: string,
}

interface ClassCategories {
  ClassId: string,
  CreatedAt: string,
  Days: string,
  Hours:string,
  Id: string,
  InstallmentNumber: number,
  InstallmentPrice:string,
  PrePaid:string,
  Price: string,
  ReserveClasses: [],
  TimeHolding: string,
  Title: string,
  TotallHours: string,
  UpdatedAt:string,
  route:string,
}
