// $(document).ready(function () {
//   // Add event listeners for mouse enter and mouse leave
//   $("#wateringcan").hover(
//     function () {
//       $(this).addClass("tilt");
//     },
//     function () {
//       $(this).removeClass("tilt");
//     }
//   );
// });

//Samuel Net Start

// $(document).on("mousedown", function (e) {
//   //Disable the drag and drop of the pics
//   e.preventDefault();
//   isClicked = true;
// });

let previousX = 0;
let flipped; // Variable for checking if the net is flipped
$(document).mousemove(function (e) {
  // function that is flipping the net + following the mouse
  const currentX = e.pageX;

  if (currentX > previousX) {
    // flipping the net
    $("#net").css("transform", "scaleX(-1)");
    flipped = true;
  } else {
    $("#net").css("transform", "scaleX(1)");
    flipped = false;
  }

  $("#net").css({
    // following the mouse
    left: e.pageX - 60,
    top: e.pageY - 40,
  });

  previousX = currentX;
});

$(document).click(function () {
  //Animation for net when click
  if (flipped === false) {
    $("#net").addClass("rotate");

    setTimeout(() => {
      $("#net").removeClass("rotate");
    }, 1000);
  }
  if (flipped === true) {
    $("#net").addClass("rotateFlipped");

    setTimeout(() => {
      $("#net").removeClass("rotateFlipped");
    }, 1000);
  }
});
//Samuel Net End

// Aga - butterfly start
$(document).ready(function () {
  let globalSpeedModifier = 2000; // Initial speed in milliseconds
  const fastSpeed = 100; // Speed when mouse is moving (milliseconds per transition)
  const normalSpeed = 3000; // Speed when mouse is still
  let mouseMoving = false; // Tracks mouse movement
  let globalAngle = 0; // Initial angle for rotation

  function makeNewPosition() {
    // Generate a new random position within the viewport
    const h = $(window).height() - 50;
    const w = $(window).width() - 50;

    const nh = Math.floor(Math.random() * h);
    const nw = Math.floor(Math.random() * w);

    return [nh, nw];
  }

  function animateButterfly() {
    const newq = makeNewPosition();
    const oldq = $("#butterfly").offset();

    const angle = calculateAngle([oldq.top, oldq.left], newq);
    globalAngle = angle;

    $("#butterfly")
      .animate(
        { top: newq[0], left: newq[1] },
        globalSpeedModifier,
        "linear",
        animateButterfly // Recursively call itself for continuous movement
      )
      .css("transform", `rotate(${angle + 90}deg)`);
  }

  // butterfly wobble effect
  function applyWobblyEffect() {
    setInterval(function () {
      const randomWobble = (Math.random() - 0.5) * 30;
      const newAngle = globalAngle + randomWobble;

      $("#wobbly-butterfly").css("transform", `rotate(${newAngle}deg)`);
    }, 300);
  }

  function calculateAngle(prev, next) {
    const dx = next[1] - prev[1];
    const dy = next[0] - prev[0];
    const radians = Math.atan2(dy, dx);
    const degrees = radians * (180 / Math.PI);
    return degrees;
  }

  // Mouse movement detection
  $("#butterfly").hover(function () {
    if (mouseMoving) {
      return;
    }
    mouseMoving = true;
    $("#butterfly").stop();
    globalSpeedModifier = fastSpeed;
    animateButterfly();

    // Timer to detect when the mouse stops moving
    clearTimeout($.data(this, "mouseStopTimer"));
    $.data(
      this,
      "mouseStopTimer",
      setTimeout(function () {
        mouseMoving = false;
        globalSpeedModifier = normalSpeed;
      }, 200)
    );
  });

  // Start the animation
  applyWobblyEffect();
  animateButterfly();
});

$(document).ready(function () {
  //Ash
  var trialOffset = $(".trial").offset();
  var bodyWidth = $(".trial").width();
  var bodyHeight = $(".trial").height();

  function placeAppleRandomly(appleId) {
    var randPosX = Math.floor(Math.random() * bodyWidth);
    var randPosY = Math.floor(Math.random() * bodyHeight);

    $(appleId).css({
      position: "absolute",
      left: trialOffset.left + randPosX + "px",
      top: trialOffset.top + randPosY + "px",
    });
  }

  placeAppleRandomly("#apple1");
  placeAppleRandomly("#apple2");
  placeAppleRandomly("#apple3");

  var basketOffsets = [
    { offsetX: -50, offsetY: 30 },
    { offsetX: 50, offsetY: 20 },
    { offsetX: 0, offsetY: 40 },
  ];

  function moveToBasket(appleId, index) {
    var basketOffset = $(".basket").offset();
    var basketCenterX = basketOffset.left + $(".basket").width() / 2;
    var basketCenterY = basketOffset.top + $(".basket").height() / 2;

    var appleOffsetX = basketOffsets[index].offsetX;
    var appleOffsetY = basketOffsets[index].offsetY;
    $(appleId).animate(
      {
        left: basketCenterX - $(appleId).width() / 2 + appleOffsetX + "px",
        top: basketCenterY - $(appleId).height() / 2 + appleOffsetY + "px",
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

  $("#apple1").on("click", function () {
    moveToBasket("#apple1", 0);
  });

  $("#apple2").on("click", function () {
    moveToBasket("#apple2", 1);
  });

  $("#apple3").on("click", function () {
    moveToBasket("#apple3", 2);
  });
});
//Ash - apples end

// Willem - watering can start
$(document).ready(function () {
  const $wateringCan = $("#wateringcan img"); // Select the image inside the watering can div
  const $waterdrops = $(".waterdrop");
  let animationIntervals = [];
  const canColors = [
    "images/wateringcan.png",
    "images/wateringcanblue.png",
    "images/wateringcangreen.png",
    "images/wateringcanyellow.png",
  ];
  let currentColorIndex = 0;

  // Start with hiding all waterdrops
  $waterdrops.hide();

  $wateringCan.click(function () {
    $(this).parent().toggleClass("tilt");

    if ($(this).parent().hasClass("tilt")) {
      // Add a small delay before starting the water animation
      setTimeout(startWaterAnimation, 100);
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

    $waterdrops.each(function (index) {
      const $drop = $(this);
      animationIntervals[index] = setTimeout(function () {
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

    $drop
      .css({
        left: spoutX,
        top: spoutY,
        display: "block",
      })
      .animate(
        {
          top: endPosition,
        },
        {
          duration: duration,
          easing: "linear",
          complete: function () {
            if ($wateringCan.parent().hasClass("tilt")) {
              animateWaterdrop($drop);
            } else {
              $drop.hide();
            }
          },
        }
      );
  }

  function changeCanColor() {
    // Change to the next color image
    currentColorIndex = (currentColorIndex + 1) % canColors.length;
    $wateringCan.attr("src", canColors[currentColorIndex]); // Change image source
  }
});
