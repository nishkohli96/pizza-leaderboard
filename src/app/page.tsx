import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import PersonIcon from '@mui/icons-material/Person';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

export default function HomePage() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: '30px'
      }}
    >
      <ButtonGroup variant="outlined" aria-label="Basic button group">
        <Button startIcon={<PersonIcon />} href='/users/add'>
          New User
        </Button>
        <Button startIcon={<LeaderboardIcon />} href="/leaderboard">
          Leaderboard
        </Button>
        <Button startIcon={<ManageAccountsIcon />} href='/users'>
          Manage Players
        </Button>
      </ButtonGroup>
    </Box>
  );
}
