import { test } from "../fixtures/AdminFixtures";
import { productData, ProductPage } from "../pages/products/ProductPage";

test.describe("Product mangement",async()=>{
    test("verify create product",async({adminPage})=>{
        const product=new ProductPage(adminPage);


       await product.createProduct(productData);





    });
})