import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import './App.scss';
import Draw from './Draw/Draw';

function App() {
  return (
    <div className="App">
      <Box sx={{ p: 2, backgroundColor: '#1462a0', color: '#fff', textAlign: 'center' }}>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Administrador de figuras &#127912;
        </Typography>
      </Box>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Draw />
      </Box>
    </div>
  );
}

export default App;
