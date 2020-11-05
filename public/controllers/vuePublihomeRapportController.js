$(document).ready(function () {
    //creation des tableau à l'ouverture de la page avec la date de hier
    createListeRapportPublihome(moment().format('YYYY-MM-DD'),moment().add(30, 'days').format('YYYY-MM-DD'));
    $('#reportrange').on('apply.daterangepicker', function (ev, picker) {
        let dataTable = $("#listePublihome").DataTable();
        dataTable.clear().draw();
        dataTable.destroy();
        //creation des tableau avec la date du date picker
        createListeRapportPublihome(picker.startDate.format('YYYY-MM-DD'), picker.endDate.format('YYYY-MM-DD'));
    });
});

const createListeRapportPublihome = (dateDebut, dateFin) => {
    $("#loadingRapportPublihome").html('<img src="/images/loading.gif" />');
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
            let liste = [];
            let publihome = data.data;
            for(let i of publihome){
                liste.push(i);
            }
            liste.forEach((value) =>{
                let tournees = value.tournee ? "<a class=\"lienTitre\" href=\"/publihome/liste/id/"+value._id+"\" >Liste des tournées</a>" : "Tournées non renseignées"
                $("#listePublihome").append("<tr><td>"+value.idPublihome+"</td><td>"+moment(value.date).format('YYYY-MM-DD')+"</td><td>"+value.titre+"</td><td>"+value.type+"</td><td>"+value.quantite_totale+"</td><td>"+moment(value.date_portage).format('YYYY-MM-DD')+"</td><td>"+value.poid+"</td><td>"+value.nombres_pages+"</td><td>"+value.conditionnement+"</td><td>"+value.commentaire+"</td><td>"+tournees+"</td><td>"+value.etat+"</td></tr>")
            });
            $("#listePublihome").addClass(" table table-striped table-bordered dt-responsive");
            $('#listePublihome').DataTable({
                dom: "Bfrtip",
                buttons: [
                  {
                    extend: "excel",
                    className: "btn-sm"
                  },
                  {
                    extend: "pdfHtml5",
                    className: "btn-sm"
                  },
                  {
                    extend: "print",
                    className: "btn-sm"
                  },
                ],
                responsive: true
              });
              $("#loadingRapportPublihome").html('');
           }
    });
   
};