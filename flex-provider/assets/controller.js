/*
 * --------------------------------------------------------------------------------------------------------------
 * main controller javascript used by index.html
 *
 * Note that initialize() MUST be executed at the end of index.html
 * --------------------------------------------------------------------------------------------------------------
 */
const UI = {
}


let phoneNumber;
const baseUrl = new URL(location.href);
baseUrl.pathname = baseUrl.pathname.replace(/\/index\.html$/, '');
delete baseUrl.hash;
delete baseUrl.search;
const fullUrl = baseUrl.href.substr(0, baseUrl.href.length - 1);

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

/*
 * --------------------------------------------------------------------------------------------------------------
 * initialize client javascript objects/triggers
 * --------------------------------------------------------------------------------------------------------------
 */
async function initialize() {
  const THIS = 'initialize:';

}