$(document).ready(function () {
    //creation des tableau à l'ouverture de la page avec la date de hier
    createRapportPressbook(moment().subtract(1, 'days').format('YYYY-MM-DD'), moment().subtract(1, 'days').format('YYYY-MM-DD'));
    $('#reportrange').on('apply.daterangepicker', function (ev, picker) {
        //creation des tableau avec la date du date picker
        createRapportPressbook(picker.startDate.format('YYYY-MM-DD'), picker.endDate.format('YYYY-MM-DD'));
    });
});


const createRapportPressbook = (dateDebut, dateFin) => {
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
            let dataTable = $("#listePressbook").DataTable();
            dataTable.clear().draw();
            let liste = [];
            let pressbook = data.data;
            for(let i of pressbook){
                liste.push(i);
            }
            liste.forEach((value) =>{
                if(value.dossier_fabrication === true){
                    dataTable.row.add([value.id, moment(value.date).format('YYYY-MM-DD HH:mm'), "<a id="+value._id+" onclick=\"pdf(this)\" ><i class=\"fa fa-file-pdf-o fa-2x\"></i></a>", value.theme, 
                    value.suppl, moment(value.parution).format('YYYY-MM-DD'), moment(value.date_prod).format('YYYY-MM-DD'), moment(value.date_portage).format('YYYY-MM-DD'), value.edition, value.produit, value.fabr, value.papier, value.pagination,
                    value.nb_quadri, value.tap, value.journaux, value.tirage_mini, value.origine, value.source, value.observation, value.option_reser ]);
                }
                else if(value.dossier_fabrication === false){
                    dataTable.row.add([value.id, moment(value.date).format('YYYY-MM-DD HH:mm'), " ", value.theme, value.suppl, value.parution ? moment(value.parution).format('YYYY-MM-DD') : "", value.date_prod ?  moment(value.date_prod).format('YYYY-MM-DD') : "", value.date_portage ?  moment(value.date_portage).format('YYYY-MM-DD') : "", 
                    value.edition, value.produit, value.fabr, value.papier, value.pagination, value.nb_quadri, value.tap, value.journaux,
                     value.tirage_mini, value.origine, value.source, value.observation, value.option_reser ]);
                }
                
            });
            dataTable.draw();
        }
    });

}

const pdf = (o)=>{
    let id = $(o)[0].id;
    console.log(id);

    $.ajax({
        type: "POST",
        contentType : "application/json",
        url: "/pressbook/saisie/pdf",
        data: JSON.stringify({
            "identifiant": id
        }),
        dataType : 'json',
        success: function (data) {
            console.log("bb");
            new PNotify({
                title: 'Pdf créé',
                text: 'Votre saisie a été prise en compte',
                type: 'success',
                stylings: 'bootstrap3'
            });
            window.location.href = '/download';
        }
    });
}
