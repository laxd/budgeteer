require('dotenv').config();

const app = require('./src/server');
const port = process.env.PORT || 9000;

app.listen(port, () => console.log(`Budgeteer API running on port ${port}`));