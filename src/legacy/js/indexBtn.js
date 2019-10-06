var btns = document.querySelectorAll("#indexJoin-btn > button");
[].forEach.call(btns, box => {
  box.addEventListener("mousemove", e => {
    document.body.style.setProperty(
      "--bg-color",
      box.style.getPropertyValue("--color")
    );

    var size = parseInt(getComputedStyle(box).width);

    // scaling
    var x = size * 0.3 * 0.7 + 0.7 * e.offsetX;
    var y = size * 0.3 * 0.7 + 0.7 * e.offsetY;

    box.style.setProperty("--x", x);
    box.style.setProperty("--y", y);
    box.style.setProperty("--size", size);
  });
});
