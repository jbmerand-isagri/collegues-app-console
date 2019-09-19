class Collegue {

    constructor(nom, prenoms, email, dateDeNaissance, photoUrl, identifiant, motDePasse, role) {
        this.nom = nom;
        this.prenoms = prenoms;
        this.email = email;
        this.dateDeNaissance = dateDeNaissance;
        this.photoUrl = photoUrl;
        this.identifiant = identifiant;
        this.motDePasse = motDePasse;
        this.role = role;
    }

    toString() {
        return `Informations du collegue: ${this.nom}, ${this.prenoms}, ${this.email}, ${this.dateDeNaissance}, 
        ${this.photoUrl}, ${this.identifiant}, ${this.motDePasse}, ${this.role}`
    }
}

exports.Collegue = Collegue;