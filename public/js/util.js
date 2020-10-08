/*bootstrap-daterangepicker */
      $(document).ready(function() {

        var cb = function(start, end, label) {
          $('#reportrange span').html(start.format('DD MMMM YYYY') + ' - ' + end.format('DD MMMM YYYY'));
        };

        var optionSet1 = {
          startDate: moment().subtract(1, 'days'),
          endDate: moment().subtract(1, 'days'),
          minDate: '01/01/2010',
          maxDate: moment(),
          weekStart: 1,
          dateLimit: {
            days: 3000
          },
          showDropdowns: true,
          linkedCalendars: true,
          showWeekNumbers: true,
          timePicker: false,
          timePickerIncrement: 1,
          timePicker12Hour: true,
          ranges: {
            'Aujourd\'hui': [moment(), moment()],
            'Hier': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Les 7 derniers jours': [moment().subtract(6, 'days'), moment()],
            'Les 30 derniers jours': [moment().subtract(29, 'days'), moment()],
            'Ce mois-ci': [moment().startOf('month'), moment().endOf('month')],
            'Le mois dernier': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
          },
          opens: 'left',
          buttonClasses: ['btn btn-default'],
          applyClass: 'btn-small btn-primary',
          cancelClass: 'btn-small',
          format: 'DD/MM/YYYY',
          separator: ' à ',
          locale: {
            applyLabel: 'Valider',
            cancelLabel: 'Fermer',
            fromLabel: 'De',
            toLabel: 'à',
            customRangeLabel: 'Autre période',
            daysOfWeek: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
            monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            firstDay: 1
          }
        };
        //$('#reportrange span').html(moment().subtract(1, 'month').add(1,'days').format('DD MMMM YYYY') + ' - ' + moment().subtract(1, 'days').add(1,'days').format('DD MMMM YYYY'));

         $('#reportrange span').html(moment().subtract(1, 'days').format('DD MMMM YYYY') + ' - ' + moment().subtract(1, 'days').format('DD MMMM YYYY'));
        $('#reportrange').daterangepicker(optionSet1, cb);
        $('#reportrange').on('show.daterangepicker', function() {
          //console.log("show event fired");
        });
        $('#reportrange').on('hide.daterangepicker', function() {
          //console.log("hide event fired");
        });
        $('#reportrange').on('apply.daterangepicker', function(ev, picker) {
          console.log("dates sélectionnées du " + picker.startDate.format('DD MMMM YYYY') + " au " + picker.endDate.format('DD MMMM YYYY'));
        });
        $('#reportrange').on('cancel.daterangepicker', function(ev, picker) {
          //console.log("cancel event fired");
        });
        $('#options1').click(function() {
          $('#reportrange').data('daterangepicker').setOptions(optionSet1, cb);
        });
        $('#options2').click(function() {
          $('#reportrange').data('daterangepicker').setOptions(optionSet2, cb);
        });
        $('#destroy').click(function() {
          $('#reportrange').data('daterangepicker').remove();
        });
      });


/* Datatables */
      $(document).ready(function() {
        var handleDataTableButtons = function() {
          if ($(".datatable-buttons").length) {
            $(".datatable-buttons").DataTable({
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
          }
          if ($(".datatable-buttons-tournee").length) {
            $(".datatable-buttons-tournee").DataTable({
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
                  className: "btn-sm",
                  messageTop: '$("#sommeQuantite").text()'
                },
              ],
              responsive: true,
              "pageLength": 400
            });
          }

          
        };

        TableManageButtons = function() {
          "use strict";
          return {
            init: function() {
              handleDataTableButtons();
            }
          };
        }();

        $('#datatable').dataTable();

        $('#datatable-keytable').DataTable({
          keys: true
        });

        $('#datatable-responsive').DataTable();

        $('#datatable-scroller').DataTable({
          ajax: "js/datatables/json/scroller-demo.json",
          deferRender: true,
          scrollY: 380,
          scrollCollapse: true,
          scroller: true
        });

        $('#datatable-fixed-header').DataTable({
          fixedHeader: true
        });

        var $datatable = $('#datatable-checkbox');

        $datatable.dataTable({
          'order': [[ 1, 'asc' ]],
          'columnDefs': [
            { orderable: false, targets: [0] }
          ]
        });
        $datatable.on('draw.dt', function() {
          $('input').iCheck({
            checkboxClass: 'icheckbox_flat-green'
          });
        });

        TableManageButtons.init();
      });


     
