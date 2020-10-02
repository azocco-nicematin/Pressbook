$(document).ready(function () {

    remplirForm();

    //fonction en voie du du formuaire (POST ajax)
   
    $("#formulaire").submit(function (e) {

        e.preventDefault();

        let form = $(this);
        let url = form.attr('action');
        let type = form.attr('method');

        if(type === "PUT"){
            let id = $("#identifiantSupp").text();
            let data = form.serialize()  + "&idSupp=" + id;
            $.ajax({
                type: type,
                url: url,
                data: data,
                success: function (data) {
                  
                   // createTableauSaisie();
                    new PNotify({
                        title: 'supplément modifié',
                        text: 'Votre saisie à été prise en compte',
                        type: 'success',
                        styling: 'bootstrap3'
                    });
                    window.location.href = '../../';
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
    });

});


const remplirForm = () =>{

    let id = $("#identifiantSupp").text();
    console.log(id)
    $.ajax({
        type: "POST",
        contentType : "application/json",
        url: "/pressbook/saisie/dossier/req",
        data: JSON.stringify({
            "identifiant": id
        }),
        dataType : 'json',
        success: function (data) {
                console.log(data.data);
                if(data.data.date_dispo){
                    $("#dateDispo").val(moment(data.data.date_dispo).format('YYYY-MM-DD'))
                 } 
                $("#faconage").val(data.data.faconage);
                $("#miseSousFilm").val(data.data.mise_sous_film);
                $("#contactFinal").val(data.data.contact_final);
                $("#mentionLegale").val(data.data.mention_legale);
                $("#pageMontrer").val(data.data.pages_montrer);
                $("#format").val(data.data.format);
                $("#sourceDocs").val(data.data.source_docs);
                if(data.data.date_reception){
                $("#dateReception").val(moment(data.data.date_reception).format('YYYY-MM-DD'));
                }
                $("#saisirFolio").val("true");
                if(data.data.saisir_folio === true){
                    $("#saisirFolio").prop("checked", true);
                }
                $("#epreuveDefinitive").val("true");
                if(data.data.epreuve_definitive === true){
                    $("#epreuveDefinitive").prop("checked", true);
                }
                
                $("#blancheur").val(data.data.blancheur);
                $("#laize").val(data.data.laize);
                $("#typeProduction").val(data.data.type_production);
                $("#remarque").val(data.data.remarque);
                $("#toutQuadri").val("true");
                if(data.data.tout_quadri === true){
                    $("#toutQuadri").prop("checked", true);
                }
                $("#depassant14").val("true");
                if(data.data.depassant14 === true){
                    $("#depassant14").prop("checked", true);
                }
                $("#routage").val(data.data.routage);

                if(data.data.date_enlevement){
                $("#dateEnlevement").val(moment(data.data.date_enlevement).format('YYYY-MM-DD'));
                }
                $("#quantiteSousFilm").val(data.data.quantite_sous_film);
                $("#coiffe").val("true");
                if(data.data.coiffe === true){
                    $("#coiffe").prop("checked", true);
                }
                $("#nomTransporteur1").val(data.data.nom_transporteur_1);
                $("#nombreExemplaire1").val(data.data.nombre_exemplaire_1);
                $("#quantiteAdresse1").val(data.data.quantite_adresse_1);
                $("#nomTransporteur2").val(data.data.nom_transporteur_2);
                $("#nombreExemplaire2").val(data.data.nombre_exemplaire_2);
                $("#quantiteAdresse2").val(data.data.quantite_adresse_2);
                $("#nomTransporteur3").val(data.data.nom_transporteur_3);
                $("#nombreExemplaire3").val(data.data.nombre_exemplaire_3);
                $("#quantiteAdresse3").val(data.data.quantite_adresse_3);
                $("#nomTransporteur4").val(data.data.nom_transporteur_4);
                $("#nombreExemplaire4").val(data.data.nombre_exemplaire_4);
                $("#quantiteAdresse4").val(data.data.quantite_adresse_4);
                $("#nomTransporteur5").val(data.data.nom_transporteur_5);
                $("#nombreExemplaire5").val(data.data.nombre_exemplaire_5);
                $("#quantiteAdresse5").val(data.data.quantite_adresse_5);

                $(".modifierPressbook").attr("id", data.data._id);
                $(".supprimerPressbook").attr("id", data.data._id);

                $("#titreSupp").text(data.data.theme + " du " + data.data.parution);
        }
    });
};
