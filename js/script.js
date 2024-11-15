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

$(document).on("mousedown", function (e) { //Disable the drag and drop of the pics
    e.preventDefault();
    isClicked = true;
});

let previousX = 0;
let flipped; // Variable for checking if the net is flipped
$(document).mousemove(function (e) { // function that is flipping the net + following the mouse
    const currentX = e.pageX;



    if (currentX > previousX) { // flipping the net
        $("#net").css("transform", "scaleX(-1)");
        flipped = true;

    } else {
        $("#net").css("transform", "scaleX(1)");
        flipped = false;
    }


    $("#net").css({ // following the mouse
        left: e.pageX - 60,
        top: e.pageY - 40
    });


    previousX = currentX;
});

$("#net").click(function () { //Animation for net when click

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
