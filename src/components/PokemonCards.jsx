export const PokemonCards = ({ data }) => {
	const { front_default } = data.sprites.other.dream_world;

	return (
		<li
			className="bg-gray-200 px-10 py-8 flex flex-col items-center
		justify-center gap-6 rounded-2xl lg:px-12"
		>
			<img className="w-40 " src={front_default} alt={data.name} />
			<h1 className="text-[18px] uppercase font-bold">{data.name}</h1>
			<h2 className="font-extrabold bg-green-500 px-6 py-2 text-white text-[17px] rounded-3xl">
				{data.types
					.map(value => {
						return value.type.name.toUpperCase();
					})
					.join(", ")}
			</h2>
			<div className="w-full grid grid-cols-2 text-[15px] gap-5 ">
				<h3 className="font-semibold text-[17px]">
					Height :<span className="font-light">{` ${data.height}`}</span>
				</h3>
				<h3 className="font-semibold text-[17px]">
					Weight :<span className="font-light">{` ${data.weight}`}</span>
				</h3>
				<h3 className="font-semibold text-[17px]">
					Speed :
					<span className="font-light">{` ${data.stats[5].base_stat}`}</span>
				</h3>
				<h3 className="font-semibold text-[17px]">
					Experience :
					<span className="font-light">{` ${data.base_experience}`}</span>
				</h3>
				<h3 className=" font-semibold text-[17px]">
					Attack:{" "}
					<span className="font-light">{` ${data.stats[1].base_stat}`}</span>
				</h3>
				<h3 className="font-semibold text-[17px]">
					Abilities :
					<span className="font-light">
						{data.abilities
							.map(value => {
								return ` ${value.ability.name}`;
							})
							.slice(0, 1)
							.join(", ")}
					</span>
				</h3>
			</div>
		</li>
	);
};
