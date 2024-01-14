import jsdom from 'jsdom';
import fetch from 'node-fetch';

const { JSDOM } = jsdom;

const url = 'https://al3xback.github.io/fmentor-article-preview-mocha/';

const getData = async () => {
	return fetch(url)
		.then((res) => {
			return res.text();
		})
		.then((body) => {
			const { document } = new JSDOM(body).window;
			return document;
		})
		.catch((err) => {
			throw new Error(err);
		});
};

describe('DOM', () => {
	beforeEach(async () => {
		try {
			const document = await getData();
			global.document = document;
		} catch (err) {
			console.log(err);
		}
	});

	it('should have a number type of card image width and height attribute values', () => {
		const cardImgEl = document.querySelector('.card__image img');
		const cardImgWidth = cardImgEl.width;
		const cardImgHeight = cardImgEl.height;

		expect(cardImgWidth).toBeInstanceOf(Number);
		expect(cardImgHeight).toBeInstanceOf(Number);
	});

	it("should have an author name element that contains 'Michelle Appleton' word", () => {
		const cardAuthorNameEl = document.querySelector('.card__author-name');
		const cardAuthorName = cardAuthorNameEl.textContent.trim();

		expect(cardAuthorName).toContain('Michelle Appleton');
	});

	it('should have two children inside of the article element', () => {
		const articleEl = document.querySelector('article');
		const articleChildrenEls = articleEl.children;

		expect(articleChildrenEls).toHaveSize(2);
	});

	it('should have an empty alt attribute value of card image element', () => {
		const cardImgEl = document.querySelector('.card__image img');
		const cardImgAlt = cardImgEl.getAttribute('alt');

		expect(cardImgAlt).toBe('');
	});
});
