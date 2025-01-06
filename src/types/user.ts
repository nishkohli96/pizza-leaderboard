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
  created_at: Date | string;
  updated_at: Date | string;
}

export type UserRow = Pick<UserDetails, 'id' | 'name' | 'gender' | 'coins'>