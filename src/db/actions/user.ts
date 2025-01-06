'use server';

import db from '@/db';
import { DB_TABLES } from '@/constants';
import { User } from '@/types';

export async function addUser(user: User) {
	const supabase = await db.connect();
	const { data, error } = await supabase.from(DB_TABLES.user).insert({
    ...user,
    age: Number(user.age)
  });
	console.log('error: ', error);
	console.log('data: ', data);
  return { data, error };
}

export async function getUsers() {
	const supabase = await db.connect();
	const { data, error } = await supabase.from(DB_TABLES.user).select('*');
	return { data, error }
}