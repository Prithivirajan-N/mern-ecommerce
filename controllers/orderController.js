const OrderItem = require('../modules/orderModule');

const orderAdd = async (req,res)=>{
    const { productName, productQuantity, productPrice } = req.body;
    const newOrderItem = new OrderItem({
        productName,
        productQuantity,
        productPrice,
        userId: req.user.id
    });

    try {
        await newOrderItem.save();
        res.status(201).json({ message: "Order created successfully", order: newOrderItem });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const orderDelete = async (req,res)=>{
    try {
        const orderId = req.params.id;
        const result = await OrderItem.findOneAndDelete({ _id: orderId, userId: req.user.id });

        if (!result) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({ message: "Order deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const orderGet = async (res,req)=>{
    try {
        const orderItems = await OrderItem.find({ userId: req.user.id });
        res.json(orderItems);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports={orderAdd,orderGet,orderDelete};