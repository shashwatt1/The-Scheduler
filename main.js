let processes = [];
let processId = 1;

function addProcess() {
  const arrival = Number(document.getElementById("arrivalTime").value);
  const burst = Number(document.getElementById("burstTime").value);
  const ioBurst = Number(document.getElementById("ioBurstTime").value) || 0; // New
  const priority = Number(document.getElementById("priority").value || 0);
  const type = document.getElementById("processType").value;

  if (isNaN(arrival) || isNaN(burst) || burst <= 0) {
    alert("Please enter valid arrival and CPU burst times.");
    return;
  }

  processes.push({
    id: processId++,
    arrival,
    burst,
    ioBurst,         // store I/O burst time
    remaining: burst,
    priority,
    type,
    ioBlocked: false
  });
  updateProcessList();
  clearInputs();
}


function updateProcessList() {
  const list = document.getElementById("processList");
  list.innerHTML = "";
  processes.forEach(p => {
    const item = document.createElement("li");
    item.textContent = `P${p.id} - Arrival: ${p.arrival}, Burst: ${p.burst}, Priority: ${p.priority},
     Type: ${p.type.toUpperCase()}`;

    list.appendChild(item);
  });
}

function clearInputs() {
  document.getElementById("arrivalTime").value = "";
  document.getElementById("burstTime").value = "";
  document.getElementById("priority").value = "";
}

function run() {
  const algo = document.getElementById("algorithm").value;
  const quantum = Number(document.getElementById("quantum").value) || 2;
  let gantt = [];

  switch (algo) {
    case "FCFS":
      gantt = runFCFS(processes);
      break;
    case "SJF":
      gantt = runSJF(processes);
      break;
    case "SRTF":
      gantt = runSRTF(processes);
      break;
    case "Priority":
      gantt = runPreemptivePriority(processes);
      break;
    case "RR":
      gantt = runRR(processes, quantum);
      break;
    case "MLFQ":
      gantt = runMLFQ(processes);
      break;
  }

  drawGantt(gantt);
  drawTimeline(gantt);
  drawLegend();
}

