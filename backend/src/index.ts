import {createApp} from "./app";
import {connectToDefaultDatabase} from "./db";

const PORT = process.env.PORT || 3000;

createApp(connectToDefaultDatabase().db).listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});