require('dotenv').config();
const app = require('./src/app');
const database = require('./src/config/db.config');
const PORT = process.env.PORT || 5000;
database();
app.get('/', (req, res) => {
    res.send('Hello World!')
});
const http = require('http');
const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`server is running at PORT ${PORT}`);
});
