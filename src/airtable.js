var Airtable = require('airtable');

Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.REACT_APP_API_KEY,
});

const base = Airtable.base(process.env.REACT_APP_BASE_TOKEN);
export default base;