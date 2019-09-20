/**
 * Classe représentant un collègue.
 */
export default class Collegue {

    constructor(private _nom: string, private _prenoms: string, private _email: string,
                private _dateDeNaissance: string, private _photoUrl: string, private _identifiant: string,
                private _motDePasse: string, private _role: string) {
    }

    get nom(): string {
        return this._nom;
    }

    set nom(value: string) {
        this._nom = value;
    }

    get prenoms(): string {
        return this._prenoms;
    }

    set prenoms(value: string) {
        this._prenoms = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get dateDeNaissance(): string {
        return this._dateDeNaissance;
    }

    set dateDeNaissance(value: string) {
        this._dateDeNaissance = value;
    }

    get photoUrl(): string {
        return this._photoUrl;
    }

    set photoUrl(value: string) {
        this._photoUrl = value;
    }

    get identifiant(): string {
        return this._identifiant;
    }

    set identifiant(value: string) {
        this._identifiant = value;
    }

    get motDePasse(): string {
        return this._motDePasse;
    }

    set motDePasse(value: string) {
        this._motDePasse = value;
    }

    get role(): string {
        return this._role;
    }

    set role(value: string) {
        this._role = value;
    }

    toString(): String {
        return `Informations du collegue: ${this._nom}, ${this._prenoms}, ${this._email}, ${this._dateDeNaissance}, 
        ${this._photoUrl}, ${this._identifiant}, ${this._motDePasse}, ${this._role}`
    }
}