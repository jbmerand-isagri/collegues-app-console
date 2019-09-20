console.log("Meteo App");

class Meteo {

    constructor(private _ville:string, private _temperature:number) {
    }

    toString():string {
        return `${this._ville} - ${this._temperature}°C`
    }
}

let nantesCeMatin = new Meteo('Nantes', 12);

console.log(nantesCeMatin.toString());



