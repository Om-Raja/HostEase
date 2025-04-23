const getProduct = function (req, res){
    const productList = [{item: "Mango", quantity: 2}, {item: "Apple", quantity: 4}];
    res.status(200).send(productList);
}
module.exports = getProduct;