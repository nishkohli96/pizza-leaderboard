export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
  Others = 'OTHERS'
}

export interface User {
  name: string;
  age: number;
  gender: Gender;
}

export interface UserDetails extends User {
  id: string;
  coins: number;
  created_at: Date;
  updated_at: Date;
}

export type UserRow = Pick<UserDetails, 'id' | 'name' | 'gender' | 'coins'>
