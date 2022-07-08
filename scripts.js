// (function ($) {
//   $(window).on("load", function () {
//     var limit = 12;
//     new InstagramFeed({
//       username: "svanadesign",
//       host: 'https://images' + ~~(Math.random() * 3333) + '-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=https://www.instagram.com/',
//       image_size: 480,
//       callback: function (data) {
//         var instaData = data.edge_owner_to_timeline_media.edges;
//         console.log(instaData);
//         var html;
//         instaData
//           .slice(0, limit)
//           .forEach( function( item ) {
//             var node = item.node;
//             var link = "https://www.instagram.com/p/" + node.shortcode + "/";
//             var image_url = node.thumbnail_src;
//             html = '<div class="carousel-cell col-md-3 col-lg-2">';
//             html += '<a href="'+ link +'" target="_blank">';
//             html += '<img class="img-fluid" src="' + image_url + '">';
//             html += '</a></div>';
//             $("#instagram-feed-home").append(html);
//           });
//         $("#instagram-feed-home").flickity({
//           cellAlign: "left",
//           contain: true,
//           pageDots: false,
//           adaptiveHeight: false,
//           imagesLoaded: true,
//           friction: 0.8,
//           selectedAttraction: 0.2,
//           watchCSS: true,
//           prevNextButtons: false
//         });
//       },
//     });
//   });
// })(jQuery);
function getDiscountPercentage() {
  const salePrice = $('.sale-price').data('value');
  const price = $('.original-price').data('value');
  const discountPercentage = Math.round(100 - ((salePrice / price) * 100));
  
  $('.product-pricing-save').text(`Save ${discountPercentage}%`);
}

jQuery(document).ready(function () {
  // for product pricing save 
  getDiscountPercentage();


  var carouselArgs = {
    // options
    cellAlign: "left",
    contain: true,
    pageDots: false,
    adaptiveHeight: false,
    imagesLoaded: true,
    friction: 0.8,
    selectedAttraction: 0.2,
    watchCSS: true
  };


  var $carousel = $(".carousel").flickity(carouselArgs);

  var carouselResponsiveArgs = carouselArgs;
  var carouselProductArgs = carouselArgs;

  carouselResponsiveArgs['prevNextButtons'] = false;

  carouselProductArgs['pageDots'] = true;
  carouselProductArgs['prevNextButtons'] = false;
  carouselProductArgs['wrapAround'] = true;
  carouselProductArgs['watchCSS'] = false;

  console.log(carouselProductArgs);

  var $pageNavLink = $('.page-navigation a');

  $('.carousel-mobile').flickity(carouselResponsiveArgs);

  $('.carousel-product').flickity(carouselProductArgs);

  $('.carousel-product-nav').flickity({ 
    asNavFor: ".carousel-product", 
    contain: true, 
    pageDots: false,
    prevNextButtons: false,
    cellAlign: 'left'
  });

  $('.product-image-gallery-large').show();

  var $prevButton = $('.carousel-button.prev');
  var $nextButton = $('.carousel-button.next');

  $prevButton.on('click', function(){
    var $dataCarousel = $('.' + $(this).attr('data-carousel') + '');
    $dataCarousel.flickity('previous');
  });

  $nextButton.on('click', function(){
    var $dataCarousel = $('.' + $(this).attr('data-carousel') + '');
    $dataCarousel.flickity('next');
  });
  

  function onSlideEnd(event, index) {
    var target = $(event.target);
    var flkty = target.data("flickity");
    var slideLength = 0;
    if (flkty) {
      var slideLength = flkty.slides.length;
    }
    var $prev = target.find('.previous');
    var $next = target.find('.next');
    if (index == slideLength - 1) {
      $prev.addClass("end-slide-previous");
      $nextButton.addClass("end-slide");
      $nextButton.find('.arrow').addClass('disabled');
    } else if (index == 0) {
      $next.addClass("end-slide");
      $prevButton.addClass("end-slide-previous");
      $prevButton.find('.arrow').addClass('disabled');
    } else {
      if ($prev) {
        if ($prev.hasClass("end-slide-previous")) {
          $prev.removeClass("end-slide-previous");
        }
      }
      if ($next) {
        if ($next.hasClass("end-slide")) {
          $next.removeClass("end-slide");
        }
      }
      if ($prevButton.hasClass("end-slide-previous")) {
        $prevButton.removeClass("end-slide-previous");
        $prevButton.find('.arrow').removeClass('disabled');
      }
      if ($nextButton.hasClass("end-slide")) {
        $nextButton.removeClass("end-slide");
        $nextButton.find('.arrow').removeClass('disabled');
      }
    }
    if ($pageNavLink.length > 0) {
      $pageNavLink.removeClass('active');
      $pageNavLink.each(function(navIndex) {
        var carouselIndex = parseInt($(this).attr('data-carousel-index'));
        if (index === carouselIndex) {
          $(this).addClass('active');
        }
      });
    }
  }

  $carousel.on("select.flickity", onSlideEnd);
  $carousel.on("dragStart.flickity", onSlideEnd);
  // $carousel.on("settle.flickity", onSlideEnd);

  $("body").on("click", ".end-slide-previous", function () {
    $carousel.flickity("previous");
  });

  $('.search-button').on('click', function(){
    $(this).next().addClass('show');
  });

  var menuLinkFunction = function (event, $ele, $submenu) {
    if ($ele.parent().parent().hasClass('has-sub-menu') && $submenu.length > 0) {
      event.preventDefault();    
      if ($(window).width() < 992) {
        if ($submenu.find('.first-level-title').length == 0) {
          $submenu.prepend('<li class="first-level-title"><a href="javascript:void(0);">'+ $ele.text() +'</a></li>');
        }
      }
      if ($submenu.hasClass('open')) {
        if ( !$('.site-header').hasClass('hover-open')) {
          $submenu.removeClass('open');
          $ele.parent().removeClass('sub-menu-open'); 
        }
        // $('body').removeClass('mega-menu-open');
      } else {
        if (!$ele.hasClass('click-mobile')) {
          $('.menu-wrapper').find('ul.has-sub-menu').removeClass('open');
          $('.menu-wrapper').find('li').removeClass('sub-menu-open');
        }
        $submenu.addClass('open');
        setTimeout(function(){
          $submenu.addClass('open-once');
        }, 1000);
        $ele.parent().addClass('sub-menu-open');
        // $('body').addClass('mega-menu-open');
      }
    }
  }

  var hoverFunction = function () {
    var ww = $(window).width();
    if (ww > 992 ) {
      $('.first-level-title').remove();
      $('html,body').removeClass('mega-menu-open');
      $('.menu-wrapper > ul > li > a').on({
        mouseenter: function (e) {
          var $ele = $(this);
          var $submenu = $ele.parent().find('.has-sub-menu.sub-menu');
          menuLinkFunction(e, $ele,$submenu);
        },
        mouseleave: function (e) {
          var $ele = $(this);
          var $submenu = $ele.parent().find('.has-sub-menu.sub-menu');
          menuLinkFunction(e, $ele,$submenu);
        }
      });  
    } else {
      $('.menu-wrapper > ul > li').unbind('mouseenter', 'mouseleave');
    }
  };

  window.addEventListener('load', hoverFunction);
  window.addEventListener('resize', hoverFunction);

  var $menuClose = $('#menuToggle input');
  var $menuLink = $('.menu-wrapper ul li a');

  $menuLink.on('click', function (e) {
    var $ele = $(this);
    var $submenu = $ele.next();
    menuLinkFunction(e, $ele,$submenu);
  });

  $('.site-header').on({
    mouseenter: function(e){
      var target = $(this);
      target.addClass('hover-open');
    },
    mouseleave: function(e){
      var target = $(this);
      if (target.hasClass('hover-open')) {
        target.removeClass('hover-open');
        target.find('.menu-wrapper > ul > li').removeClass('sub-menu-open');
        target.find('.menu-wrapper > ul > li > ul').removeClass('open');
      }
    }
  });

  $('.menu-button').on('click', function(){
    if ($(this).hasClass('open')) {
      $(this).removeClass('open');
      $('html,body').removeClass('mega-menu-open');
    } else {
      $(this).addClass('open');
      $('html,body').addClass('mega-menu-open');
    }
  });
  

  $('.body-overlay').on('click', function(){
    $('.menu-wrapper').find('.sub-menu').removeClass('open');
    $('.menu-wrapper').find('li').removeClass('sub-menu-open');
    $('html,body').removeClass('mega-menu-open');
  });

  $('body').on('click', '.first-level-title a', function(){
    var $ele = $(this);
    $ele.parent().parent().removeClass('open');
    $ele.parent().siblings().removeClass('sub-menu-open');
    $ele.parent().siblings().find('.sub-menu').removeClass('open');
    $menuClose.css('z-index', '2');
  });

  $('.product-accordion .accordion-item').each(function() {
    $(this).children('.accordion-header#flush-heading-1').children('.accordion-button').removeClass('collapsed').attr('aria-expanded', 'true');
    $(this).children('.accordion-collapse#flush-collapse-1').addClass('show');
  });

  $('.qty-button').on('click', function() {

    var $button = $(this);
    var $qtyInput = $button.parent().find('.quantity');
    var oldValue = $qtyInput.val();

    if ($button.text() == "+") {
      var newValue = parseInt(oldValue) + 1;
    } else {
      if (oldValue > 1) {
        var newValue = parseInt(oldValue) - 1;
      } else {
        newValue = 1;
      }
    }

    $qtyInput.val(newValue);
    productQty = newValue;
    console.log(productQty);

  });

  $('.quantity').on('propertychange input', function(e) {
    var $input = $(this);
    var valueChanged = false;

    if (e.type=='propertychange') {
        valueChanged = e.originalEvent.propertyName=='value';
    } else {
        valueChanged = true;
    }
    if (valueChanged) {
      $input.val($input.val().replace(/[^0-9]/g, ''));
      $input.val($input.val().replace(/^(?:0+(?=[1-9])|0+(?=0$))/g, ''));
      if ($input.val() === '') {
        $input.val('1');
      }
    } 
  });


  var $loadMoreBtn = $('.load-more-button');
  var loadPerPage = parseInt($loadMoreBtn.attr('data-review-per-page'));
  var loadTotal = parseInt($loadMoreBtn.attr('data-review-total'));
  if ($loadMoreBtn.find('.load-more-remaining')) {
    $loadMoreBtn.find('.load-more-remaining').text(loadTotal - loadPerPage);
  };

  $('.load-more').slice(0, loadPerPage).show();
  $('.load-more-button').on('click', function(e){
    var $loadMoreHidden = $('.load-more:hidden');
    e.preventDefault();
    if ($loadMoreBtn.find('.load-more-remaining')) {
      $loadMoreBtn.find('.load-more-remaining').text($loadMoreHidden.length - loadPerPage);
    }
    $loadMoreHidden.slice(0, loadPerPage).slideDown();
    if($loadMoreHidden.length == loadPerPage) {
      $loadMoreBtn.parent().parent().remove();    
    }
  });

  $('.product-variant').each(function() {

    if ($(this).data('index') === 0) {
      $(this).addClass('active');
    }
    
    $(this).on('click', function () {
      const index = $(this).data('index');
      
      $(this).siblings().removeClass('active');
      $(this).addClass('active');
  
      $('.carousel-product').flickity('select', index);
    });
  });

  

  

  if ($.fn.isotope){
    $(window).on('load resize', function(){
      $('.product-masonry').isotope({
        itemSelector: '.grid-item',
        masonry: {
          columnWidth: '.grid-sizer',
          fitRows: true
        }
      });
    })
  }

  var hideSpinningButtonIcon = function () {
    $(this).find('.cta-button-text').css({opacity: 1.0});
    $(this).find('.cta-button-icon').css({opacity: 0.0});
  };

  var showSpinningButtonIcon = function (btn) {
    $(this).find('.cta-button-text').css({opacity: 0.0});
    $(this).find('.cta-button-icon').css({opacity: 1.0});
  };

  $('.cta-button').on('click', function () {
    showSpinningButtonIcon.call(this);
    setTimeout(hideSpinningButtonIcon.bind(this), 7000);
    $('.add-to-cart-section').addClass('open');
    $('.add-to-cart-section').css('z-index', '102');
    $('html,body').addClass('add-to-cart-open');
  });

  $('.add-to-cart-back').on('click', function() {
    $('.add-to-cart-section').removeClass('open');
    $('.add-to-cart-section').css('z-index', '102');
    setTimeout(function(){
      $('.add-to-cart-section').css('z-index', '-1');
    }, 500);
    $('html,body').removeClass('add-to-cart-open');
  });
  

  $('.select-text').on('change', function(){
    var target = $(this);
    if (target.val() == 'yes') {
      target.next('input').addClass('open');
    } else {
      target.next('input').removeClass('open').val('');
    }
  });

  if ($pageNavLink.length > 0) {
    var asideScrollTop = 0;
    var $pageBody = $('.page-body');
    var footerScrollTop = $('footer').offset().top;
    var $pageWrapper = $('.page-content-wrapper');
    var selectNavTop = 0;
    if ($('.page-navigation-wrapper').length > 0) {
      selectNavTop = $('.page-navigation-wrapper').offset().top;
    }

    if ($('.page-aside').length > 0) {
      asideScrollTop = $('.page-aside').offset().top;
    }

    $(window).on('scroll', function(e) {
      var windowScrollTop = $(this).scrollTop();
      if (windowScrollTop > asideScrollTop) {
        $pageBody.addClass('sticky');
        $pageWrapper.css('margin-left', '373px');
      } else {
        $pageBody.removeClass('sticky');
        $pageWrapper.css('margin-left', 0);
      }
      if (windowScrollTop > (footerScrollTop - 603)) {
        $pageBody.addClass('stick-to-end');
        $pageWrapper.css('margin-left', 0);
      } else {
        $pageBody.removeClass('stick-to-end');
      }

      if (windowScrollTop > selectNavTop) {
        $('.page-navigation-wrapper').addClass('sticky');
      } else {
        $('.page-navigation-wrapper').removeClass('sticky');
      }
    });

    }

    if ($pageNavLink.length > 0) {
      $pageNavLink
      .not('[href="#"]')
      .not('[href="#0"]')
      .on('click', function(e){
        $pageNavLink.removeClass('active');
        var target = $(this.hash);
        var carouselIndex = $(this).attr('data-carousel-index');
        e.preventDefault();
        if (target.length > 0) {
          $('html, body').animate({
            scrollTop: target.offset().top - 20
          }, 500);
        } else {
          if (carouselIndex) {
            $carousel.flickity('select', carouselIndex)
          }
        }
        $(this).addClass('active');
      });
      $('select.page-navigation').on('change', function() {
        var targetID = '' + $(this).val() + '';
        console.log(targetID);
        $('html, body').animate({
          scrollTop: $(targetID).offset().top - 125
        }, 500);
      })
    }

  // category slider button/hover 

  // $('.slide-button').hover(function(){
  //   $(this).find('.button-checkbox').prop('checked', true);
  // }, function(){
  //   $(this).find('.button-checkbox').prop('checked', false);
  // }).click(function(){
  //   $('.slide-button').unbind('mouseenter mouseleave');
  //   $(this).find('.button-checkbox').prop('checked', true);
  // });

  // create buttons on image map
  var $imageMap = $('img[usemap]');

  if ($.fn.rwdImageMaps) {
    var $categoryContainer = $('.category-banner');
    $imageMap.rwdImageMaps();

    function buttonHtml(area, resize) {
      var coords = area.attr('coords').split(',');
      var top = coords[1];
      var left = coords[0] - 32;
      var productName = area.attr('title');
      var position = area.attr('alt');
      var link = area.attr('href');
      top = top - 32;
      if ($(window).width() < 1900) {
        left = left - 32;
      }
      return '<div class="slide-button d-none d-lg-block ' + position + '" style="position: absolute;top:'+ top +'px;left:' + left + 'px;">' +
        '<input type="radio" name="slide-button" class="button-checkbox">' +
        '<div class="product-name-wrapper">' +
          '<div class="product-name-inner">' +
            '<a class="product-name text-capitalize" href="' + link + '">' + productName + '</a>' +
          '</div>' +
        '</div>' +
      '</div>';
    }

    $(window).on('load resize', function() {
      $categoryContainer.find('.slide-button').remove();
      var bgImage = $('.category-hero-image-wrapper img').attr('src');
      $categoryContainer.find('.category-hero-image-wrapper').css({
        'background-image' : 'url('+ bgImage +')',
        'background-repeat' : 'no-repeat',
        'background-size' : 'cover',
        'background-position' : 'center center'
      });
      setTimeout(function(){
        $imageMap.next('map').find('area').each(function(e) {
          $categoryContainer.append(buttonHtml($(this)));
        });
      }, 200);
    });
  }
});
