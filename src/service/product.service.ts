import path from "path";
import fs from "fs";
import { type IProduct } from '../types/product';


const filePath = path.join(process.cwd(), "./src/database/db.json")

export const productService = () => {
    // console.log(process.cwd())
    // console.log(filePath);
    const result = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(result);

}


export const createProduct = (payLoad: IProduct[]) => {
    fs.writeFileSync(filePath, JSON.stringify(payLoad))
}