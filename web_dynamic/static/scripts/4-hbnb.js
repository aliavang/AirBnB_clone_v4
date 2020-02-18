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

  $.get('http://0.0.0.0:5001/api/v1/status/'
  ).done(function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    }
  });
  $.post({
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    contentType: 'application/json',
    data: JSON.stringify({})
  }).done(function (data) {
    data.forEach(function (place) {
      const htmlStr = `<article>

        <div class="title">

          <h2>${place.name}</h2>

          <div class="price_by_night">

      ${place.price_by_night}

          </div>
        </div>
        <div class="information">
          <div class="max_guest">
      <i class="fa fa-users fa-3x" aria-hidden="true"></i>

      <br />

      ${place.max_guest} Guests

          </div>
          <div class="number_rooms">
      <i class="fa fa-bed fa-3x" aria-hidden="true"></i>

      <br />

      ${place.number_rooms} Bedrooms
          </div>
          <div class="number_bathrooms">
      <i class="fa fa-bath fa-3x" aria-hidden="true"></i>

      <br />

      ${place.number_bathrooms} Bathroom

          </div>
        </div>

        <!-- **********************
       USER
       **********************  -->

        <div class="user">

        </div>
        <div class="description">

          ${place.description}

        </div>

      </article>`;
      $('section.places').append($(htmlStr));
    });
  });

  $('BUTTON').click(function () {
    $('SECTION.places ARTICLE').remove();
    $.post({
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: Object.keys(checked) })
    }).done(function (data) {
      data.forEach(function (place) {
        const htmlStr = `<article>

          <div class="title">

          <h2>${place.name}</h2>

          <div class="price_by_night">

        ${place.price_by_night}

        </div>
          </div>
          <div class="information">
          <div class="max_guest">
          <i class="fa fa-users fa-3x" aria-hidden="true"></i>

          <br />

        ${place.max_guest} Guests

        </div>
          <div class="number_rooms">
          <i class="fa fa-bed fa-3x" aria-hidden="true"></i>

          <br />

        ${place.number_rooms} Bedrooms
        </div>
          <div class="number_bathrooms">
          <i class="fa fa-bath fa-3x" aria-hidden="true"></i>

          <br />

        ${place.number_bathrooms} Bathroom

        </div>
          </div>

          <!-- **********************
          USER
        **********************  -->

          <div class="user">

        </div>
          <div class="description">

        ${place.description}

        </div>

        </article>`;
        $('section.places').append($(htmlStr));
      });
    });
  });
});
