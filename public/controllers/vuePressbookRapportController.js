$(document).ready(function () {
    //creation des tableau à l'ouverture de la page avec la date de hier
    createRapportPressbook(moment().format('YYYY-MM-DD'),moment().add(30, 'days').format('YYYY-MM-DD'));
    $('#reportrange').on('apply.daterangepicker', function (ev, picker) {
        //creation des tableau avec la date du date picker
        let dataTable = $("#listePressbook").DataTable();
            dataTable.clear().draw();
            dataTable.destroy();
            createRapportPressbook(picker.startDate.format('YYYY-MM-DD'), picker.endDate.format('YYYY-MM-DD'));
        
    });
});


const createRapportPressbook = (dateDebut, dateFin) => {
    $("#loadingRapportPressbook").html('<img src="/images/loading.gif" />');
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/pressbook/liste/req",
        data: JSON.stringify({
            dateDebut : dateDebut,
            dateFin : dateFin
        }),
        dataType : 'json',
        success: (data) =>{
            let liste = [];
            let pressbook = data.data;
            for(let i of pressbook){
                liste.push(i);
            }
            liste.forEach((value) =>{
                let dateProdVerif = value.date_prod === null ? '' : moment(value.date_prod).format('YYYY-MM-DD');
                let dateParutionVerif = value.parution === null ? '' : moment(value.parution).format('YYYY-MM-DD');
                let datePortageVerif = value.date_portage === null ? '' : moment(value.date_portage).format('YYYY-MM-DD');
                if(value.dossier_fabrication === true){
                 $("#listePressbook").append("<tr><td>"+value.id+"</td><td>"+moment(value.date).format('YYYY-MM-DD HH:mm')+"</td><td><a id="+value._id+" onclick=\"pdf(this)\" ><i class=\"fa fa-file-pdf-o fa-2x\"></i></a></td><td>"+value.theme+"</td><td class='suppl'>"+value.suppl+"</td><td>"+dateParutionVerif+"</td><td>"+ dateProdVerif +"</td><td>"+ datePortageVerif+"</td><td>"+value.edition+"</td><td>"+value.produit+"</td><td>"+value.fabr+"</td><td>"+value.papier+"</td><td>"+value.pagination+"</td><td>"+value.nb_quadri+"</td><td>"+value.tap+"</td><td>"+value.journaux+"</td><td>"+value.tirage_mini+"</td><td>"+value.origine+"</td><td>"+value.source+"</td><td>"+value.observation+"</td><td>"+value.option_reser+"</td></tr>");
                }
                else if(value.dossier_fabrication === false){
                 $("#listePressbook").append("<tr><td>"+value.id+"</td><td>"+moment(value.date).format('YYYY-MM-DD HH:mm')+"</td><td></td><td>"+value.theme+"</td><td class='suppl'>"+value.suppl+"</td><td>"+ dateParutionVerif+"</td><td>"+  dateProdVerif +"</td><td>"+datePortageVerif+"</td><td>"+value.edition+"</td><td>"+value.produit+"</td><td>"+value.fabr+"</td><td>"+value.papier+"</td><td>"+value.pagination+"</td><td>"+value.nb_quadri+"</td><td>"+value.tap+"</td><td>"+value.journaux+"</td><td>"+value.tirage_mini+"</td><td>"+value.origine+"</td><td>"+value.source+"</td><td>"+value.observation+"</td><td>"+value.option_reser+"</td></tr>");
                }
            });
            $('#listePressbook').addClass(" table table-striped table-bordered dt-responsive");
            $('#listePressbook').DataTable({
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
              $(".suppl").each(function(index, element){
                if($( this ).text() == "TAP" || $( this ).text() == "Autres produit"){
                    $( element ).css( "backgroundColor", "#ffe6ff" );
                }
                else if($( this ).text() == "Memostick"){
                    $( element ).css( "backgroundColor", "#ffffb3" );
                }
                else if($( this ).text() == "Supp"){
                    $( element ).css( "backgroundColor", "#ccffcc" );
                }
              });
              $("#loadingRapportPressbook").html('');
        }
    });
}


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
           /* new PNotify({
                title: 'Pdf créé',
                text: 'Votre saisie a été prise en compte',
                type: 'success',
                stylings: 'bootstrap3'
            });*/
            window.location.href = '/download';
        }
    });
}
