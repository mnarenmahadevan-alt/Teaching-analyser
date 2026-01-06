document.getElementById("quizForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let scores = {
    reading: 0,
    watching: 0,
    practicing: 0
  };

  const data = new FormData(this);

  for (let answer of data.values()) {
    if (scores[answer] !== undefined) {
      scores[answer]++;
    }
  }

  const total = scores.reading + scores.watching + scores.practicing;

  const readingPct = Math.round((scores.reading / total) * 100);
  const watchingPct = Math.round((scores.watching / total) * 100);
  const practicingPct = Math.round((scores.practicing / total) * 100);

  let primaryStyle = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );

  let tips = {
    reading: "Focus on books, notes, summaries, and revision.",
    watching: "Use videos, diagrams, and visual explanations.",
    practicing: "Learn by coding, solving problems, and hands-on work."
  };

  document.getElementById("result").innerHTML = `
    <h2>📊 Your Learning Profile</h2>
    <p><strong>Primary Learning Style:</strong> ${primaryStyle.toUpperCase()}</p>

    <p>📘 Reading: ${readingPct}%</p>
    <p>🎥 Watching: ${watchingPct}%</p>
    <p>🛠 Practicing: ${practicingPct}%</p>

    <h3>🎯 Personalized Tip</h3>
    <p>${tips[primaryStyle]}</p>
  `;

  document.getElementById("result").classList.remove("hidden");
});
