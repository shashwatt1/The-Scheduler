# 📊 Simplifying OS Process Scheduling for Learners Through Simulation

An interactive, educational tool built to help students understand and simulate key CPU scheduling algorithms through real-time visualizations. Developed as part of a B.Tech Operating Systems PBL project.

---

## 🚀 Features

- Real-time CPU scheduling simulation in the browser
- Dynamic process addition during runtime
- Gantt chart visualization (HTML + Canvas)
- Timeline visualization with detailed execution blocks
- Support for 6 classic scheduling algorithms:
  - FCFS (First Come First Serve)
  - SJF (Shortest Job First)
  - Priority Scheduling
  - Round Robin
  - SRTF (Shortest Remaining Time First)
  - MLFQ (Multilevel Feedback Queue)
- Clean and responsive user interface

---

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Visualization**: HTML5 Canvas, styled Gantt chart using `<div>` elements
- **No external libraries used** – built from scratch for learning clarity

---

## 🧩 File Structure

| File             | Description                                      |
|------------------|--------------------------------------------------|
| `index.html`     | Main structure, input controls, layout           |
| `main.js`        | Input validation, event handling, logic control  |
| `algorithms.js`  | Scheduling algorithms (FCFS, SJF, RR, etc.)      |
| `visualization.js` | Gantt chart and timeline rendering            |
| `style.css`      | Custom styles and layout                         |

---

## 🧪 Testing & Validation

| Test                                  | Status   | Description                                               |
|---------------------------------------|----------|-----------------------------------------------------------|
| Algorithm unit tests                  | ✅ Pass  | Output matches expected results for all algorithms        |
| GUI form validation                   | ✅ Pass  | Handles empty/invalid inputs                              |
| Edge case tests                       | 🔄 In Progress | Stress tests for burst time = 0, identical arrivals   |
| Gantt chart & timeline sync           | ✅ Pass  | Visuals correctly represent internal scheduling logic     |

---

## 📦 Project Status

| Task                                       | Status       |
|--------------------------------------------|--------------|
| FCFS, SJF, Round Robin                     | ✅ Completed  |
| Priority, SRTF, MLFQ                       | ✅ Completed  |
| Gantt + Canvas-based timeline              | ✅ Completed  |
| Dynamic process addition                   | ✅ Completed  |
| Export simulation to CSV                   | 🔄 Pending    |
| Final styling & reset button               | 🔄 Pending    |
| Tooltip/help guide for users               | 🔄 Pending    |

---

## 👨‍💻 Team - The Scheduler Squad

- **Ratnesh Rawat** – Team Lead | `ratnesh2310636@gmail.com`
- **Anmol Rawat** | `rawatanmol88@gmail.com`
- **Shiv Khurana** | `shivkhurana31@gmail.com`
- **Shashwat Malviya** | `shashwat.malviya123@gmail.com`

---

## 📈 Progress Overview

- ✅ 80–85% features completed
- 🔄 Remaining: Export results, final styling, help documentation
- ✅ Ahead of schedule: MLFQ logic, timeline rendering
- 🔄 Behind: Export & final UI polish

---

## 🔒 Repository

> 🔐 This project is currently in a **private repository**. Public release coming soon.

---

## 📌 License

This project is for **educational purposes only** under university guidelines. No commercial use permitted without prior permission.

---
