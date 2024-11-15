$(document).ready(function () {
  let globalSpeedModifier = 2000; // Initial speed in milliseconds
  const fastSpeed = 500; // Speed when mouse is moving (milliseconds per transition)
  const normalSpeed = 2000; // Speed when mouse is still
  let mouseMoving = false; // Tracks mouse movement
  let globalAngle = 0; // Initial angle for rotation

  //   $("#wobbly-butterfly").

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

  function applyWobblyEffect(left) {
    setInterval(function () {
      const randomWobble = (Math.random() - 0.5) * 30;
      const newAngle = globalAngle + randomWobble;

      $("#wobbly-butterfly").css("transform", `rotate(${newAngle}deg)`);
    }, 300);
  }

  function calculateAngle(prev, next) {
    const dx = next[1] - prev[1]; // Horizontal distance
    const dy = next[0] - prev[0]; // Vertical distance
    const radians = Math.atan2(dy, dx); // Angle in radians
    const degrees = radians * (180 / Math.PI); // Convert to degrees
    return degrees; // Return angle in degrees
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

    // Increase speed on mouse movement

    // Timer to detect when the mouse stops moving
    clearTimeout($.data(this, "mouseStopTimer"));
    $.data(
      this,
      "mouseStopTimer",
      setTimeout(function () {
        mouseMoving = false;
        globalSpeedModifier = normalSpeed;
      }, 200) // Adjust time for detecting mouse stop
    );
  });

  // Start the animation
  applyWobblyEffect(true);
  animateButterfly();
});
