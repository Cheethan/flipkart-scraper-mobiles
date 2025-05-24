# Flipkart Mobile Scraper (Apify + Playwright)

This GitHub repository contains an Apify Actor built with [Playwright](https://playwright.dev/) and [Apify SDK](https://sdk.apify.com/), designed to scrape mobile product listings from [Flipkart](https://www.flipkart.com).

Link: https://apify.com/jjadventures/flipkart-mobile-scraper/api

---

## Features

- Scrapes mobile phones based on a search keyword.
- Extracts product title, rating, price, and page number.
- Supports scraping from multiple pages.
- Outputs structured JSON data to Apify Dataset.

---

## Technologies Used

- [Apify SDK](https://sdk.apify.com/)
- [Playwright](https://playwright.dev/)
- JavaScript (ES Modules)

---

## Input Example

You must provide an input in JSON format when running the actor:


{
  "mobile": "iphone",
  "pages_to_scrape": 3
}
