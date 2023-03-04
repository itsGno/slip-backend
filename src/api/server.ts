import app from './app';
import https from 'https'
import fs from 'fs'


const options = {
    key: fs.readFileSync('/etc/ssl/private/nginx.key'),
    cert: fs.readFileSync('/etc/ssl/certs/nginx.crt')
  };
  
  https.createServer(options, app).listen(3030, () => {
    console.log('Server running on port 3000');
  });
const PORT = process.env.PORT || 3030;

// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
