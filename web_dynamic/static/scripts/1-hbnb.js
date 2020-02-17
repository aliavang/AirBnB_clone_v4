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
});
