import { useEffect, useState } from "react";
import { PokemonCards } from "./PokemonCards.jsx";

export const Pokemon = () => {
	const [pokemon, setPokemon] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [search, setSearch] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(10); // Number of items per page

	const API = "https://pokeapi.co/api/v2/pokemon?limit=600";

	// "https://pokeapi.co/api/v2/pokemon?limit=1302";

	const fetchPokemon = async () => {
		try {
			const res = await fetch(API);
			const data = await res.json();

			const detailedPokemon = data.results.map(async currentPokemon => {
				const res = await fetch(currentPokemon.url);
				const data = await res.json();
				return data;
			});

			const detailedResponse = await Promise.all(detailedPokemon);
			setPokemon(detailedResponse);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setError(error);
		}
	};

	// Filter the Pokémon based on the search term
	const filteredPokemon = search
		? pokemon.filter(value =>
				value.name.toLowerCase().includes(search.toLowerCase())
		  )
		: pokemon;

	// Pagination Logic
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = filteredPokemon.slice(indexOfFirstItem, indexOfLastItem);

	const nextPage = () => {
		if (currentPage < Math.ceil(filteredPokemon.length / itemsPerPage)) {
			setCurrentPage(currentPage + 1);
		}
	};

	const prevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	useEffect(() => {
		fetchPokemon();
	}, []);

	if (loading) {
		return (
			<div className="w-full h-screen flex items-center justify-center">
				<l-bouncy size="90" speed="1.75" color="white"></l-bouncy>
			</div>
		);
	}
	if (error) {
		return <h1>{error.message}</h1>;
	}

	return (
		<section className="w-full h-auto bg-blue-300 py-2 px-10">
			<h1 className="text-3xl text-center font-semibold my-5 text-gray-50">
				Find your Pokémon
			</h1>
			<input
				className="w-full px-3 py-3 outline-none my-8 border-b-2 border-black rounded-2xl"
				type="text"
				value={search}
				onChange={e => {
					setSearch(e.target.value);
					setCurrentPage(1); // Reset to first page on new search
				}}
			/>
			<div>
				<ul className="cards grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
					{currentItems.map(poke => {
						return <PokemonCards key={poke.id} data={poke} />;
					})}
				</ul>
			</div>
			<div className="flex justify-between mt-5">
				<button
					onClick={prevPage}
					disabled={currentPage === 1}
					className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50`}
				>
					Previous
				</button>
				<button
					onClick={nextPage}
					disabled={
						currentPage >= Math.ceil(filteredPokemon.length / itemsPerPage)
					}
					className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50`}
				>
					Next
				</button>
			</div>
			<p className="mt-4 text-center">
				Page {currentPage} of {Math.ceil(filteredPokemon.length / itemsPerPage)}
			</p>
		</section>
	);
};
