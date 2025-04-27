const API_URL = "https://fakestoreapi.com/products";

export default async function fetchPosts() {
	const res = await fetch(API_URL);
	if (!res.ok) {
		throw new Error("Failed to fetch posts");
	}
	return await res.json();
}
