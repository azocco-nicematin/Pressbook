
$(document).ready(function () {

    createTableauSaisiePublihome();
   
    $("#formulairePublihome").submit(function (e) {

        e.preventDefault();

        let form = $(this);
        let url = form.attr('action');
        let type = form.attr('method');

        if(type === "POST"){
            $.ajax({
                type: type,
                url: url,
                data: form.serialize(),
                success: function (data) {
                    $("#formulairePublihome")[0].reset();
                   
                    createTableauSaisiePublihome ();
                       
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
        else if(type === "PUT"){
            let id = $(".modifierPublihome").attr('id');
            let data = form.serialize()  + "&idSupp=" + id;
            $.ajax({
                type: type,
                url: url,
                data: data,
                success: function (data) {
                    $("#formulairePublihome")[0].reset();
                   
                    createTableauSaisie();
                       
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
                        text: 'L\'incident n\'as pas pu etre enregistré',
                        type: 'error',
                        styling: 'bootstrap3'
                    });
                }
            });
        }
        else if(type === "DELETE"){
            let id = $(".modifierPublihome").attr('id');
            $.ajax({
                type: type,
                contentType : "application/json",
                url: url,
                data : JSON.stringify({
                    "idSupp" : id
                }),
                dataType : 'json',
                success: function (data) {
                    $("#formulairePublihome")[0].reset();
                   
                  //  createTableauSaisie();
                       
                    new PNotify({
                        title: 'Publihome supprimé',
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


                row.id = publihome._id;

                if (publihome.idPublihome) {
                    cell1.innerHTML = publihome.idPublihome;
                }

                if (publihome.date) {
                    cell2.innerHTML = moment(publihome.date).format('YYYY-MM-DD HH:mm');
                }

                if (publihome.titre) {
                    cell3.innerHTML = "<a class=\"lienTitre\" href=\"#\" onclick=\"remplirFormPublihome(this)\">"+ publihome.titre+"</a>";
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
                if (publihome.etat) {
                    cell11.innerHTML = publihome.etat;
                    if(publihome.etat === "annulé"){
                        row.style.backgroundColor = "#737373";
                    }
                }
            });
        }
    });

};