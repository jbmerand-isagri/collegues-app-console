// ***************************** REQUIRES ************************** //

const readline = require('readline');
const serviceModule = require('./service.js');

// ***************************** FUNCTIONS ************************** //

const start = () => {
    console.log('** Administration Collègues **');
    console.log("** Authentification pour connexion à collegues-api **");

    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Quel est votre identifiant (u1) ? ', function (identifiant) {
        rl.question('Quel est votre mot de passe (pass1) ? ', function (mdp) {
            serviceModule.postAuthenticateReq(identifiant, mdp)
                .then(response => {
                    console.log(`${response.statusCode} : authentification réussie.`);
                    afficherMenu(rl);
                })
                .catch(err => {
                    console.log(`${err.statusCode} : échec de l'authentification. Aurevoir.`);
                    rl.close();
                });
        })
    })
};

const afficherMenu = rl => {
    console.log("1. Rechercher un collègue par nom\n2. Créer un collègue\n3. Modifier email d'un collègue\n4. Modifier url de photo d'un collègue\n99.Sortir");
    rl.question('Quel est votre choix ? ', function (saisie) {
        console.log(`Vous avez saisi : ${saisie}`);
        if (saisie && saisie === '1') {
            rechercherCollegueParNom(rl);
        } else if (saisie && saisie === '2') {
            creerCollegue(rl);
        } else if (saisie && saisie === '3') {
            modifierEmailCollegue(rl);
        } else if (saisie && saisie === '4') {
            modifierPhotoUrlCollegue(rl);
        } else if (saisie && saisie === '99') {
            rl.close();
            console.log('Aurevoir');
        } else {
            console.log("Choix invalide, merci de recommencer :");
            afficherMenu(rl);
        }
    });
};

const rechercherCollegueParNom = rl => rl.question(
    'Quel est le nom du collègue que vous recherchez ? (durand) ', function (nomCollegue) {

        serviceModule.getToutesInfosColleguesAPartirNom(nomCollegue)
            .then(body => {
                    console.log(body);
                    afficherMenu(rl);
                }
            )
            .catch(err => {
                console.log(`${err.statusCode} : erreur dans la recherche des collègues. `);
                afficherMenu(rl);
            })
    }
);

const creerCollegue = rl => {
    rl.question('Nom ? ', function (nom) {
        rl.question('Prénom(s) ? ', function (prenoms) {
            rl.question('Email ? ', function (email) {
                rl.question('Date de naissance ? (1989-11-11) ', function (dateDeNaissance) {
                    rl.question('Url de sa photo ? (https://...) ', function (photoUrl) {
                        rl.question('Identifiant de connexion ? (> 6 carac) ', function (identifiant) {
                            rl.question('Mot de passe de connexion ? ', function (motDePasse) {
                                rl.question('Rôle ? (USER) ', function (role) {
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
                                        serviceModule.postCreerCollegueReq(collegue)
                                            .then(body => {
                                                    console.log(body);
                                                    afficherMenu(rl);
                                                }
                                            )
                                            .catch(err => {
                                                console.log(`${err} : échec de la création du collègue`);
                                                afficherMenu(rl);
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
};

const modifierEmailCollegue = rl => {
    console.log(">> Modifier email d'un collègue <<");
    rl.question('Matricule du collègue ? ', function (matricule) {
        rl.question('Nouvel email ? ', function (email) {
            serviceModule.patchModifierEmailCollegueReq(matricule, email)
                .then(() => {
                    console.log(`OK : email modifié.`);
                    afficherMenu(rl);
                })
                .catch(err => {
                    console.log(`Erreur : email non modifié.\n${err}`);
                    afficherMenu(rl);
                })
        })
    })
};

const modifierPhotoUrlCollegue = rl => {
    console.log(">> Modifier url de la photo d'un collègue <<");
    rl.question('Matricule du collègue ? ', function (matricule) {
        rl.question('Nouvel url de la photo ? ', function (photoUrl) {
            serviceModule.patchModifierPhotoUrlCollegueReq(matricule, photoUrl)
                .then(() => {
                    console.log(`OK : url de la photo modifiée.`);
                    afficherMenu(rl);
                })
                .catch(err => {
                    console.log(`Erreur : url non modifié.\n${err}`);
                    afficherMenu(rl);
                })
        })
    })
};

// ***************************** EXPORTS ************************** //

exports.start = start;