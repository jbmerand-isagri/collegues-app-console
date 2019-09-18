// création d'une requête avec activation de suivi de Cookies.
var request = require('request').defaults({
    jar: true
});

exports.postAuthenticateReq = postAuthenticateReq;
exports.getMatriculeSelonNomReq = getMatriculeSelonNomReq;
exports.getInfosCollegueSelonMatricule = getInfosCollegueSelonMatricule;
exports.getToutesInfosColleguesAPartirNom = getToutesInfosColleguesAPartirNom;
exports.postCreerCollegueReq = postCreerCollegueReq;
exports.patchModifierEmailCollegueReq = patchModifierEmailCollegueReq;
exports.patchModifierPhotoUrlCollegueReq = patchModifierPhotoUrlCollegueReq;

function postAuthenticateReq(identifiant, mdp, callbackFn) {
    // console.log("passage dans postAuthenticateReq");
    // console.log(`identifiant = ${identifiant}, mdp = ${mdp}`);
    // console.log(`"identifiant": "${identifiant.toString()}"`);
    request('https://jbmerand-collegues-api.herokuapp.com/auth', {
            method: 'POST',
            json: true,
            body: {
                "identifiant": identifiant,
                "motDePasse": mdp
            }
        },
        function (err, res, body) {
            callbackFn(res.statusCode);
        }
    );
}

function postCreerCollegueReq(collegue, callbackFn, errorFn) {
    // console.log("passage dans postCreerCollegueReq");
    strCollegue = JSON.stringify(collegue);
    console.log("collegue à créer = " + strCollegue);
    // https://jbmerand-collegues-api.herokuapp.com/collegues
    request('https://jbmerand-collegues-api.herokuapp.com/collegues', {
            method: 'POST',
            json: true,
            body: {
                "nom": collegue.nom,
                "prenoms": collegue.prenoms,
                "email": collegue.email,
                "dateDeNaissance": collegue.dateDeNaissance,
                "photoUrl": collegue.photoUrl,
                "identifiant": collegue.identifiant,
                "motDePasse": collegue.motDePasse,
                "role": collegue.role
            }
        },
        function (err, res, body) {
            if (res.statusCode === 201) {
                callbackFn("OK : Collègue créé.\n");
            } else {
                errorFn("Echec de la création du collègue.\n" + err + (body ? body : ""));
            }
        },
    );
}

function patchModifierEmailCollegueReq(matricule, email, callbackFn, errorFn) {
    // https://jbmerand-collegues-api.herokuapp.com/collegues/{matricule}
    request('https://jbmerand-collegues-api.herokuapp.com/collegues/' + matricule, {
            method: 'PATCH',
            json: true,
            body: {
                "email": email
            }
        },
        function (err, res, body) {
            if (res.statusCode === 200) {
                callbackFn("OK : email modifié.")
            } else {
                errorFn("Erreur : email non modifié\n" + body)
            }
        }
    );
}

function patchModifierPhotoUrlCollegueReq(matricule, photoUrl, callbackFn, errorFn) {
    // https://jbmerand-collegues-api.herokuapp.com/collegues/{matricule}
    request('https://jbmerand-collegues-api.herokuapp.com/collegues/' + matricule, {
            method: 'PATCH',
            json: true,
            body: {
                "photoUrl": photoUrl
            }
        },
        function (err, res, body) {
            if (res.statusCode === 200) {
                callbackFn("OK : url de la photo modifié.")
            } else {
                errorFn("Erreur : url non modifié\n" + body)
            }
        }
    );
}

function getMatriculeSelonNomReq(nom, callbackFn, errorFn) {
    // console.log("passage dans getMatriculeSelonNomReq", nom);
    // https://jbmerand-collegues-api.herokuapp.com/collegues?nom=durand
    request("https://jbmerand-collegues-api.herokuapp.com/collegues?nom=" + nom, {
            method: 'GET',
            json: true
        },
        function (err, res, body) {
            if (res.statusCode === 200) {
                callbackFn(body);
            } else {
                errorFn("Erreur dans la récupération des matricules.");
            }
        }
    );
}

function getInfosCollegueSelonMatricule(matricule, callbackFn, errorFn) {
    // https://jbmerand-collegues-api.herokuapp.com/collegues/{matriculeDuCollegueIci}
    request("https://jbmerand-collegues-api.herokuapp.com/collegues/" + matricule, {
            method: 'GET',
            json: true,
        },
        function (err, res, body) {
            if (res.statusCode === 200) {
                callbackFn(body);
            } else {
                errorFn("Erreur dans la récupération des informations du collègue.");
            }
        }
    );
}

function getToutesInfosColleguesAPartirNom(nom, callbackFn, errorFn) {

    request("https://jbmerand-collegues-api.herokuapp.com/collegues?nom=" + nom, {
            method: 'GET',
            json: true
        },
        function (err, res, body) {
            if (res.statusCode === 200) {
                var nombreRequetesAFaire = Array.from(body).length;
                var compteurDeRequetes = 0;
                var donneesCollegues = [];
                body.forEach(function (matricule) {
                    compteurDeRequetes++;
                    request("https://jbmerand-collegues-api.herokuapp.com/collegues/" + matricule, {
                            method: 'GET',
                            json: true,
                        },
                        function (err, res, body) {
                            if (res.statusCode === 200) {
                                donneesCollegues.push(body);
                                if (compteurDeRequetes === nombreRequetesAFaire) {
                                    callbackFn(donneesCollegues);
                                }

                            } else {
                                errorFn("Erreur dans la récupération des informations du collègue.");
                            }
                        }
                    )
                })
            } else {
                errorFn("Erreur dans la récupération des matricules.");
            }
        }
    );
}