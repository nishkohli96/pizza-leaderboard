'use client';

import Button from '@mui/material/Button';
import { ConfirmationDialog } from '@/components';
import { useState } from 'react';
import { PizzaDetails } from '@/types';

type OrderButtonProps = {
  pizza: PizzaDetails;
  userId: string;
  handleOrder: (pizzaId: number, userId: string) => void;
};

export default function OrderButton({
  pizza,
  userId,
  handleOrder
}: OrderButtonProps) {
  const [open, setOpen] = useState(false);

  function handleClose() {
    setOpen(false);
  }
  return (
    <>
      <Button
        color="warning"
        variant="contained"
        sx={{ mt: '30px' }}
        onClick={() => setOpen(true)}
      >
        Buy
      </Button>
      <ConfirmationDialog
        title={`Buy ${pizza.name} Pizza?`}
        contentText={`This will deduct ${pizza.price} coins from your wallet.`}
        open={open}
        onClose={handleClose}
        onConfirm={() => {
          handleOrder(pizza.id, userId);
          handleClose();
        }}
      />
    </>
  );
}
