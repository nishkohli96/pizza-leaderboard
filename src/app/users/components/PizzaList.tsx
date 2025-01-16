'use client';

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { FullScreenDialog } from '@/components';
import { PizzaDetails } from '@/types';
import PizzaCard from './PizzaCard';

type PizzaListProps = {
  open: boolean;
  handleClose: () => void;
  userId: string;
};

export default function PizzaList({
  open,
  handleClose,
  userId
}: PizzaListProps) {
  const [pizzas, setPizzas] = useState<PizzaDetails[]>([]);

  /**
   * Axios does not respect cached headers, hence for this
   * case, we use fetch which hits the cached "force-static" API.
   */
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/pizzas');
      const data = await response.json();
      setPizzas(data.data.records);
    }
    fetchData();
  }, []);

  return (
    <FullScreenDialog
      open={open}
      handleClose={handleClose}
      title="Buy a Pizza 🍕"
    >
      <Box
        sx={{
          p: '20px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Grid container spacing={2} maxWidth="md">
          {pizzas.map(pizza => (
            <Grid size={12} key={pizza.slug} sx={{ mb: '20px' }}>
              <PizzaCard
                pizza={pizza}
                userId={userId}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </FullScreenDialog>
  );
}
