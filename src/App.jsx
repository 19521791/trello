import Button from '@mui/material/Button'
import AccessAlarmIcoin from '@mui/icons-material/AccessAlarm'
import ThreeDRotation from '@mui/icons-material/ThreeDRotation'
import HomeIcon from '@mui/icons-material/Home'
import Typography from '@mui/material/Typography'

function App() {
  return (
    <>
      <div>Douglus Nguyen</div>

      <Typography variant='body2' color="text.secondary">Test Typography</Typography>
      <Button variant="text">Text</Button>
      <Button variant="contained" color="success">Contained</Button>
      <Button variant="outlined">Outlined</Button>

      <br />
      <AccessAlarmIcoin />
      <ThreeDRotation />
      <HomeIcon color="primary" />
      <HomeIcon color="secondary" />
      <HomeIcon color="success" />
      <HomeIcon color="action" />
    </>
  )
}

export default App
