// ***************************** EXPORTS/REQUIRES ************************** //

var readline = require('readline');
var serviceModule = require('./service.js');

exports.startFn = start;

// ***************************** FUNCTIONS ************************** //

function start() {
    console.log("** Authentification pour connexion à collegues-api **");

    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Quel est votre identifiant (u1) ? ', function (identifiant) {
        rl.question('Quel est votre mot de passe (pass1) ? ', function (mdp) {
            serviceModule.postAuthenticateReq(identifiant, mdp, function (statusCode) {
                if (statusCode === 200) {
                    console.log("Authentification réussie");
                    afficherMenu(rl);
                } else {
                    console.log("Authentification échouée. Aurevoir");
                    rl.close();
                }
            });
        })
    })
}

function afficherMenu(rl) {
    console.log("1. Rechercher un collègue par nom\n2. Créer un collègue\n99.Sortir");
    rl.question('Quel est votre choix ? ', function (saisie) {
        console.log(`Vous avez saisi : ${saisie}`);
        if (saisie && saisie === '1') {
            rechercherCollegueParNom(rl);
        } else if (saisie && saisie === '2') {
            creerCollegue(rl);
        } else if (saisie && saisie === '99') {
            rl.close();
            console.log('Aurevoir');
        } else {
            console.log("Choix invalide, merci de recommencer :");
            afficherMenu(rl);
        }
    });
}

function rechercherCollegueParNom(rl) {
    rl.question('Quel est le nom du collègue que vous recherchez ? ', function (nomCollegue) {

        // En utilisant deux fonctions de service :

        // serviceModule.getMatriculeSelonNomReq(
        //     nomCollegue,
        //     function (callbackFn) {
        //         console.log(callbackFn);
        //         callbackFn.forEach(function (matricule) {
        //             serviceModule.getInfosCollegueSelonMatricule(
        //                 matricule,
        //                 function (callbackFn) {
        //                     console.log(callbackFn);
        //                     afficherMenu(rl);
        //                 },
        //                 function (errorFn) {
        //                     console.log(errorFn);
        //                     afficherMenu(rl);
        //                 })
        //         })
        //     },
        //     function (errorFn) {
        //         console.log(errorFn);
        //         afficherMenu(rl);
        //     })

        // En utilisant une seule fonction de service :
        serviceModule.getToutesInfosColleguesAPartirNom(
            nomCollegue,
            function (callbackFn) {
                console.log(callbackFn);
                afficherMenu(rl);
            },
            function (errorFn) {
                console.log(errorFn);
                afficherMenu(rl);
            }
        )
    })
}

function creerCollegue(rl) {
    rl.question('Nom ? ', function (nom) {
        rl.question('Prénom(s) ? ', function (prenoms) {
            rl.question('Email ? ', function (email) {
                rl.question('Date de naissance ? (1989-11-11) ', function (dateDeNaissance) {
                    rl.question('Url de sa photo ? (https://...) ', function (photoUrl) {
                        rl.question('Identifiant de connexion ? (> 6 carac) ', function (identifiant) {
                            rl.question('Mot de passe de connexion ? ', function (motDePasse) {
                                rl.question('Rôle ? (USER) ', function (role) {
                                    var collegue = {
                                        nom: nom,
                                        prenoms: prenoms,
                                        email: email,
                                        dateDeNaissance: dateDeNaissance,
                                        photoUrl: photoUrl,
                                        identifiant: identifiant,
                                        motDePasse: motDePasse,
                                        role: role
                                    }
                                    serviceModule.postCreerCollegueReq(collegue,
                                        function (callbackFn) {
                                            console.log(callbackFn);
                                            afficherMenu(rl);
                                        },
                                        function (errorFn) {
                                            console.log(errorFn);
                                            afficherMenu(rl);
                                        })
                                })
                            })
                        })
                    })
                })
            })

        })
    })
}