import { Actor } from 'apify';
import { chromium } from 'playwright';


Actor.main(async () => {

    const input = await Actor.getInput();
    const mobile = input.mobile;
    const pages = input.pages_to_scrape;

    const allresults = [];

    const scrapeFlipkart = async (url, page_number) => {
        const browser = await chromium.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto(url);
        await page.waitForSelector('.col-12-12');

        const results = await page.$$eval('.col-12-12', (elements, page_number) => {
            return elements.map(el => {
                const col7 = el.querySelector('.col-7-12');
                const col5 = el.querySelector('.col-5-12');

                const title = col7?.querySelector('.KzDlHZ')?.textContent?.trim() || '';
                const rating = col7?.querySelector('.XQDdHH')?.textContent?.trim() || '';
                const price = col5?.children?.[0]?.children?.[0]?.children?.[0]?.textContent?.trim() || '';

                return {
                    title,
                    rating,
                    price: price,
                    page: page_number
                };
            });
        }, page_number);

        allresults.push(...results);
        await browser.close();
    };

    for (let i = 1; i <= pages; i++) {
        const url = `https://www.flipkart.com/search?q=${mobile}mobile&page=${i}`;
        await scrapeFlipkart(url, i);
    }


    const items = {
        products: allresults
    }

    await Actor.pushData(items);

    console.log('Done');
});
