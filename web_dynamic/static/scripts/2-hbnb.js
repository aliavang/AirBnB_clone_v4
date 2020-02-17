const checked = {};
$(function () {
  $('.amenities input').change(function () {
    if (this.checked) {
      checked[this.getAttribute('data-id')] = this.getAttribute('data-name');
    } else {
      delete checked[this.getAttribute('data-id')];
    }
    $('.amenities h4').text(Object.keys(checked).length === 0 ? '\xa0' : Object.values(checked).join(', '));
  });

  $.get('http://0.0.0.0:5001/api/v1/status/')
  .done(function (data) {
    if (data.status === 'OK') {
      $('header div').addClass('available');
    }
  });
});
