export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
  Others = 'Others'
}

export interface User {
  name: string;
  age: number;
  gender: Gender;
}

export interface UserDetails extends User {
  id: string;
  coins: number;
}
