import { format } from 'date-fns'

/**
 * Classe représentant un collègue.
 */
export default class Collegue {

    /**
     * Constructeur
     * @param _nom : string, nom du collègue
     * @param _prenoms : string, prénom(s) du collègue
     * @param _email : string, email du collègue
     * @param _dateDeNaissance : Date, date de naissance du collègue
     * @param _photoUrl : string, url de la photo du collègue
     * @param _identifiant : string, identifiant du collègue
     * @param _motDePasse : string, mot de passe du collègue
     * @param _role : string, statut du collègue par rapport à l'API collegues-api
     */
    constructor(private _nom: string, private _prenoms: string, private _email: string,
                private _dateDeNaissance: Date, private _photoUrl: string, private _identifiant: string,
                private _motDePasse: string, private _role: string) {
    }

    get dateDeNaissance(): Date {
        return this._dateDeNaissance;
    }

    set dateDeNaissance(value: Date) {
        this._dateDeNaissance = value;
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

    /**
     * Méthode retournant l'ensemble des attributs en chaine de caractères.
     */
    toString(): String {
        return `Informations du collegue: ${this._nom}, ${this._prenoms}, ${this._email}, 
        ${this._dateDeNaissance}, ${this._photoUrl}, ${this._identifiant}, 
        ${this._motDePasse}, ${this._role}`
    }

}