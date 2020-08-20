$(document).ready(function () {
  var wow = new WOW();
  wow.init();

  var carousel = $("#main-carousel");

  carousel.children().each(function (index) {
    $(this).attr("data-position", index);
  });

  carousel.owlCarousel({
    items: 5,
    rtl: true,
    margin: 10,
    loop: true,
    center: true,
  });

  $(document).on("click", ".owl-item>div", function () {
    var $speed = 300;
    carousel.trigger("to.owl.carousel", [$(this).data("position"), $speed]);
  });

  checkClasses();

  carousel.on("translated.owl.carousel", function (event) {
    checkClasses();
  });

  $(".mobile-bar").click(function () {
    $("nav").animate({ width: "250px" });
    $(".overlay").animate({ width: "100%" });
    $(".mobile-bar").css({ display: "none" });
  });

  $(".overlay").click(function () {
    $("nav").animate({ width: "0" });
    $(".overlay").animate({ width: "0" });
    $(".mobile-bar").css({ display: "block" });
  });

  $("#exampleModal").on("click", function (event) {
    $(this).toggleClass("show");
  });

  $("#contact-us-form").submit(function (e) {
    var isValid = true;
    var name = $("#fullName").val();
    var email = $("#email").val();
    var mobileNumber = $("#mobileNumber").val();
    var message = $("#message").val();

    $(".error").remove();

    if (name.length < 1) {
      $("#fullName").after('<span class="error">برجاء ادخال اسم الراسل</span>');
      isValid = false;
    }

    if (mobileNumber.length < 1) {
      $("#mobileNumber").after(
        '<span class="error">برجاء ادخال رقم الجوال</span>'
      );
      isValid = false;
    }

    if (
      (mobileNumber.length < 10 && mobileNumber.length > 1) ||
      mobileNumber.length > 10
    ) {
      $("#mobileNumber").after(
        '<span class="error">برجاء ادخال رقم جوال صحيح</span>'
      );
      isValid = false;
    }

    if (email.length < 1) {
      $("#email").after(
        '<span class="error">برجاء ادخال البريد الالكتروني</span>'
      );
      isValid = false;
    } else {
      var regEx = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
      var validEmail = regEx.test(email);
      if (!validEmail) {
        $("#email").after(
          '<span class="error">البريد الالكتروني غير صحيح</span>'
        );
        isValid = false;
      }
    }
    if (message.length < 10) {
      $("#message").after(
        '<span class="error">نص الرسالة يجب الا يقل عن عشر كلمات</span>'
      );
      isValid = false;
    }

    if (isValid == false) {
      e.preventDefault();
    }
  });
});

$(window).on("load", function () {
  $(".se-pre-con").fadeOut("slow");
});

function checkClasses() {
  var total = $("#main-carousel .owl-stage .owl-item.active").length;

  $("#main-carousel .owl-stage .owl-item").removeClass(
    "firstActiveItem secindActiveItem activeDev"
  );

  $("#main-carousel .owl-stage .owl-item.active").each(function (index) {
    if (index == total - 4) {
      $(this).addClass("activeDev");
    }
    if (index === 0 || (index === total - 1 && total > 1)) {
      $(this).addClass("firstActiveItem");
    }

    if (index === 1 || (index === total - 2 && total > 1)) {
      $(this).addClass("secindActiveItem");
    }
  });
}
