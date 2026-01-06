document.getElementById("quizForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let score = { reading: 0, watching: 0, practicing: 0 };
  let data = new FormData(this);

  for (let value of data.values()) {
    score[value] += 2; // weighted logic
  }

  let total = score.reading + score.watching + score.practicing;

  let percent = {
    reading: Math.round((score.reading / total) * 100),
    watching: Math.round((score.watching / total) * 100),
    practicing: Math.round((score.practicing / total) * 100)
  };

  let sorted = Object.entries(percent).sort((a,b) => b[1]-a[1]);
  let primary = sorted[0][0];
  let secondary = sorted[1][0];

  localStorage.setItem("learningResult", JSON.stringify(percent));

  document.getElementById("resultSection").classList.remove("hidden");

  document.getElementById("summary").innerHTML = `
    <p><strong>Primary Style:</strong> ${primary.toUpperCase()}</p>
    <p><strong>Secondary Style:</strong> ${secondary.toUpperCase()}</p>
    <p>Recommended strategy: Combine <b>${primary}</b> with <b>${secondary}</b>.</p>
  `;

  new Chart(document.getElementById("resultChart"), {
    type: "bar",
    data: {
      labels: ["Reading", "Watching", "Practicing"],
      datasets: [{
        label: "Learning Preference %",
        data: [percent.reading, percent.watching, percent.practicing],
        backgroundColor: ["#667eea", "#48bb78", "#ed8936"]
      }]
    }
  });
});
