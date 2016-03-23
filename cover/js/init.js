(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    $('.carousel').carousel();
    $('.slider').slider({full_width: true});

     $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });

     $('.collapsible1').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });

    $('.materialboxed').materialbox();

     $('ul.tabs').tabs();

    var options = [
    {selector: '#staggered-test1', offset: 205, callback: 'Materialize.showStaggeredList("#staggered-test1")' },
    {selector: '#staggered-test', offset: 300, callback: 'Materialize.showStaggeredList("#staggered-test")' },
    {selector: '#staggered-test2', offset: 300, callback: 'Materialize.showStaggeredList("#staggered-test2")' }
  	
  	];
  Materialize.scrollFire(options);

  }); // end of document ready
})(jQuery); // end of jQuery name space