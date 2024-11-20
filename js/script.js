


$(document).ready(function () {

    //Ash
    var trialOffset = $('.trial').offset();
    var bodyWidth = $('.trial').width();
    var bodyHeight = $('.trial').height();

    function placeAppleRandomly(appleId) {
        var randPosX = Math.floor(Math.random() * bodyWidth);
        var randPosY = Math.floor(Math.random() * bodyHeight);

        $(appleId).css({
            position: 'absolute',
            left: trialOffset.left + randPosX + 'px',
            top: trialOffset.top + randPosY + 'px'
        });
    }

    placeAppleRandomly('#apple1');
    placeAppleRandomly('#apple2');
    placeAppleRandomly('#apple3');

    var basketOffsets = [
        { offsetX: -50, offsetY: 30 },
        { offsetX: 50, offsetY: 20 },
        { offsetX: 0, offsetY: 40 }
    ];

    function moveToBasket(appleId, index) {
        var basketOffset = $('.basket').offset();
        var basketCenterX = basketOffset.left + $('.basket').width() / 2;
        var basketCenterY = basketOffset.top + $('.basket').height() / 2;

        var appleOffsetX = basketOffsets[index].offsetX;
        var appleOffsetY = basketOffsets[index].offsetY;
        $(appleId).animate(
            {
                left: basketCenterX - $(appleId).width() / 2 + appleOffsetX + 'px',
                top: basketCenterY - $(appleId).height() / 2 + appleOffsetY + 'px'
            },
            2000,
            function () {
                $(appleId).addClass("in-basket");
                checkAllApplesInBasket();
            }
        );
    }

    function checkAllApplesInBasket() {
        if (
            $("#apple1").hasClass("in-basket") &&
            $("#apple2").hasClass("in-basket") &&
            $("#apple3").hasClass("in-basket")
        ) {
            formCircle();
        }
    }

    function formCircle() {
        var heartCoords = [
            { left: "50%", top: "30%" },
            { left: "45%", top: "35%" },
            { left: "55%", top: "35%" },
        ];

        $(".apple").each(function (index) {
            $(this).animate(heartCoords[index], 2000, function () {
                if (index === 2) spinApples();
            });
        });
    }

    function spinApples() {
        var positions = [
            { left: "50%", top: "30%" },
            { left: "45%", top: "35%" },
            { left: "55%", top: "35%" },
        ];

        var newOrder = [1, 2, 0];
        $(".apple").each(function (index) {
            var $apple = $(this);
            var nextIndex = newOrder[index];
            $apple.animate(positions[nextIndex], 2000, function () {
                if (index === 2) dropAndFadeOut();
            });
        });
    }

    function dropAndFadeOut() {
        $(".apple").each(function () {
            var $apple = $(this);
            $apple.animate(
                {
                    top: $(window).height() + "px",
                    opacity: 0,
                },
                2000,
                function () {
                    $apple.remove();
                }
            );
        });
    }

    $('#apple1').on('click', function () {
        moveToBasket('#apple1', 0);
    });

    $('#apple2').on('click', function () {
        moveToBasket('#apple2', 1);
    });

    $('#apple3').on('click', function () {
        moveToBasket('#apple3', 2);
    });
})


//Ash