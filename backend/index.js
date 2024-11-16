// index.js
const http = require('http');
const app = require('./src/app');

// Config .env
require('dotenv').config();

// Server creation
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
if (process.env.PORT) {
    console.log(process.env.JWT_SECRET)
}
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// Listeners
server.on('error', (error) => {
    console.log(error);
});
