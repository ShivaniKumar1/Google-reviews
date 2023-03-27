import { account } from './interfaces';

var process = require('process');
const puppeteer = require('puppeteer-extra')
const { executablePath } = require('puppeteer')

main()

async function main() {
    const account: account = {
        email: 'email',
        number: '0123456789',
        password: 'pass',
        review: 'I love this place! Their chicken sandwich is the best.',
        business_url: "https://www.google.com/search?q=mcdonalds",
    }

    var success = false;
    while (!success) {
        success = await login(account);
    }
    process.exit(0)
    return
};

async function login(account: account) {
    const gmail_url = "https://accounts.google.com/signin"

    // create puppeteer browser
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: executablePath(),
    });

    // spawn a new page and go to page url; wait until network is idle for two seconds
    const page = await browser.newPage();
    await page.goto(gmail_url, {
        waitUntil: 'networkidle2',
    });

    // log into the gmail using email/phone number & password
    if (account.email == '' || account.email == null ) {
        await page.type('input[name="identifier"]', account.number)
    } else {
        await page.type('input[name="identifier"]', account.email)
    }
    const info_next = await page.$('.fwaf')
    await info_next.click();

    await page.waitForSelector('input[type="password"]')
    await page.type('input[type="password"]', account.password)
    const enter = await page.$('.OveXe-fea')
    await enter.click();

    // check if you successfully logged in
    var error_pass = await page.$('.fwafea')
    if (error_pass != null) {
        console.log("couldn't log you in; exiting")
        await browser.close();
        process.exit(0)
    } else {
        console.log("logged you in successfully")
    }

    await page.goto(account.business_url, {
        waitUntil: 'networkidle2',
    });

    // find the review button on the google page 
    await page.waitForSelector('.dwawr');
    const review_button = await page.$('.dwawr')
    await review_button.click();

    // enter the form to rate stars and post review
    await page.waitForSelector('iframe');
    const elementHandle = await page.$(
        'iframe[name="widget"]',
    );

    // rate stars
    console.log('filling review in');
    const star_rating = await page.$('[data-rating="5"]')
    console.log(star_rating)
    await star_rating.click();

    // write the review, and post it
    const review = await page.$('.fewvsa-wGMbrd')
    await review.type(account.review)

    const post_button = await page.$('.RLmnJb')
    if (post_button == null) {
        console.log('button is null; exiting')
        await browser.close();
        process.exit(0)
    }
    await post_button.click();
    console.log("review posted")
    await browser.close();
    return true;
}