const _isDev = window.location.port.indexOf("4200") > -1;
const getHost = () => {
  const protocol = window.location.protocol;
  const host = window.location.host;
  return `${protocol}//${host}`;
}
const apiURI = _isDev ? "http://localhost:3000/api" : "/api"
const yelpURI = _isDev ? "http://localhost:3000/yelp" : "/yelp"

export const ENV = {
  BASE_URI: getHost(),
  BASE_API: apiURI,
  YELP_URI: yelpURI,
  CLIENT_ID: 'HYr6a2T7jF1Fot1t8EFLNLBj3MrWlGZA',
  CLIENT_DOMAIN: "lfaudreejr.auth0.com"
}
