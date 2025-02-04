import { PaginatedResponse } from '.';

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
  isDeleted: boolean;
}

export type UserRow = Pick<UserDetails, 'id' | 'name' | 'gender' | 'coins'>

export type UserListQueryParams = {
  page?: number;
  limit?: number;
  perPage?: number;
  sortKey?: string;
  sortOrder?: 'asc' | 'desc'
}

export type UsersListResponse = PaginatedResponse<UserRow>;
