class Sejour {

    private _nom: string;
    private _prix: number;

    constructor(nom: string, prix: number) {
        this._nom = nom;
        this._prix = prix;
    }

    get nom(): string {
        return this._nom;
    }

    set nom(value: string) {
        this._nom = value;
    }

    get prix(): number {
        return this._prix;
    }

    set prix(value: number) {
        this._prix = value;
    }
}

class SejourService {

    private sejourArray: Sejour[] = [];

    constructor() {
        this.sejourArray.push(new Sejour('Paris', 2000));
        this.sejourArray.push(new Sejour('Varsovie', 500));
        this.sejourArray.push(new Sejour('Tokyo', 5500));

    }

    rechercherSejourParNom(nom: string): Sejour | null {
        let sejourDemande:Sejour = null;
        this.sejourArray.forEach(sejour => {
            if(nom === sejour.nom) {
                sejourDemande = sejour
            }
        });
        return sejourDemande;
    }
}

const sejourService = new SejourService();

console.log(sejourService.rechercherSejourParNom('Tokyo'));
