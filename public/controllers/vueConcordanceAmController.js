$(document).ready(function () {
    //creation des tableau à l'ouverture de la page avec la date de hier
    createListeConcordanceAm();

});

    const createListeConcordanceAm = () => {
        $("#loadingConcordanceAm").html('<img src="/images/loading.gif" />');
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/concordance/req",
        data: JSON.stringify({
            "secteur": "AM"
        }),
        dataType : 'json',
        success: (data) =>{
            let liste = [];
            let tournee = data.data;
            for(let i of tournee){
                liste.push(i);
            }
            let quantiteTotale = 0;
            liste.forEach((value) =>{
                $("#tableauListeConcordanceAm").append("<tr><td>"+value.num_tournee+"</td><td>"+value.ilot+"</td><td style='text-align:left'>"+value.nom_tournee+"</td><td style='text-align:left'>"+value.edition+"</td><td>"+value.secteur+"</td><td style='text-align:left'>"+value.routage+"</td><td style='text-align:left'>"+value.lieu_depot+"</td> <td>"+value.manager+"</td><td>"+value.net+"</td> </tr>");
                quantiteTotale += parseInt(value.net);
            });
            $("#sommeQuantiteNet span").append(quantiteTotale);
            $('#tableauListeConcordanceAm').addClass(" datatable-buttons-tournee table table-striped table-bordered dt-responsive");
            $('#tableauListeConcordanceAm').DataTable({
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
                responsive: true,
                "pageLength": 400
            });
            $("#loadingConcordanceAm").html('');
        }
    });

};
