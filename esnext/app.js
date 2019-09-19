let favoriteCityId = "rome";

favoriteCityId = "paris";

console.log(favoriteCityId); // paris

const citiesId = ['paris', 'nyc', 'rome', 'rio-de-jainero'];

console.log(citiesId);

// citiesId = [];
// console.log(citiesId);

citiesId.push('tokyo');
console.log(citiesId);

function getWeather(cityId) {
    let city = cityId.toUpperCase();
    let temperature = 20;
    return {city, temperature};
};

const weather = getWeather(favoriteCityId);

console.log(weather);

const {temperature, city} = weather;

console.log(city);
console.log(temperature);

// let [maValeur, ...leResteDesValeurs] = tab;

const [parisId, nycId, ...othersCitiesId] = citiesId;

console.log(parisId);
console.log(nycId);
console.log(othersCitiesId.length);

class Trip {

    constructor(id, name, imageUrl) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
    }

    toString() {
        return `Trip [${this.id}, ${this.name}, ${this.imageUrl}, ${this._price}]`
    }

    get price() {
        return this._price;
    }

    set price(price) {
        this._price = price;
    }

    static getDefaultTrip() {
        return new this('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg');
    }
}

const parisTrip = new Trip('paris', 'Paris', 'image/paris.jpg');

console.log(parisTrip);
console.log(parisTrip.name);
console.log(parisTrip.toString());

parisTrip.price = 100;
console.log(parisTrip.toString());

const defaultTrip = Trip.getDefaultTrip();
console.log(defaultTrip.toString());

class FreeTrip extends Trip {

    constructor(id, name, imageUrl) {
        super(id, name, imageUrl);
        this._price = 0;
    }

    toString() {
        return `Free${super.toString()}`;
    }
}

const freeTrip = new FreeTrip('nantes', 'Nantes', 'img/nantes.jpg');

console.log(freeTrip.toString());

// Promise, Set, Map, Arrow Function

class TripService {

    constructor() {
        this.setTrip = new Set();
        this.setTrip.add(new Trip('paris', 'Paris', 'img/paris.jpg'));
        this.setTrip.add(new Trip('nantes', 'Nantes', 'img/nantes.jpg'));
        this.setTrip.add(new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg'));
    }

    findByName(tripName) {

        return new Promise((resolve, reject) => {

            setTimeout(() => { // ici l'exécution du code est asynchrone

                    this.setTrip.forEach((trip) => {
                            if (trip.name === tripName) {
                                resolve(trip);
                            }
                        }
                    );
                    reject(`No trip with name ${tripName}`);

            }, 2000)
        });
    }
}

class PriceService {

    constructor() {
        this.mapPrice = new Map();
        this.mapPrice.set('paris', 100);
        this.mapPrice.set('rio-de-janeiro', 800);
        this.mapPrice.set('nantes', 'no price');
    }

    findPriceByTripId(tripId) {

        return new Promise((resolve, reject) => {

            setTimeout(() => { // ici l'exécution du code est asynchrone

                this.mapPrice.forEach((price, id) => {
                    if(tripId === id) {
                        if(!isNaN(price)) {
                            resolve(price);
                        }
                    }
                });
                reject(`No price found for id ${tripId}`);

            }, 2000)
        });
    }
}

const tripService = new TripService();
const priceService = new PriceService();

tripService.findByName('Paris').then(trip => console.log(trip));

tripService.findByName('Toulouse').catch(err => console.log(err));

tripService.findByName('Rio de Janeiro')
    .then(trip => priceService.findPriceByTripId(trip.id))
    .then(price => console.log(`Price found : ${price}`));

tripService.findByName('Nantes').then(trip => priceService.findPriceByTripId(trip.id)).then(price => console.log(price)).catch(err => console.log(err));