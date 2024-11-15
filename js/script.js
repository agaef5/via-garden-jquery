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


$(".apple").hover(function () {
    alert("You entered p1!");
},
    function () {
        alert("Bye! You now leave p1!");
    });

$(".apple").click(function () {
    $(this).hide();
});