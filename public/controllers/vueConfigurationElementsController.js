$(document).ready(function() {
    getElements();
});



const addLine = (tab) => {
    const idTable = $(tab).closest('div')[0].children[0].children[1].id;

    const table = document.getElementById(idTable);
    const row = table.insertRow(-1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);

    cell1.style.textAlign = "center"; // edition
    cell1.style.verticalAlign = "middle";
    cell1.contentEditable = "true";

    cell2.style.maxWidth = "30px";

    cell2.innerHTML =
    "<div class='border-cells' style=\"text-align: center; vertical-align: middle\">" +
    "<span class=\"table-remove\">" +
    "<button type=\"button\" style='margin-top: 5px;' onclick = \"validateRow(this)\" class=\"btn btn-success btn-rounded btn-sm my-0\">Valider" +
        "</button>"+
    "<button type=\"button\" onclick = \"deleteRow(this)\"  class=\"btn btn-danger btn-rounded btn-sm my-0 nouveau\">X" +
    "</button>" +
    "</span>" +
    "</div>\n";   
};


//suppression d'une ligne (IHM)
const deleteRow = (o)=> {
    if (typeof(o) == "object") {
        $(o).closest("tr").remove();
    } else {
        return false;
    }
};


const getElements = () => {
    $("#editionData").empty();
    $("#fabrData").empty();
    $("#origineData").empty();
    $("#papierData").empty();
    $("#produitData").empty();
    $("#sourceData").empty();
    $("#supplData").empty();
    $.ajax({
        type: "GET",
        contentType : "application/json",
        url : "/configuration/elements/req",
        dataType : 'json',
        success : (data) =>{
            console.log(data.data);
            $.each(data.data, (key, elem) => {
                console.log(key);
                console.log(elem);
                const table = document.getElementById(key);
                console.log(table);
                for(let x of elem){
                    const row = table.insertRow(-1);

                    const cell1 = row.insertCell(0);
                    const cell2 = row.insertCell(1);
    
                    cell1.style.textAlign = "center"; // edition
                    cell1.style.verticalAlign = "middle";
                    cell1.style.maxWidth = "70px";
                    cell2.style.maxWidth = "30px";
    
                    cell1.innerHTML = x.nom;
    
                    cell2.innerHTML =
                        "<div class='border-cells' style=\"text-align: center; vertical-align: middle\">" +
                        "<span class=\"table-remove\">" +
                        "<button type=\"button\" id="+x._id+" onclick = \"deleteRowDB(this)\" class=\"btn btn-danger btn-rounded btn-sm my-0\">X" +
                        "</button>" +
                        "</span>" +
                        "</div>\n";
                }
                
               
            });
        }
    });
};


//fonction de validation de ligne BD (update ou insert)
const validateRow = (o)=> {
    if (typeof(o) == "object") {
        const idTab = $(o).closest("tbody")[0].id;
        if($(o).closest("tr")[0].cells[0].textContent !== '') {
            $(o).closest("tr")[0].cells[0].contentEditable = "false";
            $(o).closest("tr")[0].style.boxShadow="0px 0px #fff";
            $(o).closest("tr")[0].style.border="1px solid #ddd";
            $(o)[0].style.display = "none";

            let elem = $(o).closest("tr")[0].cells[0].textContent;

            $.ajax({
                type: "POST",
                contentType : "application/json",
                url : "/configuration/elements/req",
                data : JSON.stringify({
                    "idTab" : idTab,
                    "elem" : elem
                }),
                dataType : 'json',
                success : (data) =>{
                    new PNotify({
                        title: 'Votre saisie à été prise en compte',
                        text: '',
                        type: 'success',
                        styling: 'bootstrap3'
                    });
                    getElements();
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
            $(o).closest("tr")[0].cells[0].style.boxShadow=" inset 0px 0px 5px 0px #ff0000";
        }

    } else {
        return false;
    }
};





//suppression d'une ligne BD
const deleteRowDB = async (o)=> {
    if (typeof(o) == "object") {
        const idTab = $(o).closest("tbody")[0].id;
        let id = $(o).attr("id");
        console.log(id);
        $.ajax({
            type: "DELETE",
            contentType : "application/json",
            url : "/configuration/elements/req",
            data : JSON.stringify({
                "idTab" : idTab,
                "id" : id
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