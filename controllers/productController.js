const Product = require('../modules/productModule');
const productAdd = async (req,res)=>{
    const { productName, productQuantity, productPrice } = req.body;
    const newProduct = new Product({ productName, productQuantity, productPrice, userId: req.user.id });
    console.log(req.body);
    try {
        await newProduct.save();
        res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const productGet = async (req,res)=>{
    try {
        const products = await Product.find({ userId: req.user.id });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const productDelete = async (req,res)=>{
    try {
        const productId = req.params.id;
        const result = await Product.findOneAndDelete({ _id: productId, userId: req.user.id });

        if (!result) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports={productAdd,productDelete,productGet}