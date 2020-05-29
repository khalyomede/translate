const translate = require("../lib");

const main = async () => {
	const translation = await translate("Hello", {
		from: "en",
		to: "fr",
	});

	console.log("translation", translation);
};

main();
