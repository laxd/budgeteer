require('dotenv').config();

const app = require('./server');
const port = process.env.PORT || 9000;

app.listen(port, () => console.log(`Budgeteer API running on port ${port}`));