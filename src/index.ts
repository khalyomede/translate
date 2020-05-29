import { IOptions } from "./interfaces";
import axios from "axios";

/**
 * Translate a text and return the result.
 * @param {String} text The text to be translated.
 * @param {Object} options The options.
 * @param {String} options.from The lang of the text being translated.
 * @param {String} options.to The lang in which the text should be translated.
 * @throws {TypeError} If the first parameter is not a string.
 * @throws {TypeError} If the second parameter is not an Object.
 * @throws {TypeError} If the second parameter is missing the "from" key.
 * @throws {TypeError} If the second parameter is missing the "to" key.
 * @throws {TypeError} If the second parameter key "from" is not a string.
 * @throws {TypeError} If the second parameter key "to" is not a string.
 * @return {Promise<String>}
 */
const translate = async (text: string, options: IOptions): Promise<string> => {
	if (typeof text !== "string") {
		throw new TypeError("expected parameter text to be a string");
	}

	if (!(options instanceof Object)) {
		throw new TypeError("expected parameter options to be an object");
	}

	if (!("from" in options)) {
		throw new TypeError(
			'expected parameter options to contain the key "from"'
		);
	}

	if (!("to" in options)) {
		throw new TypeError(
			'expected parameter options to contain the key "to"'
		);
	}

	if (typeof options.from !== "string") {
		throw new TypeError("expected key options.from to be a string");
	}

	if (typeof options.to !== "string") {
		throw new TypeError("expected key options.to to be a string");
	}

	const encodedText = encodeURI(text);
	const { data } = await axios.get(
		`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${options.from}&tl=${options.to}&dt=t&q=${encodedText}`
	);

	// @ts-ignore
	// Too lazy to create a type for this kind of Array:
	// [ 'Bonjour\n', 'Hello\n', null, null, 1 ]
	return data[0].map((line) => line[0]).join("");
};

export default translate;
