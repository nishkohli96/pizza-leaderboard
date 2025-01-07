'use server';

import db from '@/db';
import { dbTables } from '@/constants';
import { User } from '@/types';

export async function addUser(user: User) {
  try {
    const supabase = await db.connect();
    await supabase.from(dbTables.user).insert({
      ...user,
      age: Number(user.age)
    });
    return true;
  } catch {
    return false;
  }
}

export async function getUserById(id: string) {
  const supabase = await db.connect();
  const {
    data,
    error,
  } = await supabase
    .from(dbTables.user)
    .select('*')
    .eq('id', id)
    .single();
  return { data, error };
}

export async function updateUser(id: string, userDetails: User) {
  try {
    const supabase = await db.connect();
    await supabase
      .from(dbTables.user)
      .update({
        ...userDetails,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .single();
    return true;
  } catch(error) {
    return false;
  }
}
