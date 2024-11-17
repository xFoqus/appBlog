
const http = require('http');
const app = require('./src/app');


require('dotenv').config();

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
if (process.env.PORT) {
}
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

server.on('error', (error) => {
    console.log(error);
});
