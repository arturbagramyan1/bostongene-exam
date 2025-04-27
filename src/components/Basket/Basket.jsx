import "./Basket.css";

function Basket({ item, increaseQuantity, decreaseQuantity }) {
	return (
		<>
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
