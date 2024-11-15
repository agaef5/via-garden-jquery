//MAKE THE MAGIC HAPPEN

$(document).ready(function () { // Add event listeners for mouse enter and mouse leave 
    $("#wateringcan").hover(
        function () {
            $(this).addClass("tilt");
        },
        function () {
            $(this).removeClass("tilt");
        }
    );
});


//Samuel Net Start

$(document).on("mousedown", function (e) {
    e.preventDefault(); // Prevent the default drag behavior
    isClicked = true;   // Set the flag to true when the image is clicked
});

let previousX = 0;
let flipped;
$(document).mousemove(function (e) {
    const currentX = e.pageX;



    if (currentX > previousX) {
        $("#net").css("transform", "scaleX(-1)");
        flipped = true;

    } else {
        $("#net").css("transform", "scaleX(1)");
        flipped = false;
    }


    $("#net").css({
        left: e.pageX - 60,
        top: e.pageY - 40
    });


    previousX = currentX;
});

$("#net").click(function () {

    if (flipped === false) {
        $(this).addClass("rotate");


        setTimeout(() => {
            $(this).removeClass("rotate");
        }, 1000);
    }
    if (flipped === true) {
        $(this).addClass("rotateFlipped");


        setTimeout(() => {
            $(this).removeClass("rotateFlipped");
        }, 1000);
    }
});
//Samuel Net End
