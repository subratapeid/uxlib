// dev-server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(__dirname)); // Serve everything

app.listen(port, () => {
  console.log(`ULib dev server running: http://localhost:${port}`);
});
