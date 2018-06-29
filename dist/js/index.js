$(document).ready(function () {
  $(".burger__icon").click(dropMenu);
  $('.li a').click(hideMenu)
});

function dropMenu() {
  $(".burger__menu").slideToggle("slow").css("display", "block");
}

function hideMenu() {
  $('.item').slideUp(400);
}