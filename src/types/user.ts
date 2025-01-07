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

export type UserListQueryParams = {
  page?: number;
  limit?: number;
  perPage?: number;
}

export type UsersListResponse = {
  page: number;
  perPage: number;
  nbRecords: number;
	records: UserRow[];
};
