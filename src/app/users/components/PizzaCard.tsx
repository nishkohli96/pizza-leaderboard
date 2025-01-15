import Image from 'next/image';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { axiosApi } from '@/axios';
import { ResponseBody, PizzaDetails } from '@/types';
import { handleAxiosError } from '@/utils';
import OrderButton from './OrderButton';
import { RenderCoins } from '../../../components/row-icons';

type PizzaCardProps = {
  pizza: PizzaDetails;
  userId: string;
};

export default function PizzaCard({
  pizza,
  userId,
}: PizzaCardProps) {
  async function handleOrder(pizzaId: number, userId: string) {
    try {
      const response = await axiosApi.post<ResponseBody>('/orders/new', {
        pizza_id: pizzaId,
        user_id: userId
      });
      toast.success(response.data.message);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  return (
    <Paper sx={{ borderRadius: '8px' }}>
      <Grid container>
        <Grid size={{ xs: 12, md: 5 }}>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              minHeight: '250px',
              borderRadius: '8px 0 0 8px',
              overflow: 'hidden'
            }}
          >
            <Image
              src={`/pizzas/${pizza.slug}.webp`}
              alt={pizza.slug}
              fill
            />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 7 }} sx={{ p: '20px' }}>
          <Typography variant="h4" color="primary">
            {pizza.name}
          </Typography>
          <Typography variant="body1" sx={{ mt: '10px', mb: '20px' }}>
            {pizza.description}
          </Typography>
          <RenderCoins coins={pizza.price} />
          <OrderButton
            pizza={pizza}
            userId={userId}
            handleOrder={handleOrder}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
