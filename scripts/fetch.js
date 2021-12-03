const getProducts = async () => {
    const response = await fetch("product.json");
    const data = await response.json();
    return data;
}