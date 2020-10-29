

$(document).ready(function () {

    createTableauSaisiePublihome();
    createFormTournees();
    createFormTourneesTotales();

    $("#formulairePublihome").submit(function (e) {

        e.preventDefault();

        let form = $(this);
        let url = form.attr('action');
        let type = form.attr('method');

        if (type === "POST") {
            $.ajax({
                type: type,
                url: url,
                data: form.serialize(),
                success: function (data) {

                    createTableauSaisiePublihome();

                    new PNotify({
                        title: 'Publihome ajouté',
                        text: 'Votre saisie à été prise en compte',
                        type: 'success',
                        styling: 'bootstrap3'
                    });

                },
                error: function (data) {
                    new PNotify({
                        title: 'Erreur serveur',
                        text: 'L\'incident n\'as pas pu etre enregistré',
                        type: 'error',
                        styling: 'bootstrap3'
                    });
                }
            });
        }
        else if (type === "PUT") {
            let id = $(".modifierPublihome").attr('id');
            let data = form.serialize() + "&idSupp=" + id;
            $.ajax({
                type: type,
                url: url,
                data: data,
                success: function (data) {

                    createTableauSaisiePublihome();
                    createFormTournees();
                    $('#blocTournee').attr("style", "display:none");

                    new PNotify({
                        title: 'Publihome modifié',
                        text: 'Votre saisie à été prise en compte',
                        type: 'success',
                        styling: 'bootstrap3'
                    });

                },
                error: function (data) {
                    new PNotify({
                        title: 'Erreur',
                        text: 'Vous n\'avait pas selecioné de publihome',
                        type: 'error',
                        styling: 'bootstrap3'
                    });
                }
            });
        }
        else if (type === "DELETE") {
            let id = $(".modifierPublihome").attr('id');
            $.ajax({
                type: type,
                contentType: "application/json",
                url: url,
                data: JSON.stringify({
                    "idSupp": id
                }),
                dataType: 'json',
                success: function (data) {

                    createTableauSaisiePublihome();
                    
                    createFormTournees();
                    $('#blocTournee').attr("style", "display:none");

                    new PNotify({
                        title: 'Publihome supprimé',
                        text: 'Votre saisie à été prise en compte',
                        type: 'success',
                        styling: 'bootstrap3'
                    });

                },
                error: function (data) {
                    new PNotify({
                        title: 'Erreur',
                        text: 'Vous n\'avait pas selecioné de publihome',
                        type: 'error',
                        styling: 'bootstrap3'
                    });
                }
            });
        }

    });


    $("#formulaireTournee").submit(function (e) {

        e.preventDefault();

        let form = $(this);
        let url = form.attr('action');
        let type = form.attr('method');
        if (type === "PUT") {
            let id = $(".modifierTournee").attr('id');
            let data = form.serialize() + "&idSupp=" + id;
            $.ajax({
                type: type,
                url: url,
                data: data,
                success: function (data) {
                    $('#blocTournee').attr("style", "display:none");
                    createTableauSaisiePublihome();
                    new PNotify({
                        title: 'Publihome modifié',
                        text: 'Votre saisie à été prise en compte',
                        type: 'success',
                        styling: 'bootstrap3'
                    });
                },
                error: function (data) {
                    new PNotify({
                        title: 'Erreur serveur',
                        text: '',
                        type: 'error',
                        styling: 'bootstrap3'
                    });
                }
            });
        }


    });

});


const createTableauSaisiePublihome = () => {
    $("#tablePublihome").empty();
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "/publihome/saisie/req",
        dataType: 'json',
        success: function (data) {
            $.each(data.data, (key, publihome) => {
                const table = document.getElementById("tablePublihome");
                const row = table.insertRow(-1);
                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                const cell3 = row.insertCell(2);
                const cell4 = row.insertCell(3);
                const cell5 = row.insertCell(4);
                const cell6 = row.insertCell(5);
                const cell7 = row.insertCell(6);
                const cell8 = row.insertCell(7);
                const cell9 = row.insertCell(8);
                const cell10 = row.insertCell(9);
                const cell11 = row.insertCell(10);
                const cell12 = row.insertCell(11);


                row.id = publihome._id;

                if (publihome.idPublihome) {
                    cell1.innerHTML = publihome.idPublihome;
                }

                if (publihome.date) {
                    cell2.innerHTML = moment(publihome.date).format('YYYY-MM-DD HH:mm')+" par "+publihome.login;
                }

                if (publihome.titre) {
                    cell3.innerHTML = "<a class=\"lienTitre\" href=\"#\" onclick=\"remplirFormPublihome(this); afficheTournee(this); \">" + publihome.titre + "</a>";
                    cell3.style.textAlign = "left";
                }

                if (publihome.type) {
                    cell4.innerHTML = publihome.type;

                }

                if (publihome.quantite_totale) {
                    cell5.innerHTML = publihome.quantite_totale;

                }

                if (publihome.date_portage) {
                    cell6.innerHTML = moment(publihome.date_portage).format('YYYY-MM-DD');
                    cell6.style.whiteSpace = "nowrap";
                }

                if (publihome.poid) {
                    cell7.innerHTML = publihome.poid;

                }

                if (publihome.nombres_pages) {
                    cell8.innerHTML = publihome.nombres_pages;

                }

                if (publihome.conditionnement) {
                    cell9.innerHTML = publihome.conditionnement;
                }


                if (publihome.commentaire) {
                    cell10.innerHTML = publihome.commentaire;
                }

                if (publihome.tournee) {
                    cell11.innerHTML = "<a class=\"lienTitre\" href=\"/publihome/liste/id/"+publihome._id+"\" >Liste des tournées</a>";
                }
                else{
                    cell11.innerHTML = "Tournée non renseignées";
                }


                if (publihome.etat) {
                    cell12.innerHTML = publihome.etat;
                    if (publihome.etat === "Annulé") {
                        row.style.backgroundColor = "#737373";
                    }
                }
            });
            $(".modifierPublihome").attr("id", "");
            $(".supprimerPublihome").attr("id", "");
            $("#formulairePublihome")[0].reset();
        }
    });

};


const remplirFormPublihome = (o) => {

    let id = $(o).closest("tr")[0].id;

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/publihome/saisie/req/id",
        data: JSON.stringify({
            "identifiant": id
        }),
        dataType: 'json',
        success: function (data) {
            $("#titre").val(data.data.titre);
            $("#type").val(data.data.type);
            $("#quantiteTotale").val(data.data.quantite_totale);
            $("#datePortage").val(moment(data.data.date_portage).format('YYYY-MM-DD'));
            $("#poid").val(data.data.poid);
            $("#nombrePage").val(data.data.nombres_pages);
            $("#conditionnement").val(data.data.conditionnement);
            $("#commentaire").val(data.data.commentaire);
            $("#etat").val(data.data.etat);
            $(".modifierPublihome").attr("id", data.data._id);
            $(".supprimerPublihome").attr("id", data.data._id);
        }
    });
};



const createFormTournees = () => {
    $('#tableListeTournees').empty();
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "/data/get-edition",
        dataType: 'json',
        success: function (data) {

            data.data.forEach(element => {

                let nomFormat = element.nom.replace(/ /g, "");
                $('#tableListeTournees').append("<tr><td></td> <td style=\"padding:0px 10px;\"> <input  onclick=\"checkAll(this)\" type=\"checkbox\" name=" + nomFormat + " id=" + element._id + " value=" + nomFormat + "></td><td style=text-align:left; > <a  id=" + element._id + " onclick=\"getTourneesEditions(this);\">" + element.nom + "</a></td></tr>");

            });
        }
    });
}



const checkAll = (o) => {
    let edition = $(o).val();
    let editionFormat = edition.replace(/ /g, "");
    if ($(o).is(':checked')) {
        $('.' + editionFormat).prop('checked', true);

    }
    else {
        $('.' + editionFormat).prop('checked', false);
    }
}


const createFormTourneesTotales = () => {
    $('#listeTournees').empty();
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "/data/get-edition",
        dataType: 'json',
        success: function (data) {
            data.data.forEach(element => {
                let editionFormat = element.nom.replace(/ /g, "");
                $('#listeTournees').append("<table  class='table table-striped table-bordered bulk_action tableTourneeParEdition' id=" + editionFormat + " style=\"display : none\"><thead ><th colspan=\"2\"> "+element.nom+"</th></thead> </table>");

                $.ajax({
                    type: "POST",
                    contentType: "application/json",
                    url: "/configuration/tournees/req/data",
                    data: JSON.stringify({
                        "edition": element.nom
                    }),
                    dataType: 'json',
                    success: function (data) {
                        data.data.forEach(element => {
                            let editionFormat = element.edition.replace(/ /g, "");
                            $('#' + editionFormat).append("<tr><td style=\"padding:0px 10px;\">  <input type=\"checkbox\" onclick=\"verifyNotAll(this)\" class=" + editionFormat + " name=\"tournee\" id=" + element._id + " value=" + element._id + "></td> <td style=text-align:left;> <label >" + element.nom_tournee + "</label></td></tr>");
                        });
                    }
                });
            });
        }
    });
}

const verifyNotAll = (o) => {
    let edition = $(o).attr('class');
    if ($(o).is(':checked')) {
    }
    else {
        $('input[name =' + edition + ']').prop('checked', false);
    }
}

const getTourneesEditions = (o) => {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "/data/get-edition",
        dataType: 'json',
        success: function (data) {
            data.data.forEach(element => {
                let editionFormat = element.nom.replace(/ /g, "");
                $('#' + editionFormat).attr("style", "display:none");
            });
            const edition = $(o).html();
            let editionFormat = edition.replace(/ /g, "");
            $('#' + editionFormat).attr("style", "display:contents");
        }
    });
}


const afficheTournee = (o) => {
    createFormTournees();
    let id = $(o).closest("tr")[0].id;
    $('#blocTournee').attr("style", "display:inline");
    $('#titreTournee').html("Tournée - " + $(o).html());
    $('.modifierTournee').attr("id", $(o).closest("tr")[0].id);

    $('#listeTournees').empty();
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "/data/get-edition",
        dataType: 'json',
        success: function (data) {
            data.data.forEach(element => {
                let editionFormat = element.nom.replace(/ /g, "");
                
                $('#listeTournees').append("<table  class='table table-striped table-bordered bulk_action tableTourneeParEdition' id=" + editionFormat + " style=\"display : none\"><thead ><th colspan=\"2\">"+element.nom+"</th></thead> </table>");

                $.ajax({
                    type: "POST",
                    contentType: "application/json",
                    url: "/configuration/tournees/req/data",
                    data: JSON.stringify({
                        "edition": element.nom
                    }),
                    dataType: 'json',
                    success: function (data) {
                        data.data.forEach(element => {
                            let editionFormat = element.edition.replace(/ /g, "");
                            $('#' + editionFormat).append("<tr><td style=\"padding:0px 10px;\"> <input type=\"checkbox\" onclick=\"verifyNotAll(this)\" class=" + editionFormat + " name=\"tournee\" id=" + element._id + " value=" + element._id + "></td> <td style=text-align:left;>  <label> " + element.nom_tournee + "</label></td></tr>");

                        });
                    }
                });
            });
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "/publihome/saisie/req/id",
                data: JSON.stringify({
                    "identifiant": id
                }),
                dataType: 'json',
                success: function (data) {
                    data.data.id_tournee.forEach(element => {
                        $("#" + element).prop("checked", true);
                        uncheckEdition($("#" + element).attr('class'));
                    });
                }
            });
        }
    });

}



//fonction qui uncheck l'edition si pas toutes les tournees sont selectioné
const uncheckEdition = (o) => {
    let checkNumber = $('.' + o + ':checked').length
    if (checkNumber == $('.' + o).length) {
        $('input[name =' + o + ']').prop('checked', true);
    }

    // $( "<p>Test</p>" ).insertBefore($('input[name ='+o+']' ).parent()[0]);
    $($($('input[name =' + o + ']').closest('tr')[0]).children()[0]).text("(" + checkNumber + ")")


}
