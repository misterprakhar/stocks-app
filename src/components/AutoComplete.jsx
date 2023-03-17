import { useState, useEffect, useContext } from "react";
import finnHub from "../apis/finnHub";
import { WatchListContext } from "../context/watchListContext";

const AutoComplete = () => {
	const [search, setSearch] = useState("");
	const [results, setResults] = useState([]);
	const { addStock } = useContext(WatchListContext);

	const renderDropDown = () => {
		return search ? "show" : null;
	};

	useEffect(() => {
		let isMounted = true;
		const fetchData = async () => {
			try {
				const response = await finnHub.get("/search", {
					params: {
						q: search,
					},
				});
				if (isMounted) setResults(response.data.result);
			} catch (error) {}
		};
		if (search.length > 0) fetchData();
		else setResults([]);
		return () => (isMounted = false);
	}, [search]);

	return (
		<div className="w-50 p-5 rounded mx-auto">
			<div className="form-floating dropdown">
				<input
					type="text"
					className="form-control"
					style={{ backgroundColor: "rgba(145,158,171,0.04)" }}
					id="search"
					placeholder="Search"
					autoComplete="off"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<label htmlFor="search">Search</label>
				<ul
					style={{ height: "500px", overflowY: "scroll", overflowX: "hidden", cursor: "pointer" }}
					className={`dropdown-menu ${renderDropDown()}`}
				>
					{results.map((result) => {
						return (
							<li
								key={result.symbol}
								className="dropdown-item"
								onClick={() => {
									addStock(result.symbol);
									setSearch("");
								}}
							>
								{result.description} ({result.symbol})
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default AutoComplete;
