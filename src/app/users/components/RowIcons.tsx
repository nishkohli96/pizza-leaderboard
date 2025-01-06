import Tooltip from '@mui/material/Tooltip';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MuiEditIcon from '@mui/icons-material/Edit';
import MuiDeleteIcon from '@mui/icons-material/Delete';
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

export const ViewIcon = () => <VisibilityIcon fontSize="small" />;

export const EditIcon = () => <MuiEditIcon fontSize="small" />;

export const DeleteIcon = () => <MuiDeleteIcon fontSize="small" />;
