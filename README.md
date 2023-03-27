# Google-reviews
The google review bot is written in Typescript.

## Purpose
To post an automated google review for a specific business/store. Given an google account email, google account password, phone number, review, and business url, it will log into the google account and post a google review as well as a 5 star rating to the business url.

## How it works
First a puppeteer browser is launched, a page is spawned, and the page gets directed to the gmail login page. Using the given email and password, the bot logs into the gmail account and ensures that it has logged in. Once it confirms that the login was successful, it redirects to the business url given. It finds the review button and writes the given review as well as rating it a 5 star rating. Once it finishes typing the review, it posts the review and checks to see if the review was successfully posted. 