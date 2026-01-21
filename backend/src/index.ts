import {createApp} from "./app";
import {createDefaultDb} from "./db";

const PORT = process.env.PORT || 3000;

createApp(createDefaultDb()).listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});