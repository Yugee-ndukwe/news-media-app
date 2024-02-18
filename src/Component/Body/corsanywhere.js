// start-cors-server.js

const cors_anywhere = require('cors-anywhere');

const PORT = process.env.PORT || 3000;

cors_anywhere.createServer({
  originWhitelist: [], // Allow all origins
}).listen(PORT, () => {
  console.log(`CORS Anywhere server is running on http://localhost:${PORT}`);
});
