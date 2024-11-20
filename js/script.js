$(document).ready(function () {
  // Add event listeners for mouse enter and mouse leave
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
  //Disable the drag and drop of the pics
  e.preventDefault();
  isClicked = true;
});

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

$("#net").click(function () {
  //Animation for net when click
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

// Aga - butterfly start
$(document).ready(function () {
  let globalSpeedModifier = 2000; // Initial speed in milliseconds
  const fastSpeed = 500; // Speed when mouse is moving (milliseconds per transition)
  const normalSpeed = 2000; // Speed when mouse is still
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
  $(document).mousemove(function () {
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

//Ash
