require('./config/constants');
require('./config/error');
require('./config/environment');
require('./config/console');
require('./config/validator');

const app = require('./app');
const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
    console.log(`Kenoby API listening on port ${PORT}!`);
});