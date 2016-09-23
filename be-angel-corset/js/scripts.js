$(function(){

});

// Меню

$(function(){
  $('.main-menu li').on('click', function(){
    location.href = $(this).children().attr('href');
    window.status = $(this).children().attr('href');
  });

  $('.basket').hover(function(){
      $('.basket-dropdown').fadeIn(200);
    },
    function(){
      $('.basket-dropdown').fadeOut(200);
    }
  );

  $('#nav-toggle').on('click', function(){
       $('.main-menu').toggle();
  });
});


//Яндекс.карта

$(function(){   
  var myMap;
	ymaps.ready(init);
  function init(){
    myMap = new ymaps.Map("YMapsID", {
      center: [55.682722, 37.679996],
      zoom: 16
    });

    var myPlacemark = new ymaps.Placemark([55.682722, 37.679996]);
    myMap.geoObjects.add(myPlacemark);
    myMap.controls.add('mapTools');
    myMap.controls.add('zoomControl');        
  };
});

// Модальное окно "Перезвоните нам"

$(function() {
  $('#callback').click(function () {    
    $('#overlay').fadeIn(400,
      function(){
        $('#modal-form') 
          .css('display', 'block')
          .animate({opacity: 1, top: '50%'}, 200);
    });
  });

  $('#modal-close, #overlay').click( function(){
    $('#modal-form')
      .animate({opacity: 0, top: '45%'}, 200,
        function(){
          $(this).css('display', 'none');
          $('#overlay').fadeOut(400);
        }
      );
  });
});


// Кнопки "Загрузить ещё"

$(function(){   
  var fabric = $('#catalog-fabric-section .item');
  hideItems(fabric, 9);

  $('#catalog-fabric-section .btn').on('click', function(){
    loadHiddenItems(fabric, 9)
  });

  var item = $('#catalog-section .item');
  hideItems(item, 9); 

  $('#load-more-items').on('click', function(){
    loadHiddenItems(item, 9)
  });

  var articles = $('#useful-information-section .article-preview');
  hideItems(articles, 6);

  $('#useful-information-section .btn').on('click', function(){
    loadHiddenItems(articles, 6)
  });

  function hideItems(selector, number) {    
    var total = 0;
    selector.each(function(){   
      total++;
      if (total > number) {
        $(this).addClass('hidden').hide();
      }
    });
  };

  function loadHiddenItems(selector, number) {
    var total = 0;
    selector.each(function(){
      if ($(this).hasClass('hidden')){
        $(this).slideToggle(600).removeClass('hidden');
        total++;
      }  
      if (total == number) {
      return false;
      }
    })
  };

});


// Слайдер в карточке товара

$(function(){
  var thumbs = $('#card-product-slider li');
  var imgThumb = $('#card-product-slider li > img');
  var width = $('#card-product-photo').width();

  $('<div id="wrapper" class="clearfix"></div>').appendTo('#card-product-photo').css({'position' : 'absolute', 'overflow' : 'hidden', 'width' : 'inherit', 'height' : 'inherit'});
  
  imgThumb.each(function(){
    $(this).clone().appendTo('#wrapper').addClass('img-big').css({'position' :'absolute', 'width': width, 'display' : 'none'});
  });

  var img = $('.img-big');

  img.first().show(); 

  thumbs.on('click', function(){
    active = $(this).index();
    img.not(active).fadeOut(500);
    img.eq(active).fadeIn(500);
  });

  $(window).resize(function(){ 
    $('#card-product-photo img').css('width', '100%')
  });

});


// Минимум и максимум цены в Каталоге

$(function() {
  $("#slider-range").slider({
    range: false,
    min: 5000,
    max: 30000,
    values: [5000, 30000],
    stop: function(event, ui) {
      jQuery("input#amount-min").val(jQuery("#slider-range").slider("values",0));
      jQuery("input#amount-max").val(jQuery("#slider-range").slider("values",1));
    },
    slide: function(event, ui){
      jQuery("input#amount-min").val(jQuery("#slider-range").slider("values",0));
      jQuery("input#amount-max").val(jQuery("#slider-range").slider("values",1));
    }
  });

  jQuery("input#amount-min").change(function(){
    var value1=jQuery("input#amount-min").val();
    var value2=jQuery("input#amount-max").val();

    if(parseInt(value1) > parseInt(value2)){
      value1 = value2;
      jQuery("input#amount-min").val(value1);
      jQuery("#slider-range").slider("values",0,value1);    
    }
  });

  jQuery("input#amount-max").change(function(){
    var value1=jQuery("input#amount-min").val();
    var value2=jQuery("input#amount-max").val();

    if (value2 > 1000) {
      value2 = 1000; jQuery("input#amount-max").val(1000)
    }

    if(parseInt(value1) > parseInt(value2)){
      value2 = value1;
      jQuery("input#amount-max").val(value2);
    }

    jQuery("#slider-range").slider("values",1,value2);

  });
})

// Промо-слайдер на главной странице

$(function() {
  var height = $('.main-image').height();
  $('#promo-slider').css('height', height);

  if ($(window).width() > 480) {
    promoSlide();
  };

  function promoSlide() {
    var image = $("#promo-slider img");
    var li = $("#promo-slider-controls li");
    var numSlides = image.length;
    var activeSlide = 0;
    var speed = 5000;
    var fade = 1000;
    var timer = setInterval(rotate, speed);

    image.not(activeSlide).hide();
    image.eq(activeSlide).show();

    function rotate() {
      activeSlide++;
      if (activeSlide == numSlides) {
        activeSlide = 0;
      }
      image.not(activeSlide).fadeOut(fade);
      image.eq(activeSlide).fadeIn(fade);
      li.not(activeSlide).removeClass('current');
      li.eq(activeSlide).addClass('current');
    };

    li.click(function() {
      clearInterval(timer);
      activeSlide = $(this).index() - 1;
      rotate();
      li.removeClass('current');
      $(this).addClass('current');
    });
  };

  $(window).resize(function(){ 
    height = $('.main-image').height();
    $('#promo-slider').css('height', height)
  });

});

// слайдер отзывов

$(function(){
  var reviews = $('.review'),
      activeSlide = 0,
      numberSlides = reviews.length,
      slider = $('#review-slider'),
      width = slider.outerWidth(),
      li = $('#review-slider-contols li'),
      speed = 5000;
      fade = 1000;
      timer = setInterval(rotateSlide, speed);

      reviews.css('width', width);
      slider.wrapInner('<div></div>');
      slider.children().css({'position' : 'absolute', 'width' : 'inherit', 'height' : 'inherit', 'overflow' : 'hidden'});
      reviews.hide().first().show();
      li.first().addClass('current');

  function rotateSlide(dir){
    (dir == 'back') ? activeSlide-- : activeSlide++;
    if (activeSlide == numberSlides) {
      activeSlide = 0;
    };
    reviews.not(activeSlide).fadeOut(fade);
    reviews.eq(activeSlide).fadeIn(fade);
    li.not(activeSlide).removeClass('current');
    li.eq(activeSlide).addClass('current');
  };

  $('#next-review').click(function(){
    clearInterval(timer);
    rotateSlide();
    li.removeClass('current');
    li.eq(activeSlide).addClass('current');
  });

  $('#prev-review').click(function(){
    clearInterval(timer);
    rotateSlide('back');
    li.removeClass('current');
    li.removeClass('current');
    li.eq(activeSlide).addClass('current');
  });

  li.click(function(){
    clearInterval(timer);
    activeSlide = $(this).index() - 1;
    rotateSlide();
  });

  $(window).resize(function(){ 
    width = slider.outerWidth();
    reviews = $('.review');
    reviews.css('width', width);  
    slider.children().css('width', width);    
   });

});


/* вариант 2 - карусель

$(function(){
  var reviews = $('.review'),
      activeSlide = 0,
      numberSlides = reviews.length,
      slider = $('#review-slider'),
      width = slider.outerWidth(),
      li = $('#review-slider-contols li');
   
  reviews.css('width', width);
  slider.wrapInner('<div></div>');
  slider.children().css({'position' : 'absolute', 'width' : 'inherit', 'height' : 'inherit', 'overflow' : 'hidden'}).wrapInner('<div id="review-wrapper" class="clearfix"></div>');

  var wrapper = $('#review-wrapper');
  wrapper.width(width * (numberSlides + 2)).css({'position' : 'absolute', 'left' : '0'});
    
  li.first().addClass('current');

  $('.review').first().clone().appendTo(wrapper);
  $('.review').eq(-2).clone().prependTo(wrapper);


  function rotate(dir) {
    if (dir === "forward") {
      wrapper.animate({'left': '-=' + width + 'px'}, 1000, function(){
        if (activeSlide === numberSlides) {
          wrapper.css('left', -width + 'px');
          activeSlide = 0;
          li.not(activeSlide).removeClass('current');
          li.eq(activeSlide).addClass('current'); 
          };    
      });
      activeSlide++; 
      li.not(activeSlide).removeClass('current');
      li.eq(activeSlide).addClass('current');  
      }         
      else if (dir === "back") {
        wrapper.animate({'left': '+=' + width + 'px'}, 1000, function(){
           if (activeSlide === -1) {
           wrapper.css('left', -width * numberSlides + 'px');
           activeSlide = numberSlides - 1;
           li.not(activeSlide).removeClass('current');
           li.eq(activeSlide).addClass('current'); 
          };         
     });
      activeSlide--; 
      li.not(activeSlide).removeClass('current');
      li.eq(activeSlide).addClass('current');       
      }
  };

  $('#next-review').click(function(){
    rotate('forward');
  });

  $('#prev-review').click(function(){
    rotate('back');
  });

  li.click(function(){
    var newActiveSlide = $(this).index();
    var distance = activeSlide - newActiveSlide;
    wrapper.animate({'left': '+=' + distance * width + 'px'}, 1000);
    activeSlide = newActiveSlide; 
    li.not(activeSlide).removeClass('current');
    li.eq(activeSlide).addClass('current');   
  });


  $(window).resize(function(){ 
    width = slider.outerWidth();
    reviews = $('.review');
    reviews.css('width', width);  
    slider.children().css('width', width);    
    wrapper.width(width * (numberSlides + 2));
    wrapper.css({'left': -activeSlide * width + 'px'});
  });

});

*/
