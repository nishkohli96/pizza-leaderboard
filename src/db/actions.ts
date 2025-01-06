'use server';

import { User } from '@/types';
import { createClient } from '.';

export async function createUser(user: User) {
	const supabase = await createClient();
	const { data, error } = await supabase.from('users').insert({
		...user,
		age: Number(user.age)
	});
	console.log('error: ', error);
	console.log('data: ', data);

}
