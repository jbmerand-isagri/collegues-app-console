// création d'une requête avec activation de suivi de Cookies.
const request = require('request-promise-native').defaults({
    jar: true
});

/*exports.postAuthenticateReq = postAuthenticateReq;
exports.getToutesInfosColleguesAPartirNom = getToutesInfosColleguesAPartirNom;
exports.postCreerCollegueReq = postCreerCollegueReq;
exports.patchModifierEmailCollegueReq = patchModifierEmailCollegueReq;
exports.patchModifierPhotoUrlCollegueReq = patchModifierPhotoUrlCollegueReq;*/

module.exports = {
    postAuthenticateReq: 'postAuthenticateReq',
    getToutesInfosColleguesAPartirNom: 'getToutesInfosColleguesAPartirNom',
    postCreerCollegueReq: 'postCreerCollegueReq',
    patchModifierEmailCollegueReq: 'patchModifierEmailCollegueReq',
    patchModifierPhotoUrlCollegueReq: 'patchModifierPhotoUrlCollegueReq'
};

const postAuthenticateReq = (identifiant, mdp) => {
    request('https://jbmerand-collegues-api.herokuapp.com/auth', {
            method: 'POST',
            json: true,
            body: {
                "identifiant": identifiant,
                "motDePasse": mdp
            }
        }/*,
        function (err, res, body) {
            callbackFn(res.statusCode);
        }*/
    );
};

const postCreerCollegueReq = (collegue) => {
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
        }/*,
        function (err, res, body) {
            if (res.statusCode === 201) {
                callbackFn("OK : Collègue créé.\n");
            } else {
                errorFn("Echec de la création du collègue.\n" + err + (body ? body : ""));
            }
        },*/
    );
};

const patchModifierEmailCollegueReq = (matricule, email/*, callbackFn, errorFn*/) => {
    request('https://jbmerand-collegues-api.herokuapp.com/collegues/' + matricule, {
            method: 'PATCH',
            json: true,
            body: {
                "email": email
            }
        }/*,
        function (err, res, body) {
            if (res.statusCode === 200) {
                callbackFn("OK : email modifié.")
            } else {
                errorFn("Erreur : email non modifié\n" + body)
            }
        }*/
    );
};

const patchModifierPhotoUrlCollegueReq = (matricule, photoUrl/*, callbackFn, errorFn*/) => {
    request('https://jbmerand-collegues-api.herokuapp.com/collegues/' + matricule, {
            method: 'PATCH',
            json: true,
            body: {
                "photoUrl": photoUrl
            }
        }/*,
        function (err, res, body) {
            if (res.statusCode === 200) {
                callbackFn("OK : url de la photo modifié.")
            } else {
                errorFn("Erreur : url non modifié\n" + body)
            }
        }*/
    );
};

const getToutesInfosColleguesAPartirNom = (nom/*, callbackFn, errorFn*/) => {
    request("https://jbmerand-collegues-api.herokuapp.com/collegues?nom=" + nom, {
            method: 'GET',
            json: true
        }/*,
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
        }*/
    );
};