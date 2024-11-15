//MAKE THE MAGIC HAPPEN

$(document).ready(function() { // Add event listeners for mouse enter and mouse leave 
    $("#wateringcan").hover( 
        function() { 
            $(this).addClass("tilt"); 
        }, 
        function() { 
            $(this).removeClass("tilt"); 
        } 
    ); 
});