/* Starrr */
  $(document).ready(function() {
    $(".stars").starrr();

    $('.stars-existing').starrr({
      rating: 4
    });

    $('.stars').on('starrr:change', function (e, value) {
      $('.stars-count').html(value);
    });

    $('.stars-existing').on('starrr:change', function (e, value) {
      $('.stars-count-existing').html(value);
    });
  });