import { IncomingMessage, ServerResponse } from "http";
import productController from '../controllers/product.controller';
const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;
  if (url === "/" && method === "GET") {
    // console.log("This is root route")
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "This is root route!!" }));
  } else if (url?.startsWith("/products")) {
    productController(req, res);
  } else {
    // console.log("This route is ont define")
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "This route in not found!!" }));
  }
};

export default routeHandler;
