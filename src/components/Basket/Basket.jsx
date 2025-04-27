import "./Basket.css";

function Basket({
	item,
	removeFromCart,
	increaseQuantity,
	decreaseQuantity,
	clearCart = clearCart,
}) {
	return (
		<>
			<button onClick={() => clearCart()}>Clear Cart</button>
			<div className="basket">
				<h2>{item.title}</h2>
				<img src={item.image} alt={item.title} />
				<p>{item.description}</p>
				<p>${item.price}</p>
				<p>Quantity: {item.quantity}</p>
				<button onClick={() => increaseQuantity(item.id)}>+</button>
				<button onClick={() => decreaseQuantity(item.id)}>-</button>
				<button onClick={() => removeFromCart(item.id)}>
					Remove from Cart
				</button>
			</div>
		</>
	);
}

export default Basket;
