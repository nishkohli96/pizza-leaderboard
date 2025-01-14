import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MuiEditIcon from '@mui/icons-material/Edit';
import MuiDeleteIcon from '@mui/icons-material/Delete';
import CircleIcon from '@mui/icons-material/Circle';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { Gender } from '@/types';

type GenderIconProps = {
  gender: Gender;
};

export const GenderIcon = ({ gender }: GenderIconProps) => {
  switch (gender) {
    case Gender.Male:
      return (
        <Tooltip title="Male">
          <MaleIcon sx={{ color: '#007ABA' }} />
        </Tooltip>
      );
    case Gender.Female:
      return (
        <Tooltip title="Male">
          <FemaleIcon sx={{ color: '#BE56BF' }} />
        </Tooltip>
      );
    default:
      return (
        <Tooltip title="Others">
          <TransgenderIcon sx={{ color: 'lightgreen' }} />
        </Tooltip>
      );
  }
};

export const ViewIcon = () => (
  <Tooltip title="View User">
    <VisibilityIcon fontSize="small" />
  </Tooltip>
);

export const EditIcon = () => (
  <Tooltip title="Edit User">
    <MuiEditIcon fontSize="small" />
  </Tooltip>
);

export const DeleteIcon = () => (
  <Tooltip title="Delete User">
    <MuiDeleteIcon fontSize="small" />
  </Tooltip>
);

export const RenderCoins = (
  { coins }: { coins: number }
) => {
  return (
    <Box
      display="flex"
      alignItems="center"
    >
      <CircleIcon sx={{ color: '#CC9901', fontSize: '20px', mr: '8px' }} />
      {coins}
    </Box>
  );
};

export const PizzaMenuIcon = () => (
  <Tooltip title="Buy Pizza">
    <MenuBookIcon fontSize="small" />
  </Tooltip>
);

export const LogPizzaIcon = () => (
  <Tooltip title="Log Pizza">
    <RestaurantMenuIcon fontSize="small" />
  </Tooltip>
);

export const PizzasLoggedIcon = () => (
  <Tooltip title="View Logged Pizzas">
    <LocalPizzaIcon fontSize="small" />
  </Tooltip>
);