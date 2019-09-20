// ***************************** REQUIRES ************************** //

import r from 'request-promise-native';
import Collegue from './Collegue';

const rp = r.defaults({
    jar: true
});

// ***************************** CLASS ************************** //

export default class Service {

    postAuthenticateReq(identifiant: string, mdp: string) {
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

    postCreerCollegueReq(collegue: Collegue) {
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
                        return Promise.reject(() => `${response.statusCode} : échec de création du collègue.`)
                    } else {
                        return response.body;
                    }
                }
            )
    }

    patchModifierEmailCollegueReq(matricule: string, email: string) {
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

    patchModifierPhotoUrlCollegueReq(matricule: string, photoUrl: string) {
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

    getToutesInfosColleguesAPartirNom(nom: string) {
        return rp(
            `https://jbmerand-collegues-api.herokuapp.com/collegues?nom=${nom}`,
            {
                json: true
            }
        )
            .then(tabMatricule => tabMatricule.map(
                (matricule: string) => rp(`https://jbmerand-collegues-api.herokuapp.com/collegues/${matricule}`, {
                        json: true
                    }
                )
            ))
            .then(tabDonnees$ => Promise.all(tabDonnees$));
    }
}