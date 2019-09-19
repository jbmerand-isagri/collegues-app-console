// ***************************** REQUIRES ************************** //

// création d'une requête avec activation de suivi de Cookies.
const rp = require('request-promise-native').defaults({
    jar: true
});

// ***************************** CLASS ************************** //

class Service {

    postAuthenticateReq(identifiant, mdp) {
        return rp('https://jbmerand-collegues-api.herokuapp.com/auth',
            {
                method: 'POST',
                json: true,
                body: {
                    "identifiant": identifiant,
                    "motDePasse": mdp
                },
                resolveWithFullResponse: true
            }
        )
    }

    postCreerCollegueReq(collegue) {
        let strCollegue = JSON.stringify(collegue);
        console.log("collegue à créer = " + strCollegue);
        return rp('https://jbmerand-collegues-api.herokuapp.com/collegues',
            {
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
                },
                resolveWithFullResponse: true
            }
        )
            .then(response => {
                if (response.statusCode !== 201) {
                    return Promise.reject(statusCode => `${response.statusCode} : échec de création du collègue.`)
                } else {
                    return response.body;
                }
            }
        )
    }

    patchModifierEmailCollegueReq(matricule, email) {
        return rp(`https://jbmerand-collegues-api.herokuapp.com/collegues/${matricule}`,
            {
                method: 'PATCH',
                json: true,
                body: {
                    "email": email
                }
            }
        )
    }

    patchModifierPhotoUrlCollegueReq(matricule, photoUrl) {
        return rp(`https://jbmerand-collegues-api.herokuapp.com/collegues/${matricule}`,
            {
                method: 'PATCH',
                json: true,
                body: {
                    "photoUrl": photoUrl
                }
            }
        )
    }

    getToutesInfosColleguesAPartirNom(nom) {
        return rp(
            `https://jbmerand-collegues-api.herokuapp.com/collegues?nom=${nom}`,
            {
                json: true
            }
        )
            .then(tabMatricule => tabMatricule.map(
                matricule => rp(`https://jbmerand-collegues-api.herokuapp.com/collegues/${matricule}`, {
                        json: true
                    }
                )
            ))
            .then(tabDonnees$ => Promise.all(tabDonnees$));
    }
}

// ***************************** EXPORTS ************************** //

exports.Service = Service;