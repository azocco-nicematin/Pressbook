$(document).ready(function () {
    //creation des tableau à l'ouverture de la page avec la date de hier
    createListeTourneePublihome();
    getPublihomeInfo();


    $("#paquets").submit(function (e) {

        e.preventDefault();

        let form = $(this);
        let paquet = $("#paquet").val();
        let id = $("#identifiantSupp").text();
        let url = "/publihome/coiffe";
        let type = form.attr('method');
        let typeQuantite;
        if($('#net').prop('checked') === true){
            typeQuantite = "net";
        }
        else{
            typeQuantite = "net10";
        }
       
  // window.location.href = '/publihome/coiffe/id/'+id+'/paquet/'+paquet;
        $.ajax({
                type: type,
                url: url,
                contentType: "application/json",
                dataType : 'json',
                data: JSON.stringify({
                    "id": id,
                    "paquet" : paquet,
                    "typeQuantite" : typeQuantite
                }),
                success: function (data) {
                   // createTableauSaisie();
                    new PNotify({
                        title: '',
                        text: 'Votre saisie à été prise en compte',
                        type: 'success',
                        styling: 'bootstrap3'
                    });
                    window.location.href = '/download/coiffe';
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
    });
});



const createListeTourneePublihome = () => {
    let id = $("#identifiantSupp").text();
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/publihome/saisie/liste/req",
        data: JSON.stringify({
            id : id
        }),
        dataType : 'json',
        success: (data) =>{
            let liste = [];
            let tournee = data.data;
            for(let i of tournee){
                liste.push(i);
            }
            let quantiteTotale = 0;
            let quantiteTotale10 = 0;
            liste.forEach((value) =>{
                $("#tableauListeTourneePublihome").append("<tr><td>"+value.num_tournee+"</td><td style='text-align:left'>"+value.nom_tournee+"</td><td style='text-align:left'>"+value.edition+"</td><td>"+value.secteur+"</td><td style='text-align:left'>"+value.routage+"</td><td style='text-align:left'>"+value.lieu_depot+"</td> <td>"+value.manager+"</td><td>"+value.net+"</td><td>"+value.net10+"</td> </tr>");
                    quantiteTotale += parseInt(value.net);
                    quantiteTotale10 += parseInt(value.net10);
            });
            $("#sommeQuantiteNet span").append(quantiteTotale);
            $("#sommeQuantiteNet10 span").append(quantiteTotale10);
            $('#tableauListeTourneePublihome').addClass("datatable-buttons-tournee table table-striped table-bordered dt-responsive");
            $('#tableauListeTourneePublihome').DataTable({
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


const getPublihomeInfo =  () =>{
    let id = $("#identifiantSupp").text();
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/publihome/saisie/req/id",
        data: JSON.stringify({
            identifiant : id
        }),
        dataType : 'json',
        success: (data) =>{
            $("#nomDuSupplement").html("Info portage du "+ moment(data.data.date_portage).format('DD/MM/YYYY')+ " - "+ data.data.titre);
        }
    });
};


