$(document).ready(function () {
    getSuppl();
    getEdition();
    getProduit();
    getFabr();
    getPapier();
    getOrigine();
    getSource();

    createTableauSaisie();
    //fonction en voie du du formuaire (POST ajax)
   
    $("#formulaire").submit(function (e) {

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
                    $("#formulaire")[0].reset();
                   
                    createTableauSaisie();
                       
                    new PNotify({
                        title: 'Supplément ajouté',
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
            let id = $(".modifierPressbook").attr('id');
            let data = form.serialize()  + "&idSupp=" + id;
            $.ajax({
                type: type,
                url: url,
                data: data,
                success: function (data) {
                    $("#formulaire")[0].reset();
                   
                    createTableauSaisie();
                       
                    new PNotify({
                        title: 'supplément modifié',
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
            let id = $(".modifierPressbook").attr('id');
            $.ajax({
                type: type,
                contentType : "application/json",
                url: url,
                data : JSON.stringify({
                    "idSupp" : id
                }),
                dataType : 'json',
                success: function (data) {
                    $("#formulaire")[0].reset();
                   
                    createTableauSaisie();
                       
                    new PNotify({
                        title: 'supplément supprimé',
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

//recupere les services de la BD
const getSuppl = () => {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "/data/suppl",
        dataType: 'json',
        success: (data) => {
            $.each(data.data, function (key, suppl) {
                $("#suppl").append("<option>" + suppl.nom + "</option>");
            });
        }
    });
};

const getEdition = () => {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "/data/edition",
        dataType: 'json',
        success: (data) => {
            $.each(data.data, function (key, edition) {
                $("#edition").append("<option>" + edition.nom + "</option>");
            });
        }
    });
};

const getProduit = () => {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "/data/produit",
        dataType: 'json',
        success: (data) => {
            $.each(data.data, function (key, produit) {
                $("#produit").append("<option>" + produit.nom + "</option>");
            });
        }
    });
};

const getFabr = () => {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "/data/fabr",
        dataType: 'json',
        success: (data) => {
            $.each(data.data, function (key, fabr) {
                $("#fabr").append("<option>" + fabr.nom + "</option>");
            });
        }
    });
};

const getPapier = () => {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "/data/papier",
        dataType: 'json',
        success: (data) => {
            $.each(data.data, function (key, papier) {
                $("#papier").append("<option>" + papier.nom + "</option>");
            });
        }
    });
};

const getOrigine = () => {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "/data/origine",
        dataType: 'json',
        success: (data) => {
            $.each(data.data, function (key, origine) {
                $("#origine").append("<option>" + origine.nom + "</option>");
            });
        }
    });
};

const getSource = () => {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "/data/source",
        dataType: 'json',
        success: (data) => {
            $.each(data.data, function (key, source) {
                $("#source").append("<option>" + source.nom + "</option>");
            });
        }
    });
};


//Fonction de creation du tableau de maintenance
const createTableauSaisie = () => {
    $("#tablePressbook").empty();
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "/pressbook/saisie/req/data",
        dataType: 'json',
        success: function (data) {
            $.each(data.data, (key, pressbook) => {
                const table = document.getElementById("tablePressbook");
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
                const cell13 = row.insertCell(12);
                const cell14 = row.insertCell(13);
                const cell15 = row.insertCell(14);
                const cell16 = row.insertCell(15);
                const cell17 = row.insertCell(16);
                const cell18 = row.insertCell(17);
                const cell19 = row.insertCell(18);
                const cell20 = row.insertCell(19);
                const cell21 = row.insertCell(20);
               

              /*  cell1.className = "identifiant";
                cell1.id = incident._id;
                cell4.className = "case-equipement";
                cell7.className = "rapport";
                cell7.contentEditable = "false";
                cell9.className = "IdentifiantRef";*/

                row.id = pressbook._id;

                if (pressbook.id) {
                    cell1.innerHTML = pressbook.id;
                }

                if (pressbook.date) {
                    cell2.innerHTML = moment(pressbook.date).format('YYYY-MM-DD HH:mm');
                }

                if (pressbook.theme) {
                    cell3.innerHTML = "<a class=\"lienTheme\" href=\"#\" onclick=\"remplirForm(this)\">"+ pressbook.theme+"</a>";
                    cell3.style.textAlign = "left";
                }

                if (pressbook.suppl) {
                    cell4.innerHTML = pressbook.suppl;
                    switch(pressbook.suppl){
                        case "TAP":
                        case "Autres produit":
                            cell4.style.backgroundColor = "#ffe6ff";
                            break;
                        case "Memostick":
                            cell4.style.backgroundColor = "#ffffb3";
                            break;
                        case "Supp":
                            cell4.style.backgroundColor = "#ccffcc";
                            break;
                    }
                    
                }

                if (pressbook.parution) {
                    cell5.innerHTML = moment(pressbook.parution).format('YYYY-MM-DD');
                    cell5.style.whiteSpace = "nowrap";
                }
                
                if (pressbook.date_prod) {
                    cell6.innerHTML = moment(pressbook.date_prod).format('YYYY-MM-DD');
                    cell6.style.whiteSpace = "nowrap";
                }

                if (pressbook.date_portage) {
                    cell7.innerHTML = moment(pressbook.date_portage).format('YYYY-MM-DD');
                    cell7.style.whiteSpace = "nowrap";
                }

                if (pressbook.edition) {
                    cell8.innerHTML = pressbook.edition;
                }

                
                if (pressbook.produit) {
                    cell9.innerHTML = pressbook.produit;
                }
                

                
                if (pressbook.fabr) {
                    cell10.innerHTML = pressbook.fabr;
                }


                if (pressbook.papier) {
                    cell11.innerHTML = pressbook.papier;
                }

                if (pressbook.pagination) {
                    cell12.innerHTML = pressbook.pagination;
                }
                
                if (pressbook.nb_quadri) {
                    cell13.innerHTML = pressbook.nb_quadri;
                }

                if (pressbook.tap) {
                    cell14.innerHTML = pressbook.tap;
                }
                if (pressbook.journaux) {
                    cell15.innerHTML = pressbook.journaux;
                }
                if (pressbook.tirage_mini) {
                    cell16.innerHTML = pressbook.tirage_mini;
                }
                if (pressbook.origine) {
                    cell17.innerHTML = pressbook.origine;
                }
                if (pressbook.source) {
                    cell18.innerHTML = pressbook.source;
                }
                if (pressbook.observation) {
                    cell19.innerHTML = pressbook.observation;
                }
                if (pressbook.option_reser) {
                    cell20.innerHTML = pressbook.option_reser;
                    if(pressbook.option_reser === "annulé"){
                        row.style.backgroundColor = "#737373";
                    }
                }

                if (pressbook.dossier_fabrication === true) {
                    cell21.innerHTML = "<a id="+pressbook._id+" onclick=\"pdf(this)\" ><i class=\"fa fa-file-pdf-o fa-2x\"></i></a> <a href=\"/pressbook/saisie/dossier/id/"+pressbook._id+"\"><i class=\"fa fa-pencil fa-2x\"></i></a>";
                }
                else if (pressbook.dossier_fabrication === false) {
                    cell21.innerHTML ="<a href=\"/pressbook/saisie/dossier/id/"+pressbook._id+"\"><i class=\"fa fa-pencil fa-2x\"></i></a>";
                }


            });

        }

       
    });

};

const pdf = (o)=>{
    let id = $(o)[0].id;

    $.ajax({
        type: "POST",
        contentType : "application/json",
        url: "/pressbook/saisie/pdf",
        data: JSON.stringify({
            "identifiant": id
        }),
        dataType : 'json',
        success: function (data) {
          /*  new PNotify({
                title: 'Pdf créé',
                text: 'Votre saisie a été prise en compte',
                type: 'success',
                stylings: 'bootstrap3'
            });*/
            window.location.href = '/download';
        }
    });
}


const remplirForm = (o) =>{

    let id = $(o).closest("tr")[0].id;

    $.ajax({
        type: "POST",
        contentType : "application/json",
        url: "/pressbook/saisie/req/id",
        data: JSON.stringify({
            "identifiant": id
        }),
        dataType : 'json',
        success: function (data) {
                $("#suppl").val(data.data.suppl);
                $("#parution").val(moment(data.data.parution).format('YYYY-MM-DD'));
                $("#dateProd").val(moment(data.data.date_prod).format('YYYY-MM-DD'));
                $("#datePortage").val(moment(data.data.date_portage).format('YYYY-MM-DD'));
                $("#theme").val(data.data.theme);
                $("#edition").val(data.data.edition);
                $("#produit").val(data.data.produit);
                $("#fabr").val(data.data.fabr);
                $("#papier").val(data.data.papier);
                $("#pagination").val(data.data.pagination);
                $("#nbQuadri").val(data.data.nb_quadri);
                $("#tap").val(data.data.tap);
                $("#journaux").val(data.data.journaux);
                $("#tirageMin").val(data.data.tirage_mini);
                $("#origine").val(data.data.origine);
                $("#source").val(data.data.source);
                $("#observation").val(data.data.observation);
                $("#optionReser").val(data.data.option_reser);
                $(".modifierPressbook").attr("id", data.data._id);
                $(".supprimerPressbook").attr("id", data.data._id);
        }
    });
};



