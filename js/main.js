(function () {
  'use strict';

  let contactForm = $('#contact-form').parsley();
  let data = {
    name: '',
    email: '',
    message: ''
  };

  listeners();
  scrollToRelativeLinks();
  toggleBackToTop();
  fixIEScrollCrap();


  function listeners() {
    $('.disable-link').on('click', function () {
      return false;
    });

    $('#send-message').on('click', function () {
      contactForm.validate();
      const url = 'https://mt-web-portfolio-emailer.azurewebsites.net/api/Emailer?code=Q4N0nc7gR1ARWJhC9CU5kDYEkUYhWuPjFohbjavI6jExr8BQ83pWYg==';
      if (contactForm.isValid()) {
        data.name = $('#name').val();
        data.email = $('#email').val();
        data.message = $('#message').val();
        $.post(url, JSON.stringify(data))
          .done(resp => {
            // $('#contact-modal').modal('hide');
            // $('#thank-you-modal').modal('show');
            // $('#message-error').hide();
            // $('#contact-form')[0].reset();
            // contactForm.reset();
            console.log('response:', resp);
          })
          .fail(e => {
            // $('#thank-you-modal').modal('hide');
            // $('#message-error').show();
            console.log('Error:', e);
          });
        $('#contact-modal').modal('hide');
        $('#contact-form')[0].reset();
        contactForm.reset();
      }
    });
  }


  function formToJSON(elements) {
    return [].reduce.call(elements, (data, element) => {
      data[element.name] = element.value;
      return data;
    }, {});
  }


  function scrollToRelativeLinks() {
    $('a').on('click', function (e) {
      console.log('link clicked:', e);
      if (e.target.hash.indexOf('#') === 0) {
        let pos = $(e.target.hash).offset().top;
        console.log('relative link, pos:', pos);
        $('html, body').animate({
            scrollTop: pos - 50
          }, pos / 5,    // this is the animation time
          function () {
            console.log('returning false');
            return false;
          }    // what to do after the animation
        );
      }
    });
  }

  function toggleBackToTop() {
    $(window).on('scroll', function () {
      if ($(this).scrollTop() > 0) {
        $('.back-to-top').show();
      } else {
        $('.back-to-top').hide();
      }
    });
  }

  function fixIEScrollCrap() {
    if (navigator.userAgent.match(/Trident\/7\./)) { // if IE
      $('body').on("mousewheel", function () {
        // remove default behavior
        event.preventDefault();

        //scroll without smoothing
        let wheelDelta = event.wheelDelta;
        let currentScrollPosition = window.pageYOffset;
        window.scrollTo(0, currentScrollPosition - wheelDelta);
      });
    }
  }

})();