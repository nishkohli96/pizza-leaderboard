import { NextRequest } from 'next/server';
import { NextApiResponse } from '@/utils';
import db from '@/db';
import { dbTables, messages } from '@/constants';
import { Order, PizzaDetails, UserDetails } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const orderDetails: Order = await request.json();
    const { user_id, pizza_id } = orderDetails;
    const supabase = await db.connect();

    const { data: userData }: { data: UserDetails | null } = await supabase
      .from(dbTables.user)
      .select('coins')
      .eq('id', user_id)
      .single();
    if (!userData) {
      return NextApiResponse.failure({
        message: messages.user.notFound,
        error: null,
        statusCode: 404
      });
    }

    const { data: pizzaData }: { data: PizzaDetails | null } = await supabase
      .from(dbTables.pizza)
      .select('price')
      .eq('id', pizza_id)
      .single();
    if (!pizzaData) {
      return NextApiResponse.failure({
        message: messages.pizza.notFound,
        error: null,
        statusCode: 404
      });
    }

    const newBalance = userData.coins - pizzaData.price;
    if (newBalance < 0) {
      return NextApiResponse.failure({
        message: messages.user.insufficientBalance,
        error: null,
        statusCode: 400
      });
    }

    await supabase
      .from(dbTables.user)
      .update({ coins: newBalance })
      .eq('id', user_id);

    await supabase.from(dbTables.order).insert({
      user_id: user_id,
      pizza_id: pizza_id
    });

    return NextApiResponse.success({
      message: messages.order.placed,
    });
  } catch (error) {
    return NextApiResponse.failure({
      message: messages.order.notPlaced,
      error
    });
  }
}
