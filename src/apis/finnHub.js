import axios from "axios";

const TOKEN = "cg7ahtpr01qus5fl1ap0cg7ahtpr01qus5fl1apg";

export default axios.create({
	baseURL: "https://finnhub.io/api/v1",
	params: {
		token: TOKEN,
	},
});
