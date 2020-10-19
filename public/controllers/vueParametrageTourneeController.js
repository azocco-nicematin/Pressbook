$(document).ready(function() {
    getEdition();

    $('#edition').on('change',function(){
        getParamTournee();
    });

});


function getEdition(){
    $.ajax({
        type: "GET",
        contentType : "application/json",
        url : "/data/get-edition",
        dataType : 'json',
        success : function(data){
            $.each(data.data, function (key, edition) {
                $("#edition").append("<option>" + edition.nom + "</option>");
            });
            getParamTournee();
        }
    });
}


const getParamTournee = async () =>{
    $("#gestionTournees").empty();
    $.ajax({
        type: "POST",
        contentType : "application/json",
        url : "/configuration/tournees/req/data",
        data : JSON.stringify({
            "edition" : $("#edition option:selected").text()
        }),
        dataType : 'json',
        success : (data) =>{
            $.each(data.data, (key, donnes) =>{

                const table = document.getElementById("gestionTournees");
                const row = table.insertRow(-1);
                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                const cell3 = row.insertCell(2);
                const cell4 = row.insertCell(3);
                const cell5 = row.insertCell(4);
                const cell6 = row.insertCell(5);
                const cell7 = row.insertCell(6);
                const cell8 = row.insertCell(7);

                cell1.style.textAlign = "center"; // edition
                cell1.style.verticalAlign = "middle";
            
                cell2.style.verticalAlign = "middle";
                cell2.style.padding = "5px";
  
                cell3.style.textAlign = "center"; // edition
                cell3.style.verticalAlign = "middle";

                cell4.style.textAlign = "center"; // edition
                cell4.style.verticalAlign = "middle";

                cell5.style.verticalAlign = "middle";
                cell5.style.padding = "5px";
          
                cell6.style.verticalAlign = "middle";
                cell6.style.padding = "5px";
       
                cell7.style.textAlign = "center"; // edition
                cell7.style.verticalAlign = "middle";

                cell1.innerHTML = donnes.num_tournee;
                cell2.innerHTML = donnes.nom_tournee;
                cell3.innerHTML = donnes.edition;
                cell4.innerHTML = donnes.secteur;
                cell5.innerHTML = donnes.routage;
                cell6.innerHTML = donnes.lieu_depot;
                cell7.innerHTML = donnes.manager;



                cell8.innerHTML =
                    "<div class='border-cells' style=\"text-align: center; vertical-align: middle\">" +
                    "<span class=\"table-remove\">" +
                    "<button type=\"button\" style='width: 20px; height : 20px; margin-top : 5px; padding:0px' onclick = \"deleteRowDB(this)\" class=\"btn btn-danger btn-rounded btn-sm my-0\"><i class='fa fa-close'></i>" +
                    "</button>" +
                    "</span>" +
                    "</div>\n";
            });
        }
    });
}


//ajout d'une ligne (IHM)
const addLine = () => {

    const table = document.getElementById("gestionTournees");
    const row = table.insertRow(-1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);
    const cell6 = row.insertCell(5);
    const cell7 = row.insertCell(6);
    const cell8 = row.insertCell(7);

    cell1.style.textAlign = "center"; // edition
    cell1.style.verticalAlign = "middle";
    cell1.contentEditable = "true";

    cell2.style.verticalAlign = "middle";
    cell2.contentEditable = "true";
    

    cell3.style.textAlign = "center"; // edition
    cell3.style.verticalAlign = "middle";
    cell3.contentEditable = "false";
    cell3.textContent = $("#edition option:selected").text();

    cell4.style.textAlign = "center"; // edition
    cell4.style.verticalAlign = "middle";
    cell4.contentEditable = "true";

    cell5.style.verticalAlign = "middle";
    cell5.contentEditable = "true";
    

    cell6.style.verticalAlign = "middle";
    cell6.contentEditable = "true";

    cell7.style.textAlign = "center"; // edition
    cell7.style.verticalAlign = "middle";
    cell7.contentEditable = "true";
    

    row.style.boxShadow="0px 0px 8px 0px #51cbee";

    cell8.innerHTML =
        "<div class='border-cells' style=\"text-align: center; vertical-align: middle\">" +
        "<span class=\"table-remove\">" +
        "<button type=\"button\" style='margin-top: 5px;' onclick = \"validateRow(this)\" class=\"btn btn-success btn-rounded btn-sm my-0\">Valider" +
        "</button>"+
        "<button type=\"button\" style='width: 30px; height : 30px; margin-top : 5px' onclick = \"deleteRow(this)\"  class=\"btn btn-danger btn-rounded btn-sm my-0 nouveau\">X" +
        "</button>" +
        "</span>" +
        "</div>\n";          
    };



//fonction de validation de ligne BD (update ou insert)
const validateRow = (o)=> {
    if (typeof(o) == "object") {
        if($(o).closest("tr")[0].cells[0].textContent !== '' && $(o).closest("tr")[0].cells[1].textContent !== ''&& $(o).closest("tr")[0].cells[3].textContent !== '' && $(o).closest("tr")[0].cells[4].textContent !== ''&& $(o).closest("tr")[0].cells[5].textContent !== '' && $(o).closest("tr")[0].cells[6].textContent !== '' ) {
            $(o).closest("tr")[0].cells[0].contentEditable = "false";
            $(o).closest("tr")[0].cells[1].contentEditable = "false";
            $(o).closest("tr")[0].cells[3].contentEditable = "false";
            $(o).closest("tr")[0].cells[4].contentEditable = "false";
            $(o).closest("tr")[0].cells[5].contentEditable = "false";
            $(o).closest("tr")[0].cells[6].contentEditable = "false";
            $(o).closest("tr")[0].style.boxShadow="0px 0px #fff";
            $(o).closest("tr")[0].style.border="1px solid #ddd";
            $(o)[0].style.display = "none";


            let edition = $("#edition option:selected").text();
            let numTournee = $(o).closest("tr")[0].cells[0].textContent;
            let nomTournee = $(o).closest("tr")[0].cells[1].textContent;
            let secteur = $(o).closest("tr")[0].cells[3].textContent;
            let routage = $(o).closest("tr")[0].cells[4].textContent;
            let lieuDepot = $(o).closest("tr")[0].cells[5].textContent;
            let manager = $(o).closest("tr")[0].cells[6].textContent;

            $.ajax({
                type: "POST",
                contentType : "application/json",
                url : "/configuration/tournees/req",
                data : JSON.stringify({
                    "edition" : edition,
                    "numTournee" : numTournee,
                    "nomTournee" : nomTournee,
                    "secteur": secteur,
                    "routage" : routage,
                    "lieuDepot" : lieuDepot,
                    "manager" : manager
                }),
                dataType : 'json',
                success : (data) =>{
                    new PNotify({
                        title: 'Votre saisie à été prise en compte',
                        text: '',
                        type: 'success',
                        styling: 'bootstrap3'
                    });
                    getParamTournee();
                },
                error : (data) =>{
                    new PNotify({
                        title: 'Erreur serveur',
                        text: '',
                        type: 'error',
                        styling: 'bootstrap3'
                    });
                }
            });
        }
        else{
            new PNotify({
                title: 'Champs Invalide*',
                text: 'Veuillez remplir tout les champs obbligatoire',
                type: 'error',
                styling: 'bootstrap3'
            });
            $(o).closest("tr")[0].style.boxShadow=" inset 0px 0px 5px 0px #ff0000";
        }

    } else {
        return false;
    }
};



//suppression d'une ligne (IHM)
const deleteRow = (o)=> {
    if (typeof(o) == "object") {
        $(o).closest("tr").remove();
    } else {
        return false;
    }
};

//suppression d'une ligne BD
const deleteRowDB = async (o)=> {
    if (typeof(o) == "object") {
        let edition = $("#edition option:selected").text();
            let numTournee = $(o).closest("tr")[0].cells[0].textContent;
            let nomTournee = $(o).closest("tr")[0].cells[1].textContent;
            let secteur = $(o).closest("tr")[0].cells[3].textContent;
            let routage = $(o).closest("tr")[0].cells[4].textContent;
            let lieuDepot = $(o).closest("tr")[0].cells[5].textContent;
            let manager = $(o).closest("tr")[0].cells[6].textContent;
        $.ajax({
            type: "DELETE",
            contentType : "application/json",
            url : "/configuration/tournees/req",
            data : JSON.stringify({
                "edition" : edition,
                "numTournee" : numTournee,
                "nomTournee" : nomTournee,
                "secteur": secteur,
                "routage" : routage,
                "lieuDepot" : lieuDepot,
                "manager" : manager
            }),
            dataType : 'json',
            success : (data) =>{
                $(o).closest("tr").remove();
                new PNotify({
                    title: 'Equipement supprimé',
                    text: '',
                    type: 'success',
                    styling: 'bootstrap3'
                });
            }
        });

    } else {
        return false;
    }
};

