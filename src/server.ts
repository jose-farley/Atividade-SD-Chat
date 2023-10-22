import { serverHttp } from "./app"

const PORT = process.env.PORT || 8080;

serverHttp.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));