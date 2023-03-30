var jcco_carousel = (function(){

    let overflowWidth=0;
    let slideDistance="";
    let cardCount = document.querySelectorAll('.single-preview-card').length - 3;
    let hiddenCards = cardCount;
    let carouselHeight = document.querySelector('.carousel-preview-container');
    let distanceIncremented = 0;

    // Determine if left/right arrow navs are necesaary
    if(cardCount > 3){
        let arrowNav = document.querySelectorAll(".carousel-nav-style");
        arrowNav.forEach(function(item){
            item.style.display="block";
        })
    }
    
    // Debounce Carousel resize on Window Resize STARTS
    const debounce = (fn, delay)=>{
        let timeoutID;
        return function(...args){
            if(timeoutID){
                clearTimeout(timeoutID);
            }
            timeoutID = setTimeout(()=>{
                fn(...args);
            }, delay);
        };
    };
    
    window.addEventListener("resize", debounce(e =>{
        resizePreviewCarousel();
    },250))
    // /Debounce Carousel resize on Window Resize 
    
    
    function resizePreviewCarousel(){
        overflowWidth = $(".carousel-overflow-container").width();
    
        if(overflowWidth > 950){
            slideDistance = 390;
            carouselHeight.style.height="420px";
            carouselHeight.classList.remove("previewContainerRatio");
        }
    
        if(overflowWidth > 800 && overflowWidth < 950){
            slideDistance = 325;
            carouselHeight.style.height="380px";
            carouselHeight.classList.remove("previewContainerRatio");
        }

        if(overflowWidth < 768){
            slideDistance = overflowWidth;
            carouselHeight.classList.add("previewContainerRatio");
        }
        resetPostionToZero();
        resizePreviewCard();
    }


    function resetPostionToZero(){
        distanceIncremented = 0;
        cardCount = document.querySelectorAll('.single-preview-card').length - 3;
        $(".carousel-previewCard-nowrap-container").css("transition","margin-left .3s ease-out").css("margin-left",distanceIncremented+"px");
    }

  
    function resizePreviewCard(){  
        $('.single-preview-card').each(function(){
            $(this).css("width", (slideDistance)+"px")
        });    
    }
    resizePreviewCarousel(); // --> On Page Load

    
    ////////// On click Events STARTS
    
    $(".carousel-forward-btn").click(function(){
        cardCount--
        if(cardCount >= 0){
            distanceIncremented -= parseInt(slideDistance); 
            $(".carousel-previewCard-nowrap-container").css("transition","margin-left .3s ease-out").css("margin-left",distanceIncremented+"px");
        }
        if(cardCount < 0){
            cardCount = hiddenCards; 
            $(".carousel-previewCard-nowrap-container").css("transition","margin-left 1s ease-out").css("margin-left","0px");
            distanceIncremented = 0;
        }
    })
    
    $(".carousel-back-btn ").click(function(){
        cardCount++
        if(cardCount<=hiddenCards){
            distanceIncremented += parseInt(slideDistance); 
            $(".carousel-previewCard-nowrap-container").css("transition","margin-left .3s ease-out").css("margin-left",distanceIncremented+"px")
        }
        if(cardCount > hiddenCards){
          $(".carousel-previewCard-nowrap-container").css("transition","margin-left 1s ease-out").css("margin-left",((hiddenCards * slideDistance) * -1) +"px");
          cardCount = 0;
          distanceIncremented = ((hiddenCards * slideDistance) * -1);
        }
    })

    ////////// /On click Events STARTS

})();



