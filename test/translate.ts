import { it, describe } from "mocha";
import chai, { expect } from "chai";
import translate from "../lib";
import asPromised from "chai-as-promised";

chai.use(asPromised);

describe("transtate", () => {
	it("should return the french translation of a given text", async () => {
		const expected = "Bonjour";
		const actual = await translate("Hello", { from: "en", to: "fr" });

		expect(actual).to.be.equal(expected);
	});

	it.only("should return the french translation of a text with line carriages", async () => {
		const expected = "Bonjour\nÊtes-vous là?";
		const actual = await translate("Hello\nAre you there?", {
			from: "en",
			to: "fr",
		});

		expect(actual).to.be.equal(expected);
	});

	describe("errors", () => {
		it("should throw an error if the text to be a string", async () => {
			// @ts-ignore
			const actual = translate(42, {
				from: "en",
				to: "fr",
			});

			await expect(actual).to.be.rejectedWith(
				"expected parameter text to be a string"
			);
		});

		it("should throw an error if the options parameter is not an object", async () => {
			// @ts-ignore
			const actual = translate("Hello", 42);

			await expect(actual).to.be.rejectedWith(
				"expected parameter options to be an object"
			);
		});

		it('should throw an error if the options parameter does not contain the "from" key', async () => {
			// @ts-ignore
			const actual = translate("Hello", {});

			await expect(actual).to.be.rejectedWith(
				'expected parameter options to contain the key "from"'
			);
		});

		it('should throw an error if the options parameter does not contain the "to" key', async () => {
			// @ts-ignore
			const actual = translate("Hello", {});

			await expect(actual).to.be.rejectedWith(
				'expected parameter options to contain the key "from"'
			);
		});

		it("should throw an error if the key options.from is not a string", async () => {
			// @ts-ignore
			const actual = translate("Hello", { from: 42, to: "fr" });

			await expect(actual).to.be.rejectedWith(
				"expected key options.from to be a string"
			);
		});

		it("should throw an error if the key options.tofrom is not a string", async () => {
			// @ts-ignore
			const actual = translate("Hello", { from: "en", to: 42 });

			await expect(actual).to.be.rejectedWith(
				"expected key options.to to be a string"
			);
		});
	});
});
