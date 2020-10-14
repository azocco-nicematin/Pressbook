$(document).ready(function() {
    getParamEmail();

});

//fonction de recuperation des droits email et insertion dans le tableau
const getParamEmail = () => {
    $("#gestionMail").empty();
    $.ajax({
        type: "GET",
        contentType : "application/json",
        url : "/configuration/email/req",
        dataType : 'json',
        success : (data) =>{
            $.each(data.data, (key, email) => {
                const table = document.getElementById("gestionMail");
                const row = table.insertRow(-1);
                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                const cell3 = row.insertCell(2);
                const cell4 = row.insertCell(3);
                const cell5 = row.insertCell(4);


                cell1.style.textAlign = "center"; // edition
                cell1.style.verticalAlign = "middle";
                cell1.style.maxWidth = "70px";

                cell2.style.textAlign = "center"; // edition
                cell2.style.verticalAlign = "middle";
                cell2.style.maxWidth = "70px";

                cell3.style.textAlign = "center"; // edition
                cell3.style.verticalAlign = "middle";


                cell1.innerHTML = email.nom;
                cell2.innerHTML = email.prenom;
                cell3.innerHTML = email.email;



                cell4.innerHTML =
                    "<div class='border-cells' style=\"text-align: center; vertical-align: middle\">" +
                    "<span class=\"table-modify\">" +
                    "<button type=\"button\"  onclick = \"modifRow(this)\" class=\"btn btn-primary btn-rounded btn-sm my-0\">Modifier" +
                    "</button>" +
                    "<button type=\"button\" style=\"display: none\" onclick = \"validateRow(this)\" class=\"btn btn-success btn-rounded btn-sm my-0\">Valider" +
                    "</button>"+
                "</span>" +
                "</div>\n";

                cell5.innerHTML =
                    "<div class='border-cells' style=\"text-align: center; vertical-align: middle\">" +
                    "<span class=\"table-remove\">" +
                    "<button type=\"button\" id="+email._id+" onclick = \"deleteRowDB(this)\" class=\"btn btn-danger btn-rounded btn-sm my-0\">Supprimer" +
                    "</button>" +
                    "</span>" +
                    "</div>\n";


            });

        }
    });
};

//ajout d'une ligne (IHM)
const addLine = () => {
    const table = document.getElementById("gestionMail");
    const row = table.insertRow(-1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);


    cell1.style.textAlign = "center"; // edition
    cell1.style.verticalAlign = "middle";
    cell1.contentEditable = "true";
    cell1.style.minWidth = "120px";

    cell2.style.textAlign = "center"; // edition
    cell2.contentEditable = "true";
    cell2.style.verticalAlign = "middle";
    cell2.style.minWidth = "120px";

    cell3.style.textAlign = "center"; // edition
    cell3.style.verticalAlign = "middle";
    cell3.contentEditable = "true";
    cell3.style.minWidth = "200px";

    row.style.boxShadow="0px 0px 8px 0px #51cbee";



    cell4.innerHTML =
        "<div class='border-cells' style=\"text-align: center; vertical-align: middle\">" +
        "<span class=\"table-modify\">" +
        "<button type=\"button\"  style=\"display: none\" onclick = \"modifRow(this)\" class=\"btn btn-primary btn-rounded btn-sm my-0\">Modifier" +
        "</button>" +
        "<button type=\"button\" onclick = \"validateRow(this)\" class=\"btn btn-success btn-rounded btn-sm my-0\">Valider" +
        "</button>"+
        "</span>" +
        "</div>\n";

    cell5.innerHTML =
        "<div class='border-cells' style=\"text-align: center; vertical-align: middle\">" +
        "<span class=\"table-remove\">" +
        "<button type=\"button\" onclick = \"deleteRow(this)\" class=\"btn btn-danger btn-rounded btn-sm my-0\">Supprimer" +
        "</button>" +
        "</span>" +
        "</div>\n";
};


//suppression d'une ligne (IHM)
const deleteRow = (o)=> {
    if (typeof(o) == "object") {
        $(o).closest("tr").remove();
    } else {
        return false;
    }
};

//suppression d'une ligne BD
const deleteRowDB = async (o)=> {
    if (typeof(o) == "object") {
        let identifiant = o.id;
        $.ajax({
            type: "DELETE",
            contentType : "application/json",
            url : "/configuration/email/req",
            data : JSON.stringify({
                "id" : identifiant
            }),
            dataType : 'json',
            success : (data) =>{
                $(o).closest("tr").remove();
                new PNotify({
                    title: 'Droit Email supprimé',
                    text: '',
                    type: 'success',
                    styling: 'bootstrap3'
                });
            }
        });

    } else {
        return false;
    }
};

// modification ligne IHM
const modifRow = (o)=> {
    if (typeof(o) == "object") {
        $(o).closest("tr")[0].cells[0].contentEditable = "true";
        $(o).closest("tr")[0].cells[1].contentEditable = "true";
        $(o).closest("tr")[0].cells[2].contentEditable = "true";
        $(o).closest("tr")[0].style.boxShadow="0px 0px 8px 0px  #51cbee";
        $(o).closest("span")[0].childNodes[1].style.display = "inline";
        $(o)[0].style.display = "none";

    } else {
        return false;
    }
};

//fonction de validation de ligne BD (update ou insert)
const validateRow = (o)=> {
    if (typeof(o) == "object") {
        if($(o).closest("tr")[0].cells[2].textContent !== '') {
            if(validationMail($(o).closest("tr")[0].cells[2].textContent)) {

                $(o).closest("tr")[0].cells[0].contentEditable = "false";
                $(o).closest("tr")[0].cells[1].contentEditable = "false";
                $(o).closest("tr")[0].cells[2].contentEditable = "false";
                $(o).closest("tr")[0].style.boxShadow = "0px 0px #fff";
                $(o).closest("tr")[0].style.border = "1px solid #ddd";$(o).closest("span")[0].childNodes[0].style.display = "inline";
                $(o)[0].style.display = "none";
                $(o).closest("tr")[0].cells[2].style.boxShadow = "0px 0px #fff";

                let $supprID = $(o).closest("tr")[0].cells[4].childNodes[0].childNodes[0].childNodes[0].id;
                let nom = $(o).closest("tr")[0].cells[0].textContent;
                let prenom = $(o).closest("tr")[0].cells[1].textContent;
                let email = $(o).closest("tr")[0].cells[2].textContent;
    
                //si le bouton a un id (update)
                if($supprID) {
                    $.ajax({
                        type: "PUT",
                        contentType: "application/json",
                        url: "/configuration/email/req",
                        data: JSON.stringify({
                            "id": $supprID,
                            "nom": nom,
                            "prenom": prenom,
                            "email": email
                        }),
                        dataType: 'json',
                        success: (data) =>{
                            new PNotify({
                                title: 'Votre modification à été prise en compte',
                                text: '',
                                type: 'success',
                                styling: 'bootstrap3'
                            });
                        },
                        error: (data) =>{
                            new PNotify({
                                title: 'Erreur serveur',
                                text: '',
                                type: 'error',
                                styling: 'bootstrap3'
                            });
                        }
                    });
                }
                //si le bouton n'a pas un id (insert)
                else if (!$supprID){
                    $.ajax({
                        type: "POST",
                        contentType : "application/json",
                        url : "/configuration/email/req",
                        data : JSON.stringify({
                            "nom" : nom,
                            "prenom": prenom,
                            "email" : email
                        }),
                        dataType : 'json',
                        success : (data) =>{
                            getParamEmail();
                            new PNotify({
                                title: 'Votre saisie à été prise en compte',
                                text: '',
                                type: 'success',
                                styling: 'bootstrap3'
                            });
                        },
                        error : (data) =>{
                            new PNotify({
                                title: 'Erreur serveur',
                                text: '',
                                type: 'error',
                                styling: 'bootstrap3'
                            });
                        }
                    });

                }
            }
            else{
                new PNotify({
                    title: 'Format mail invalide',
                    text: 'Veuillez remplir un mail correct',
                    type: 'error',
                    styling: 'bootstrap3'
                });
                $(o).closest("tr")[0].cells[2].style.boxShadow=" inset 0px 0px 5px 0px #ff0000";
            }
        }
        else{
            new PNotify({
                title: 'Champs Invalide*',
                text: 'Veuillez remplir tout les champs obbligatoire',
                type: 'error',
                styling: 'bootstrap3'
            });
            $(o).closest("tr")[0].cells[2].style.boxShadow=" inset 0px 0px 5px 0px #ff0000";
        }


    } else {
        return false;
    }
};

//validation format mail
function validationMail(email) {
    var expressionReguliere = /^[a-z0-9.-]{2,}@+[a-z0-9-]{2,}[.]+[a-z0-9-]{2,}$/i;
    if (expressionReguliere.test(email))
    {
        return true;
    }
    else {
        return false;
    }
}