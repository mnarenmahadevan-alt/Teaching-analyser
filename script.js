document.getElementById("quizForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let scores = {
        reading: 0,
        watching: 0,
        practicing: 0
    };

    const answers = new FormData(this);

    for (let value of answers.values()) {
        scores[value]++;
    }

    let learningStyle = Object.keys(scores).reduce((a, b) =>
        scores[a] > scores[b] ? a : b
    );

    let tips = "";

    if (learningStyle === "reading") {
        tips = `
        📘 You learn best by READING.<br><br>
        ✔ Use textbooks & notes<br>
        ✔ Make summaries<br>
        ✔ Read aloud while studying
        `;
    } else if (learningStyle === "watching") {
        tips = `
        🎥 You learn best by WATCHING.<br><br>
        ✔ Learn from videos<br>
        ✔ Use diagrams & charts<br>
        ✔ Visual explanations help you
        `;
    } else {
        tips = `
        🛠 You learn best by PRACTICING.<br><br>
        ✔ Hands-on learning<br>
        ✔ Solve problems<br>
        ✔ Practice daily
        `;
    }

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `<h2>Your Learning Style</h2><p>${tips}</p>`;
    resultDiv.classList.remove("hidden");
});
