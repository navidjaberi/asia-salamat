export default interface User {
  Address: string | null;
  Alley: string | null;
  Birthday: string | null;
  BornCity: string | null;
  City: string | null;
  CreatedAt: string;
  Education: string | null;
  EmergancyNumber: string | null;
  FatherName: string | null;
  Id: string;
  ImageUrl: string | null;
  Name: string | null;
  NationalCode: string | null;
  NationalNumber: string | null;
  Neighborhood: string | null;
  PhoneNumber: string;
  PostalCode: string | null;
  Province: string | null;
  ReserveNurses: [];
  ReservedClasses: [];
  Street: string | null;
  Token: string;
  Unit: string | null;
  UpdatedAt: string;
  code: string;
}
