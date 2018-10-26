const http = require('http');
import utils from '../server/utils';
const app = require('../index'); // The express app we just created
const log = utils.logger;

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
log().info(`app started on port ${port}`)
