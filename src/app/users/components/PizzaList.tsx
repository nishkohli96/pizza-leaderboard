'use client';

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { FullScreenDialog } from '@/components';
import { Pizza } from '@/types';
import PizzaDetails from './PizzaDetails';

type PizzaListProps = {
  open: boolean;
  handleClose: () => void;
};

export default function PizzaList({ open, handleClose }: PizzaListProps) {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);

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
              <PizzaDetails pizza={pizza} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </FullScreenDialog>
  );
}
