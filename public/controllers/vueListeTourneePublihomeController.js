$(document).ready(function () {
    //creation des tableau à l'ouverture de la page avec la date de hier
    createListeTourneePublihome();
    getPublihomeInfo();
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
            console.log(data.data)
            let dataTable = $("#tableauListeTourneePublihome").DataTable();
            dataTable.clear().draw();
            let liste = [];
            let tournee = data.data;
            for(let i of tournee){
                liste.push(i);

            }
            let quantiteTotale = 0;
            liste.forEach((value) =>{
                    dataTable.row.add([value.num_tournee, value.nom_tournee, value.edition, value.secteur, 
                    value.routage, value.lieu_depot, value.manager , value.net10]);
                    quantiteTotale += parseInt(value.net10);
            });
            dataTable.draw();
            $("#sommeQuantite span").append(quantiteTotale);
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

}