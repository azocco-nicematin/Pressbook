
$(document).ready(function () {
    //creation des tableau à l'ouverture de la page avec la date de hier
    createListeRapportPublihome(moment().subtract(1, 'days').format('YYYY-MM-DD'), moment().subtract(1, 'days').format('YYYY-MM-DD'));
    $('#reportrange').on('apply.daterangepicker', function (ev, picker) {
        //creation des tableau avec la date du date picker
        createListeRapportPublihome(picker.startDate.format('YYYY-MM-DD'), picker.endDate.format('YYYY-MM-DD'));
    });
});

const createListeRapportPublihome = (dateDebut, dateFin) => {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/publihome/liste/req",
        data: JSON.stringify({
            dateDebut : dateDebut,
            dateFin : dateFin
        }),
        dataType : 'json',
        success: (data) =>{
            console.log(data.data)
            let dataTable = $("#listePublihome").DataTable();
            dataTable.clear().draw();
            let liste = [];
            let publihome = data.data;
            for(let i of publihome){
                liste.push(i);
            }
            liste.forEach((value) =>{
                    dataTable.row.add([value.idPublihome, moment(value.date).format('YYYY-MM-DD'), value.titre, value.type, 
                    value.quantite_totale, moment(value.date_portage).format('YYYY-MM-DD'), 
                    value.poid , value.nombres_pages, value.conditionnement, value.commentaire, 
                    value.tournee ? "<a class=\"lienTitre\" href=\"/publihome/saisie/liste/id/"+value._id+"\" >Liste des tournées</a>" : "Tournées non renseigné", 
                    value.etat]);    
            });
            dataTable.draw();
           }
    });

};