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

    rl.question('Quel est votre identifiant (u1) ?', function (identifiant) {
        rl.question('Quel est votre mot de passe (pass1) ?', function (mdp) {
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
    console.log("1. Rechercher un collègue par nom\n99.Sortir");
    rl.question('Quel est votre choix ? ', function (saisie) {
        console.log(`Vous avez saisi : ${saisie}`);
        if (saisie && saisie === '1') {
            rechercherCollegueParNom(rl);
        }
        if (saisie && saisie === '99') {
            rl.close();
            console.log('Aurevoir');
        }
    });
}

function rechercherCollegueParNom(rl) {
    rl.question('Quel est le nom du collègue que vous recherchez ?', function (nomCollegue) {
        serviceModule.getMatriculeSelonNomReq(
            nomCollegue,
            function (callbackFn) {
                console.log(callbackFn);
                callbackFn.forEach(function (matricule) {
                    serviceModule.getInfosCollegueSelonMatricule(
                        matricule,
                        function (callbackFn) {
                            console.log(callbackFn);
                        },
                        function (errorFn) {
                            console.log(errorFn);
                        })
                })
                // FIXME: régler problème ici de relance du menu.
                afficherMenu(rl);
            },
            function (errorFn) {
                console.log(errorFn);
            })
    })
}