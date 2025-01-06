'use server';

import db from '@/db';
import { dbTables } from '@/constants';
import { User, UserRow } from '@/types';

export async function addUser(user: User) {
  const supabase = await db.connect();
  const { data, error } = await supabase.from(dbTables.user).insert({
    ...user,
    age: Number(user.age)
  });
  console.log('error: ', error);
  console.log('data: ', data);
  return { data, error };
}

export async function getUsers() {
  const supabase = await db.connect();
  const {
    data,
    error
  } = await supabase
    .from(dbTables.user)
    .select('id, name, gender, coins');
  return { data, error };
}
