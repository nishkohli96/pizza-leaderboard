'use client';

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { axiosApi } from '@/axios';
import { dataTableConfig } from '@/constants';
import { FullScreenDialog } from '@/components';
import { ResponseBody, UserOrdersListResponse, UserOrderDetails } from '@/types';
import LoggedOrdersDataGrid from './LoggedOrdersDataGrid';
import { GridPaginationModel } from '@mui/x-data-grid';

type OrdersListProps = {
  open: boolean;
  handleClose: () => void;
  userId: string;
};

export default function LoggedOrdersList({
  open,
  handleClose,
  userId
}: OrdersListProps) {
  const [loading, setLoading] = useState(false);
  const [ordersList, setOrdersList] = useState<UserOrderDetails[]>([]);
  const [nbRecords, setNbRecords] = useState(0);
  const [pageSize, setPageSize] = useState(dataTableConfig.defaultPageSize);
  const [currentPage, setCurrentPage] = useState<number>(dataTableConfig.defaultPage);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await axiosApi.get<ResponseBody<UserOrdersListResponse>>(
        '/orders/logged',
        {
          params: {
            userId,
            page: currentPage,
            limit: pageSize
          }
        }
      );
      const ordersData = response.data.data;
      const orders = ordersData?.records ?? [];
      setOrdersList(orders);
      setNbRecords(ordersData?.nbRecords ?? 0);
      setPageSize(ordersData?.perPage ?? dataTableConfig.defaultPageSize);
      setCurrentPage(ordersData?.page ?? dataTableConfig.defaultPage);
      setLoading(false);
    }
    fetchData();
  }, [userId, currentPage, pageSize]);

  function handleOnPageChange(pagination: GridPaginationModel) {
    const newPage = pagination.page + 1;
    const limit = pagination.pageSize;
    setCurrentPage(newPage);
    setPageSize(limit);
  }

  return (
    <FullScreenDialog
      open={open}
      handleClose={handleClose}
      title="Logged Orders 🍕"
    >
      <Box
        sx={{
          p: '20px',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <LoggedOrdersDataGrid
          orders={ordersList}
          nbRecords={nbRecords}
          paginationModel={{
            page: currentPage,
            pageSize
          }}
          onPageChange={handleOnPageChange}
          loading={loading}
        />
      </Box>
    </FullScreenDialog>
  );
}
