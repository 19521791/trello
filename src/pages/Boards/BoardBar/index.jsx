import { Box, Tooltip } from '@mui/material'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const MENU_STYLES = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

function BoardBar() {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto',
      borderBottom: '1px solid white',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
      paddingX: 2
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={MENU_STYLES}
          icon={<DashboardIcon />}
          label="Douglus"
          // clickable
          onClick={() => {}}
        />
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label="Public/Private Workspace"
          // clickable
          onClick={() => {}}
        />
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          // clickable
          onClick={() => {}}
        />
        <Chip
          sx={MENU_STYLES}
          icon={<BoltIcon />}
          label="Automation"
          // clickable
          onClick={() => {}}
        />
        <Chip
          sx={MENU_STYLES}
          icon={<FilterListIcon />}
          label="Filters"
          // clickable
          onClick={() => {}}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon/>}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': { borderColor: 'white' }
          }}
        >
          Invite
        </Button>
        <AvatarGroup
          max={4}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 16,
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              '&:first-of-type': { bgcolor: '#a4b0be' }
            }
          }}
        >
          <Tooltip title="Douglus">
            <Avatar
              alt="Douglus"
              src="https://imgs.search.brave.com/8qUtp1mPZUaGiLA15zwveGi4CrI3v8LlACiGkmaNdu4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvYW5p/bWUtcHJvZmlsZS1w/aWN0dXJlLXZpb2xl/dC1ldmVyZ2FyZGVu/LXV4cHh1dzVqODFj/MHdhZDUuanBn" />
          </Tooltip>
          <Tooltip title="Douglus">
            <Avatar
              alt="Douglus"
              src="https://imgs.search.brave.com/8qUtp1mPZUaGiLA15zwveGi4CrI3v8LlACiGkmaNdu4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvYW5p/bWUtcHJvZmlsZS1w/aWN0dXJlLXZpb2xl/dC1ldmVyZ2FyZGVu/LXV4cHh1dzVqODFj/MHdhZDUuanBn" />
          </Tooltip>
          <Tooltip title="Douglus">
            <Avatar
              alt="Douglus"
              src="https://imgs.search.brave.com/8qUtp1mPZUaGiLA15zwveGi4CrI3v8LlACiGkmaNdu4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvYW5p/bWUtcHJvZmlsZS1w/aWN0dXJlLXZpb2xl/dC1ldmVyZ2FyZGVu/LXV4cHh1dzVqODFj/MHdhZDUuanBn" />
          </Tooltip>
          <Tooltip title="Douglus">
            <Avatar
              alt="Douglus"
              src="https://imgs.search.brave.com/8qUtp1mPZUaGiLA15zwveGi4CrI3v8LlACiGkmaNdu4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvYW5p/bWUtcHJvZmlsZS1w/aWN0dXJlLXZpb2xl/dC1ldmVyZ2FyZGVu/LXV4cHh1dzVqODFj/MHdhZDUuanBn" />
          </Tooltip>
          <Tooltip title="Douglus">
            <Avatar
              alt="Douglus"
              src="https://imgs.search.brave.com/8qUtp1mPZUaGiLA15zwveGi4CrI3v8LlACiGkmaNdu4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvYW5p/bWUtcHJvZmlsZS1w/aWN0dXJlLXZpb2xl/dC1ldmVyZ2FyZGVu/LXV4cHh1dzVqODFj/MHdhZDUuanBn" />
          </Tooltip>
          <Tooltip title="Douglus">
            <Avatar
              alt="Douglus"
              src="https://imgs.search.brave.com/8qUtp1mPZUaGiLA15zwveGi4CrI3v8LlACiGkmaNdu4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvYW5p/bWUtcHJvZmlsZS1w/aWN0dXJlLXZpb2xl/dC1ldmVyZ2FyZGVu/LXV4cHh1dzVqODFj/MHdhZDUuanBn" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar