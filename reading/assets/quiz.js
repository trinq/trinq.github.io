// Quiz widget. Each answer must be the same number of words (and ideally
// characters) — that is enforced by the lesson author, not this script.
// The script only handles: which option the user picked, and reveal the
// per-option feedback block, which lives inside the <li>.

(function () {
  document.querySelectorAll(".quiz").forEach(function (quiz) {
    var options = quiz.querySelectorAll(".quiz-options input[type=radio]");
    var name = quiz.dataset.name || ("q-" + Math.random().toString(36).slice(2, 8));
    options.forEach(function (input) { input.name = name; });

    options.forEach(function (input) {
      input.addEventListener("change", function () {
        // Hide all feedback for this question
        quiz.querySelectorAll(".quiz-feedback").forEach(function (fb) {
          fb.classList.remove("correct", "wrong");
        });
        // Show the feedback for the chosen option
        var li = input.closest("li");
        var fb = li.querySelector(".quiz-feedback");
        if (!fb) return;
        if (input.dataset.correct === "true") {
          fb.classList.add("correct");
          fb.textContent = fb.dataset.correctText || "Correct.";
        } else {
          fb.classList.add("wrong");
          fb.textContent = fb.dataset.wrongText || "Not quite — re-read the prompt above.";
        }
      });
    });
  });

  // Reveal buttons — used for "answers that shouldn't be hinted at by formatting"
  document.querySelectorAll("button.reveal-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var targetId = btn.dataset.target;
      var target = document.getElementById(targetId);
      if (!target) return;
      target.classList.add("shown");
      btn.disabled = true;
      btn.textContent = "shown";
    });
  });
})();
