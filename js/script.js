$(document).ready(function() {
    const $wateringCan = $("#wateringcan img"); // Select the image inside the watering can div
    const $waterdrops = $(".waterdrop");
    let animationIntervals = [];
    const canColors = [
       'images/wateringcan.png',
       'images/wateringcanblue.png',
       'images/wateringcangreen.png',
       'images/wateringcanyellow.png'
    ];
    let currentColorIndex = 0;

    // Start with hiding all waterdrops
    $waterdrops.hide();

    $wateringCan.click(function() {
        $(this).parent().toggleClass("tilt");
        
        if ($(this).parent().hasClass("tilt")) {
            // Add a small delay before starting the water animation
            setTimeout(startWaterAnimation, 500);
        } else {
            stopWaterAnimation();
            changeCanColor(); // Change color when untitled
        }
    });

    function startWaterAnimation() {
        // Ensure the can is still tilted before starting
        if (!$wateringCan.parent().hasClass("tilt")) return;

        // Reset all drops before starting new animation
        stopWaterAnimation();
        
        $waterdrops.each(function(index) {
            const $drop = $(this);
            animationIntervals[index] = setTimeout(function() {
                animateWaterdrop($drop);
            }, index * 500); // Stagger start times
        });
    }

    function stopWaterAnimation() {
        // Clear all timeouts
        animationIntervals.forEach(clearTimeout);
        animationIntervals = [];
        
        // Stop all animations and hide drops immediately
        $waterdrops.stop(true, true).hide();
    }

    function animateWaterdrop($drop) {
        if (!$wateringCan.parent().hasClass("tilt")) {
            $drop.hide();
            return;
        }

        const canRect = $wateringCan[0].getBoundingClientRect();
        
        const spoutOffsetFromRight = canRect.width * 0.9; 
        const spoutOffsetFromTop = canRect.height * 0.48; 

        // Add randomness to the starting position
        const randomOffsetX = Math.random() * 10 - 5;
        const randomOffsetY = Math.random() * 10 - 5; 

        const spoutX = canRect.right - spoutOffsetFromRight + randomOffsetX;
        const spoutY = canRect.top + spoutOffsetFromTop + randomOffsetY;

        const endPosition = $(window).height() + 50; 
        const duration = 2000 + Math.random() * 500; 

        $drop.css({
            left: spoutX,
            top: spoutY,
            display: 'block'
        }).animate({
            top: endPosition
        }, {
            duration: duration,
            easing: 'linear',
            complete: function() {
                if ($wateringCan.parent().hasClass("tilt")) {
                    animateWaterdrop($drop); 
                } else {
                    $drop.hide(); 
                }
            }
        });
    }

    function changeCanColor() {
        // Change to the next color image
        currentColorIndex = (currentColorIndex + 1) % canColors.length;
        $wateringCan.attr('src', canColors[currentColorIndex]); // Change image source
    }
});