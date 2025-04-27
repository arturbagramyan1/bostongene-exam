// manage cart state in a parent component and pass down via props
// useref add reset to the cart state that uses useref

import Product from "../Product/Product";
import { useEffect, useState } from "react";
import "./ProductList.css";
import { useContext } from "react";
import { ProductContext } from "../../contexts/ProductListContext";
import { useRef } from "react";
import Basket from "../Basket/Basket";

function ProductList() {
	const [cart, setCart] = useState(() => {
		const savedCart = localStorage.getItem("cart");
		return savedCart ? JSON.parse(savedCart) : [];
	});
	const [products, setProducts] = useState([]);
	const [isBasketopen, setIsBasketOpen] = useState(false);
	const { theme, setTheme, themetoggle } = useContext(ProductContext);
	const previousCartRef = useRef([]);
	const [searchProduct, setSearchProduct] = useState("");
	const [filteredProducts, setFilteredProducts] = useState([]);

	const resetCart = () => {
		setCart(previousCartRef.current);
	};

	useEffect(() => {
		fetch("https://fakestoreapi.com/products")
			.then((response) => response.json())
			.then((data) => setProducts(data));
	}, []);

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cart));
	}, [cart]);

	const addToCart = (product) => {
		setCart((prevCart) => {
			const found = prevCart.find((item) => item.id === product.id);
			if (found) {
				return prevCart.map((item) =>
					item.id === product.id
						? { ...item, quantity: (item.quantity || 1) + 1 }
						: item
				);
			}
			return [...prevCart, { ...product, quantity: 1 }];
		});
	};

	const totalPrice = () => {
		return cart.reduce((total, item) => {
			return total + item.price * item.quantity;
		}, 0);
	};

	const removeFromCart = (productId) => {
		setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
	};

	const increaseQuantity = (productId) => {
		setCart((prevCart) =>
			prevCart.map((item) =>
				item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
			)
		);
	};

	const decreaseQuantity = (productId) => {
		setCart((prevCart) => {
			const foundd = prevCart.find((item) => item.id === productId);
			if (foundd?.quantity > 1) {
				return prevCart.map((item) =>
					item.id === productId
						? { ...item, quantity: item.quantity - 1 }
						: item
				);
			}
			return prevCart.filter((item) => item.id !== productId);
		});
	};

	const clearCart = () => {
		setCart([]);
	};

	useEffect(() => {
		if (!isBasketopen) {
			previousCartRef.current = [...cart];
		}
	}, [isBasketopen, cart]);

	useEffect(() => {
		if (searchProduct.trim() === "") {
			setFilteredProducts(products);
		} else {
			const filtered = products.filter((product) =>
				product.title.toLowerCase().includes(searchProduct.toLowerCase())
			);
			setFilteredProducts(filtered);
		}
	}, [searchProduct, products]);

	return (
		<>
			<div className={theme}>
				<button onClick={themetoggle}>Toggle Theme</button>
				<button onClick={() => setIsBasketOpen(!isBasketopen)}>
					Basket Toggle
				</button>
				<button onClick={resetCart}>Reset Cart</button>
				<button onClick={() => clearCart()}>Clear Cart</button>

				{!isBasketopen && (
					<div>
						<input
							type="text"
							placeholder="Search productsf"
							value={searchProduct}
							onChange={(e) => setSearchProduct(e.target.value)}
						/>
					</div>
				)}

				{isBasketopen ? (
					<>
						<div>Total price is:{totalPrice().toFixed(2)}</div>
						{cart.map((item) => (
							<Basket
								key={item.id}
								item={item}
								totalPrice={totalPrice}
								increaseQuantity={increaseQuantity}
								decreaseQuantity={decreaseQuantity}
							/>
						))}
					</>
				) : (
					<>
						{filteredProducts.map((item) => (
							<Product key={item.id} product={item} addToCart={addToCart} />
						))}
					</>
				)}
			</div>
		</>
	);
}

export default ProductList;
