'use client';

import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { axiosApi } from '@/axios';
import { FullScreenDialog } from '@/components';
import { ResponseBody, UserOrdersListResponse, UserOrderDetails } from '@/types';
import OrdersDataGrid from './OrdersDataGrid';

type OrdersListProps = {
  open: boolean;
  handleClose: () => void;
  userId: string;
};

export default function OrdersList({
  open,
  handleClose,
  userId
}: OrdersListProps) {
  const [ordersList, setOrdersList] = useState<UserOrderDetails[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axiosApi.get<ResponseBody<UserOrdersListResponse>>(
        '/orders/list',
        {
          params: { userId }
        }
      );
      const orders = response.data.data?.records ?? [];
      setOrdersList(orders);
    }
    fetchData();
  }, []);

  return (
    <FullScreenDialog
      open={open}
      handleClose={handleClose}
      title="Your Orders 🍕"
    >
      <Box
        sx={{
          p: '20px',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <OrdersDataGrid
          orders={ordersList}
					paginationModel={{
						page: 1,
						pageSize: 10
					}}
					nbRecords={10}
				/>
      </Box>
    </FullScreenDialog>
  );
}
