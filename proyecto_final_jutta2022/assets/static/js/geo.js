// document ready
$(function() {
    let counter = 0;
    let question = 1;
  
    $("#submit").on("click", function() {
      if ($("input.rightAnswer").is(":checked")) {
        counter = counter + 1;
        $(".counter").text(counter);
      }
  
      if ($("input").is(":checked")) {
        $(".currentQuestion").removeClass("currentQuestion");
        question = question + 1;
        $(`.card-${question}`).addClass("currentQuestion");
      }
  
      if ($("input#last").is(":checked")) {
        alert("You have completed the quiz");
        $("#submit").addClass("card");
        $(".resultPage").removeClass("card");
      }
    });
  
    $(".tryAgain").on("click", function() {
      $(".resultPage").addClass("card");
      $(".card-9").removeClass("currentQuestion");
      $(".card-1").addClass("currentQuestion");
      $("#submit").removeClass("card");
      $('input').each(function() {
         $(this).prop("checked", false);
      });
      question = 1;
      counter = 0;
      $(".counter").text(counter);
    });
  });
  