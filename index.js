$("[data-nav]").click(function(e) {
    e.preventDefault()

    const selector = $(e.currentTarget).attr('href')

    $([document.documentElement, document.body]).animate({
        scrollTop: $(selector).offset().top
    }, 1000);
});

$(document).ready(function(){
    if (window.innerWidth <= 768) {
        document.querySelector('[data-slide]').classList.add('owl-carousel')
        $(".owl-carousel").owlCarousel({
            autoWidth:true,
            items: 3,
            margin: 20,
            dots: true
        });
    }
});