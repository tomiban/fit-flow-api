import {dbConnect} from "./config/mongo.js";
import {app} from "./index.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`API is listening on port http://localhost:${PORT}/api/v1/ `);
});

dbConnect();
