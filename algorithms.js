function runFCFS(processes) {
  const procs = [...processes].sort((a, b) => a.arrival - b.arrival);
  let time = 0;
  const gantt = [];

  procs.forEach(p => {
    const start = Math.max(time, p.arrival);
    const end = start + p.burst;

    // Add CPU burst
    gantt.push({ id: p.id, start, end, type: "CPU" });
    time = end;

    // Simulate I/O burst if present
    if (p.ioBurst && p.ioBurst > 0) {
      const ioStart = time;
      const ioEnd = ioStart + p.ioBurst;
      gantt.push({ id: p.id, start: ioStart, end: ioEnd, type: "IO" });
      time = ioEnd;
    }
  });

  return gantt;
}



function runSJF(input) {
  const procs = [...input];
  const result = [];
  let time = 0;

  while (procs.length > 0) {
    const ready = procs.filter(p => p.arrival <= time);
    if (ready.length === 0) {
      time = Math.min(...procs.map(p => p.arrival));
      continue;
    }
    ready.sort((a, b) => a.burst - b.burst);
    const current = ready[0];

    const start = time;
    const end = start + current.burst;
    result.push({ id: current.id, start, end, type: "CPU" });

    time = end;

    if (current.ioBurst && !current.ioDone) {
      // Add I/O block simulation
      result.push({ id: current.id, start: time, end: time + current.ioBurst, type: "IO" });
      current.arrival = time + current.ioBurst;
      current.burst = current.remaining2 || 0;
      current.ioDone = true;
    } else {
      procs.splice(procs.indexOf(current), 1);
    }
  }
  return result;
}


function runPreemptivePriority(processes) {
  const procs = processes.map(p => ({ ...p, remaining: p.burst, ioDone: false }));
  const result = [];
  let time = 0;
  let lastProcessId = null;

  while (procs.some(p => p.remaining > 0 || (p.ioBurst && !p.ioDone))) {
    const ready = procs.filter(p => p.arrival <= time && p.remaining > 0);

    if (ready.length === 0) {
      time++;
      continue;
    }

    // Sort by priority (lower number = higher priority)
    ready.sort((a, b) => a.priority - b.priority);
    const current = ready[0];

    if (lastProcessId === current.id) {
      result[result.length - 1].end++;
    } else {
      result.push({ id: current.id, start: time, end: time + 1, type: "CPU" });
      lastProcessId = current.id;
    }

    current.remaining--;
    time++;

    // I/O burst handling
    if (current.remaining === 0 && current.ioBurst && !current.ioDone) {
      result.push({ id: current.id, start: time, end: time + current.ioBurst, type: "IO" });
      current.arrival = time + current.ioBurst;
      current.remaining = current.remaining2 || 0;
      current.ioDone = true;
      time = current.arrival;
    }
  }

  return result;
}





function runRR(input, quantum) {
  let queue = input.map(p => ({ ...p, remaining: p.burst, ioDone: false }));
  const gantt = [];
  let time = 0;
  const readyQueue = [];

  while (queue.length > 0 || readyQueue.length > 0) {
    // Enqueue new arrivals
    queue.filter(p => p.arrival <= time).forEach(p => readyQueue.push(p));
    queue = queue.filter(p => p.arrival > time);

    if (readyQueue.length === 0) {
      time++;
      continue;
    }

    const current = readyQueue.shift();
    const execTime = Math.min(current.remaining, quantum);
    gantt.push({ id: current.id, start: time, end: time + execTime, type: "CPU" });
    current.remaining -= execTime;
    time += execTime;

    
    queue.filter(p => p.arrival <= time).forEach(p => {
      if (!readyQueue.includes(p)) readyQueue.push(p);
    });
    queue = queue.filter(p => p.arrival > time);

    if (current.remaining === 0 && current.ioBurst && !current.ioDone) {
      gantt.push({ id: current.id, start: time, end: time + current.ioBurst, type: "IO" });
      current.arrival = time + current.ioBurst;
      current.remaining = current.remaining2 || 0;
      current.ioDone = true;
      queue.push(current);
    } else if (current.remaining > 0) {
      readyQueue.push(current);
    }
  }
  return gantt;
}

function runSRTF(processes) {
  const procs = processes.map(p => ({ ...p, remaining: p.burst, ioDone: false }));
  const gantt = [];
  let current = 0;
  let lastProcessId = null;

  while (procs.some(p => p.remaining > 0 || (p.ioBurst && !p.ioDone))) {
    const ready = procs.filter(p => p.arrival <= current && p.remaining > 0);

    if (ready.length === 0) {
      current++;
      continue;
    }

    ready.sort((a, b) => a.remaining - b.remaining);
    const currentProc = ready[0];

    if (lastProcessId === currentProc.id) {
      gantt[gantt.length - 1].end++;
    } else {
      gantt.push({ id: currentProc.id, start: current, end: current + 1, type: "CPU" });
      lastProcessId = currentProc.id;
    }

    currentProc.remaining--;
    current++;

    if (currentProc.remaining === 0 && currentProc.ioBurst && !currentProc.ioDone) {
      gantt.push({ id: currentProc.id, start: current, end: current + currentProc.ioBurst, type: "IO" });
      currentProc.arrival = current + currentProc.ioBurst;
      currentProc.remaining = currentProc.remaining2 || 0;
      currentProc.ioDone = true;
      current = currentProc.arrival;
    }
  }

  return gantt;
}

function runMLFQ(processes) {
  const queues = [[], [], []];
  const quantum = [4, 8, Infinity];
  const gantt = [];
  const procs = processes.map(p => ({ ...p, remaining: p.burst, level: 0, waiting: 0 }));
  let currentTime = 0;
  let lastProcessId = null;

  while (procs.some(p => p.remaining > 0)) {
    procs.forEach(p => {
      if (p.arrival <= currentTime && p.remaining > 0 && !queues.some(q => q.includes(p))) {
        queues[p.level].push(p);
      }
    });

    let currentQueue = queues.find(q => q.length > 0);
    if (!currentQueue) {
      currentTime++;
      continue;
    }

    const current = currentQueue.shift();
    const execTime = Math.min(current.remaining, quantum[current.level]);
    const start = currentTime;
    const end = start + execTime;

    gantt.push({ id: current.id, start, end, type: current.type === "io" ? "IO" : "CPU" });
    current.remaining -= execTime;
    currentTime = end;

    if (current.remaining > 0) {
      if (current.level < 2) current.level++;
      queues[current.level].push(current);
    } else if (current.ioBurst && !current.ioHandled) {
      const ioStart = currentTime;
      const ioEnd = ioStart + current.ioBurst;
      gantt.push({ id: current.id, start: ioStart, end: ioEnd, type: "IO" });
      currentTime = ioEnd;
      current.ioHandled = true;
    }
  }

  return gantt;
}

