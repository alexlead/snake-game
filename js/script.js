$(function(){
    
    $(".side-nav-tab").click(function(){
       if($(this).parent().hasClass('open-panel')){
          $(this).parent().removeClass('open-panel'); 
       } else {
           $(this).parent().addClass('open-panel');
       }
        
    });
	
	
	$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
})
	
    
})