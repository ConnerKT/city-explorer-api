const app = require('express')();
const PORT = 3000;

app.listen(
    PORT,
    () => console.log(`It's alive on http://localhost:${PORT}`)
)