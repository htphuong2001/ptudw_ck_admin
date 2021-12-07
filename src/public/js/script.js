$(document).ready(function () {
  $(".sub-btn").click(function () {
    $(this).next(".sub-menu").slideToggle();
    $(this).find(".dropdown").toggleClass("rotate");
  });

  $("#open-sidebar").click(function () {
    $(".sidebar").addClass("active");
    $(".main-page").addClass("active");
  });

  $("#close-sidebar").click(function () {
    $(".sidebar").removeClass("active");
    $(".main-page").removeClass("active");
  });
});
