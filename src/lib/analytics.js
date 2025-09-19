import ReactGA from 'react-ga4';

if (process.env.GA_ID) {
    ReactGA.initialize(process.env.GA_ID);

    // Track events like add to cart
    ReactGA.event({ category: 'Cart', action: 'Add' });
}

