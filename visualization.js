function drawGantt(gantt) {
  const chart = document.getElementById("ganttChart");
  const output = document.getElementById("output");
  chart.innerHTML = "";
  output.innerHTML = "<b>Timeline:</b> " + gantt.map(g => `P${g.id}(${g.start}-${g.end})`).join(" | ");

  gantt.forEach(block => {
    const div = document.createElement("div");
    div.className = "block";

    // Set color based on type
    div.style.backgroundColor = block.type === "IO" ? "#4CAF50" : "#2196F3"; // green for I/O, blue for CPU
    div.style.whiteSpace = "pre-line"; // allow line break

    div.textContent = `P${block.id}\n${block.start}-${block.end}`;
    chart.appendChild(div);

    gantt.forEach(block => {
  console.log(block.id, block.type);  // Check if type is present
  // ...rest of your drawing code
});
  });
}


function drawTimeline(gantt) {
  const canvas = document.getElementById("timelineGraph");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const barHeight = 30;
  const scale = 20;
  let x = 10;

  gantt.forEach(g => {
    const width = (g.end - g.start) * scale;
    ctx.fillStyle = g.type === "IO" ? "#34c759" : "#0073e6"; // Green for IO, Blue for CPU
    ctx.fillRect(x, 80, width, barHeight);
    ctx.fillStyle = "#fff";
    ctx.fillText(`P${g.id}`, x + 5, 100);
    ctx.fillStyle = "#000";
    ctx.fillText(`${g.start}`, x, 120);
    x += width;
  });

  ctx.fillText(`${gantt[gantt.length - 1].end}`, x, 120);
}
function drawLegend() {
  const legend = document.getElementById("legend");
  legend.innerHTML = `
    <strong>Legend:</strong>
    <div style="display: inline-block; margin-right: 20px;">
      <div style="width: 20px; height: 20px; background-color: #0073e6; display: inline-block; margin-right: 5px;"></div>
      CPU-Bound Process
    </div>
    <div style="display: inline-block;">
      <div style="width: 20px; height: 20px; background-color: #34c759; display: inline-block; margin-right: 5px;"></div>
      I/O-Bound Process
    </div>
  `;
}
