let front = {
  hamburger: $('.hamburger'),
  nav: $('.navbar'),
  subNav: $('.menu-item-has-child'),
  $body: $('body'),
  init: function () {
      this.events();
      var swiper = new Swiper('.clients-carousel', {
        slidesPerView: 'auto',
        loop: true,
        centeredSlides: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
      AOS.init({
        // Global settings:
        disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
        startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
        initClassName: 'aos-init', // class applied after initialization
        animatedClassName: 'aos-animate', // class applied on animation
        useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
        disableMutationObserver: false, // disables automatic mutations' detections (advanced)
        debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
        throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
        
      
        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 0, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 500, // values from 0 to 3000, with step 50ms
        easing: 'ease', // default easing for AOS animations
        once: true, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
      
      });
  },
  toggleNav: function () {
    if (!this.hamburger.hasClass('open')) {
        this.hamburger.addClass('open');
        this.nav.toggleClass('active');
        this.$body.addClass('active')
        this.subNav.removeClass('show');
        this.subNav.find('p').remove();
        this.subNav.find('span').remove();
        } else {
            this.hamburger.removeClass('open');
            this.nav.toggleClass('active');
            this.$body.removeClass('active');
            this.subNav.removeClass('show');
            this.subNav.find('p').remove();
            this.subNav.find('span').remove();
        }
    },


  openTab: function (element, tabName, parent) {
      let i, tab_content, tab_links;

      tab_content = $(element).closest(parent).find('.tab-content');

      for (i = 0; i < tab_content.length; i++) {
          tab_content[i].style.display = "none";
      }

      tab_links = $(element).closest('.tabs-ul').find('.tab-links');

      for (i = 0; i < tab_links.length; i++) {
          tab_links[i].className = tab_links[i].className.replace(" active", "");
      }

      document.getElementById(tabName).style.display = "block";
      $(element).addClass('active');
  },
  hoverTab: function (el, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    el.currentTarget.className += " active";
  },

  events: function () {
      let self = this;
      $(document).on('click', '.hamburger', function () {
          self.toggleNav();
      });
  }
};

let modal = {
  closeButton: $('.modal__close'),
  closeOverlay: $('.modal'),
  can: 1,
  init: function () {
      this.events();
  },
  openModal: function (id) {
      let modalWindow = $(id);
      modalWindow.fadeIn();
      modalWindow.find('.modal__content').removeClass('animate-away').addClass('animate-in');
      // $('body, html').addClass('active');
  },

  closeModal: function (id) {
      let modalWindow = $(id);
      modalWindow.find('.modal__content').removeClass('animate-in').addClass('animate-away');
      modalWindow.fadeOut();
      // $('body, html').removeClass('active');
  },

  events: function () {

      $(document).on('click', '.modalTrigger', function (e) {
          e.preventDefault();
          let self = $(this),
              target = self.attr('data-modal');
          modal.openModal(target);

      });

      $(document).on('click', '.modal', function (event) {
          let self = '#' + $(this).attr('id');
          if (event.target.className == 'modal__body') {
              modal.closeModal(self);
          }
      });

      $(document).on('click', '.modal__close', function () {
          let self = '#' + $(this).closest('.modal').attr('id');
          modal.closeModal(self);
      });
        $(document).on('click', '.scroll-to-top i', function () {
            $('body,html').animate({
                scrollTop : 0                       // Scroll to top of body
            }, 500);
      });
        $(document).on('click', '.scroll-down i', function () {
            $('html, body').animate({
                scrollTop: $(this).closest("section").next().offset().top - 90
             }, "slow");
      });



      if (window.matchMedia("(min-width: 1200px)").matches) {
        $(document).on('click', '.nav-btn', function (e) {
            $('.menu-item-has-child').toggleClass('show');
        });

        $('html').click(function(e) {
            var a = e.target;
            if ($(a).parents('.menu-item-has-child').length === 0) {
              $('.menu-item-has-child').removeClass('show'); //hide menu item
           }
          });
      } else {
        $(document).on('click', '.nav-btn', function (e) {
            e.preventDefault();
            var navTitle = document.createElement("p");
            var navBack = document.createElement("span");
            navTitle.className = "nav-title";        
            navBack.className = "prev-page"
            navBack.innerHTML = '<i class="icon-icon-arrow-bottom"></i>GO BACK';
            navTitle.innerHTML = $(this).prev().text();
            $(this).next('.sub-menu').prepend(navTitle);
            $(this).next().prepend(navBack);
            $('.menu-item-has-child').toggleClass('show');
        });
        
        
        $(document).on('click', '.prev-page', function (e) {
            e.preventDefault();
            if ($(this).parent().parent().hasClass('show')) {
                $(this).parent().parent().removeClass("show");
                $(this).parent().find('p').remove();
                $(this).parent().find('span').remove();
            } else {
              null
            }
        });
      }

      
      
  }
};


jQuery(function () {
  front.init();
  modal.init();
    
});

document.body.addEventListener('keyup', function(e) {
  if (e.which === 9) /* tab */ {
    document.body.classList.remove('no-focus-outline');
  }
});


// HIDE MENU ON BODY CLICK



$(window).scroll(function () {
    if ($(this).scrollTop() > 10) {
      $('.header').addClass("scroll-header");
    } else {
        $('.header').removeClass("scroll-header");
    }
  });

$('.perfomance__total').each(function () {
  setTimeout(function(){ 
    jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
      duration: 1000,
      easing: 'swing',
      step: function () {
        $this.text(Math.ceil(this.Counter));
      }
    });
  }, 800);
  var $this = $(this);

});
