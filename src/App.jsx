import "./App.css";
import { ProductProvider } from "./contexts/ProductListContext";
import ProductList from "./components/ProductList/ProductList";
function App() {
	return (
		<ProductProvider>
			<ProductList />
		</ProductProvider>
	);
}

export default App;
