import { IncomingMessage, ServerResponse } from "http";
import { productService } from "../service/product.service";
import { type IProduct } from '../types/product';
const productController = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;
  const urlParams = url?.split("/");
//   const id = urlParams && urlParams[1] === "products" ? Number([2]) : null;
    // console.log(id);
// Get all products
const id = 
    urlParams && urlParams[1] === "products" && urlParams[2] 
      ? Number(urlParams[2]) 
      : null;

  if (url === "/products" && method === "GET") {
    const products = productService();

    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(
      JSON.stringify({
        message: "Products retrived successfully!",
        data: products,
      }),
    );
  }else if(method === "GET" && id !== null) {
    const products = productService();
    const product = products.find((p: IProduct) => p.id === id);
    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(
      JSON.stringify({
        message: "Products retrived successfully!",
        data: product,
      }),
    );
  }
};

export default productController;
