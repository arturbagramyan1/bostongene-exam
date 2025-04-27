import "./Product.css";

function Product({ product, addToCart }) {
	return (
		<div className="product">
			<h2>{product.title}</h2>
			<img src={product.image} alt={product.title} />
			<p>{product.description}</p>
			<p>${product.price}</p>
			<button onClick={() => addToCart(product)}>Add to Cart</button>
		</div>
	);
}

export default Product;
