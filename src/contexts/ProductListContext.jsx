import { useState } from "react";
import { createContext } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
	const [theme, setTheme] = useState("light");

	const themetoggle = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		if (newTheme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	};

	return (
		<ProductContext.Provider value={{ theme, setTheme, themetoggle }}>
			{children}
		</ProductContext.Provider>
	);
};
