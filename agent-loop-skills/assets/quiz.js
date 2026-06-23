// Quiz widget
(function () {
  document.querySelectorAll(".quiz").forEach(function (quiz) {
    var options = quiz.querySelectorAll(".quiz-options input[type=radio]");
    var name = quiz.dataset.name || ("q-" + Math.random().toString(36).slice(2, 8));
    options.forEach(function (input) { input.name = name; });

    options.forEach(function (input) {
      input.addEventListener("change", function () {
        quiz.querySelectorAll(".quiz-feedback").forEach(function (fb) {
          fb.classList.remove("correct", "wrong");
        });
        var li = input.closest("li");
        var fb = li.querySelector(".quiz-feedback");
        if (!fb) return;
        if (input.dataset.correct === "true") {
          fb.classList.add("correct");
          fb.textContent = fb.dataset.correctText || "Chinh xac.";
        } else {
          fb.classList.add("wrong");
          fb.textContent = fb.dataset.wrongText || "Chua dung — doc lai phan phia tren.";
        }
      });
    });
  });
})();
