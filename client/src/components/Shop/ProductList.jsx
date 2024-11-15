import ProductCard from "./ProductCard";

const ProductList = () => {
  const products = [
    {
      id: 1,
      image: "https://via.placeholder.com/150",
      name: "Product 1",
      category: "Category A",
      description: "Description for Product 1",
      price: 49.99,
    },
    {
      id: 2,
      image: "https://via.placeholder.com/150",
      name: "Product 2",
      category: "Category B",
      description: "Description for Product 2",
      price: 79.99,
    },
    {
      id: 3,
      image: "https://via.placeholder.com/150",
      name: "Product 3",
      category: "Category C",
      description: "Description for Product 3",
      price: 99.99,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <>
          <div>
            <ProductCard key={product.id} product={product} />
          </div>
        </>
      ))}
    </div>
  );
};

export default ProductList;
