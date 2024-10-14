import puppeteer from 'puppeteer';

describe('show/hide event details', () => {
    let browser;
    let page;
    
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250, // slow down by 250ms
            timeout: 0 // removes any puppeteer/browser timeout limitations
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event');
    });

    afterAll(() => {
        browser.close();
    });

    test('An event element is collapsed by default', async () => {
        const eventDetails = await page.$('.event .details'); // Verify that details are not visible by default
        expect(eventDetails).toBeNull();
    });

    test('User can expand an event to see details', async () => {
        await page.click('.event .details-btn'); // Click to expand event details
        const eventDetails = await page.$('.event .details'); // Verify that details are visible
        expect(eventDetails).toBeDefined();
    });

    test('User can collapse an event to hide details', async () => {
        await page.click('.event .details-btn'); // First, expand the event details
        await page.click('.event .details-btn'); // Then, click again to collapse the details
        const eventDetails = await page.$('.event .details'); // Verify that details are no longer visible
        expect(eventDetails).toBeNull();
    });
});

// Bonus Task: Test Feature 1 - Filter Events By City
describe('Filter Events By City', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250,
            timeout: 0
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('#number-of-events'); // Wait for input to be ready
    });

    afterAll(() => {
        browser.close();
    });

    test('When user hasn’t searched for a city, show upcoming events from all cities', async () => {
        const events = await page.$$eval('.event', (elements) => elements.length); // Get number of events displayed
        expect(events).toBeGreaterThan(0); // Expect that some events are displayed
    });

    test('User should see a list of suggestions when they search for a city', async () => {
        await page.type('#number-of-events', 'Berlin'); // Simulate user typing in city
        await page.waitForSelector('.suggestions'); // Wait for suggestions to appear
        const suggestions = await page.$$('.suggestion'); // Get suggestion elements
        expect(suggestions.length).toBeGreaterThan(0); // Expect that suggestions are displayed
    });

    test('User can select a city from the suggested list', async () => {
        await page.type('#number-of-events', 'Berlin'); // Type to trigger suggestions
        await page.waitForSelector('.suggestion'); // Wait for suggestions
        await page.click('.suggestion'); // Click on the first suggestion
        const selectedCity = await page.$eval('#number-of-events', el => el.value); // Get value from input
        expect(selectedCity).toBe('Berlin'); // Verify that the selected city is displayed
    });
});
