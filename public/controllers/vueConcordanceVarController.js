$(document).ready(function () {
    //creation des tableau à l'ouverture de la page avec la date de hier
    createListeConcordanceVar();

});

const createListeConcordanceVar = () => {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/concordance/req",
        data: JSON.stringify({
            "secteur": "VAR"
        }),
        dataType : 'json',
        success: (data) =>{
            console.log(data.data)
            let liste = [];
            let tournee = data.data;
            for(let i of tournee){
                liste.push(i);
            }
            liste.forEach((value) =>{
                $("#tableauListeConcordanceVar").append("<tr><td>"+value.num_tournee+"</td><td style='text-align:left'>"+value.nom_tournee+"</td><td style='text-align:left'>"+value.edition+"</td><td>"+value.secteur+"</td><td style='text-align:left'>"+value.routage+"</td><td style='text-align:left'>"+value.lieu_depot+"</td> <td>"+value.manager+"</td><td>"+value.net10+"</td> </tr>");
            });
            $('#tableauListeConcordanceVar').addClass(" datatable-buttons-tournee table table-striped table-bordered dt-responsive");
            $('#tableauListeConcordanceVar').DataTable({
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
        }
    });
};
