function initCursorLogic() {
  // Skip the custom cursor entirely on touch devices
  if (window.matchMedia("(hover: none), (pointer: coarse)").matches) {
    return;
  }

  let cursor = document.getElementById("cursor");

  const cursorWidth = cursor.offsetWidth;
  const cursorHeight = cursor.offsetHeight;

  document.addEventListener("mousemove", function (e) {
    cursor.style.top = e.pageY - cursorHeight / 2 + "px";
    cursor.style.left = e.pageX - cursorWidth / 2 + "px";
    targetX = e.pageX + xOffset;
    targetY = e.pageY + yOffset;
  });

  let targetX = 0,
    targetY = 0;
  let currentX = 0,
    currentY = 0;
  const easeFactor = 0.1;

  const cursorFollower = document.querySelector("#cursor_follower");

  // Set the offset values
  const xOffset = 0;
  const yOffset = -70;

  function animate() {
    // Calculate the distance between the current position and the target position
    let dx = targetX - currentX;
    let dy = targetY - currentY;

    // Move a fraction of the distance
    currentX += dx * easeFactor;
    currentY += dy * easeFactor;

    // Update the position of the cursor
    cursorFollower.style.transform = `translate(${currentX}px, ${currentY}px)`;

    // Request the next animation frame
    requestAnimationFrame(animate);
  }

  // Start the animation
  requestAnimationFrame(animate);

  // Update the target position on mousemove
  document.addEventListener("mousemove", (e) => {
    targetX = e.pageX + xOffset;
    targetY = e.pageY + yOffset;
  });
}

export default initCursorLogic;
