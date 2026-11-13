import { IncomingMessage, ServerResponse } from "http";
import { createProduct, productService } from "../service/product.service";
import { type IProduct } from '../types/product';
import { bodyParser } from '../utils/parseBody';
import { sendResponse } from '../utils/sendResponse';
const productController = async (req: IncomingMessage, res: ServerResponse) => {
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
    try {
      const products = productService();
    sendResponse(res, true, 200, "Products retrive successfully!", products)
  
    }catch(error) {
      const products = productService();
    sendResponse(res, false, 500, "Internal server error!")
  
    }

  }else if(method === "GET" && id !== null) {
    try {
      const products = productService();
    const product = products.find((p: IProduct) => p.id === id);
    if(!product) {
      return sendResponse(res, false, 200, "Product Not Found!")
    }
    sendResponse(res, true, 200, "Product retrive successfully!", product)
    }catch(error) {
      sendResponse(res, false, 500, "Internal server error!")
    }
  
  }else if(method === "POST" && url === "/products") {
    const body = await bodyParser(req);
    // console.log(body)
    const newProduct = {
      id : Date.now(),
      ...body
    };
    // console.log(newProduct)
    const products = productService();
    products.push(newProduct);
    createProduct(products);
    
    res.writeHead(201, {
      "content-type": "application/json",
    });
    res.end(
      JSON.stringify({
        message: "Product created successfully!",
        data: newProduct,
      }),
    );
  }else if (method === "PUT" && id !== null) {
    const body = await bodyParser(req);
    const products = productService();
    const index = products.findIndex((p: IProduct) => p.id === id);
    // console.log(index);
    if(index < 0) {
      res.writeHead(404, {
      "content-type": "application/json",
    });
    res.end(
      JSON.stringify({
        message: "Product Not Found!",
        // data: newProduct,
      }),
    );
    }
    // console.log(products[index]);
    products[index] = {id: products[index].id, ...body};
    createProduct(products);

    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(
      JSON.stringify({
        message: "Product updated successfully!",
        data: products[index],
      }),
    );
  }else if(method === "DELETE" && id !== null) {
    const products = productService();
    const index = products.findIndex((p: IProduct) => p.id === id);
    // console.log(index);
    if(index < 0) {
      res.writeHead(404, {
      "content-type": "application/json",
    });
    res.end(
      JSON.stringify({
        message: "Product Not Found!",
        // data: newProduct,
      }),
    );
    }
    
    products.splice(index, 1);
    createProduct(products);

    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(
      JSON.stringify({
        message: "Product deleted successfully!",
        
      }),
    );
  }
};

export default productController;
