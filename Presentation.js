const readline = require('readline');
const serviceModule = require('./Service.js');
const Service = new serviceModule.Service();

class Presentation {

    start() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        console.log(`** Administration Collègues **`);
        console.log(`** Authentification pour connexion à collegues-api **`);

        rl.question(`Quel est votre identifiant (u1) ? `, identifiant => {
            rl.question(`Quel est votre mot de passe (pass1) ? `, mdp => {
                Service.postAuthenticateReq(identifiant, mdp)
                    .then(response => {
                        console.log(`${response.statusCode} : authentification réussie.`);
                        this.afficherMenu(rl);
                    })
                    .catch(err => {
                        console.log(`${err.statusCode} : échec de l'authentification. Aurevoir.`);
                        rl.close();
                    });
            })
        })
    }

    afficherMenu(rl) {
        console.log(
`1. Rechercher un collègue par nom
2. Créer un collègue
3. Modifier email d'un collègue
4. Modifier url de photo d'un collègue
99.Sortir`
        );
        rl.question(
            `Quel est votre choix ? `,
            saisie => {
                console.log(`Vous avez saisi : ${saisie}`);
                if (saisie && saisie === '1') {
                    this.rechercherCollegueParNom(rl);
                } else if (saisie && saisie === '2') {
                    this.creerCollegue(rl);
                } else if (saisie && saisie === '3') {
                    this.modifierEmailCollegue(rl);
                } else if (saisie && saisie === '4') {
                    this.modifierPhotoUrlCollegue(rl);
                } else if (saisie && saisie === '99') {
                    rl.close();
                    console.log('Aurevoir');
                } else {
                    console.log(`Choix invalide, merci de recommencer :`);
                    this.afficherMenu(rl);
                }
            }
        );
    }

    rechercherCollegueParNom(rl) {
        rl.question(
            `Quel est le nom du collègue que vous recherchez ? (durand) `,
            nomCollegue => {
                Service.getToutesInfosColleguesAPartirNom(nomCollegue)
                    .then(body => {
                        console.log(body);
                        this.afficherMenu(rl);
                    })
                    .catch(err => {
                        console.log(`${err.statusCode} : erreur dans la recherche des collègues. `);
                        this.afficherMenu(rl);
                    })
            }
        )
    }

    creerCollegue(rl) {
        rl.question('Nom ? ', nom => {
            rl.question('Prénom(s) ? ', prenoms => {
                rl.question('Email ? ', email => {
                    rl.question('Date de naissance ? (1989-11-11) ', dateDeNaissance => {
                        rl.question('Url de sa photo ? (https://...) ', photoUrl => {
                            rl.question('Identifiant de connexion ? (> 6 carac) ', identifiant => {
                                rl.question('Mot de passe de connexion ? ', motDePasse => {
                                    rl.question('Rôle ? (USER) ', role => {
                                            let collegue = {
                                                nom: nom,
                                                prenoms: prenoms,
                                                email: email,
                                                dateDeNaissance: dateDeNaissance,
                                                photoUrl: photoUrl,
                                                identifiant: identifiant,
                                                motDePasse: motDePasse,
                                                role: role
                                            };
                                            Service.postCreerCollegueReq(collegue)
                                                .then(body => {
                                                    console.log(body);
                                                    this.afficherMenu(rl);
                                                })
                                                .catch(err => {
                                                    console.log(`${err} : échec de la création du collègue`);
                                                    this.afficherMenu(rl);
                                                })
                                        }
                                    )
                                })
                            })
                        })
                    })
                })
            })
        })
    }

    modifierEmailCollegue(rl) {
        console.log(">> Modifier email d'un collègue <<");
        rl.question('Matricule du collègue ? ', matricule => {
            rl.question('Nouvel email ? ', email => {
                Service.patchModifierEmailCollegueReq(matricule, email)
                    .then(() => {
                        console.log(`OK : email modifié.`);
                        this.afficherMenu(rl);
                    })
                    .catch(err => {
                        console.log(`Erreur : email non modifié.\n${err}`);
                        this.afficherMenu(rl);
                    })
            })
        })
    }

    modifierPhotoUrlCollegue(rl) {
        console.log(">> Modifier url de la photo d'un collègue <<");
        rl.question('Matricule du collègue ? ', matricule => {
            rl.question('Nouvel url de la photo ? ', photoUrl => {
                Service.patchModifierPhotoUrlCollegueReq(matricule, photoUrl)
                    .then(() => {
                        console.log(`OK : url de la photo modifiée.`);
                        this.afficherMenu(rl);
                    })
                    .catch(err => {
                        console.log(`Erreur : url non modifié.\n${err}`);
                        this.afficherMenu(rl);
                    })
            })
        })
    }
}

// ***************************** EXPORTS ************************** //

exports.Presentation = Presentation;