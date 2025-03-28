# Sudoku Solver

This is a simple **Sudoku Solver** built using **React.js**. The application allows users to input a Sudoku puzzle, validate it, and solve it step by step with adjustable speed. It utilizes the **Backtracking Algorithm** for solving the Sudoku board.

## Features
- Interactive **9x9 Sudoku grid** with input validation
- **Step-by-step visualization** of the solving process
- **Adjustable solving speed** using a slider
- Ability to **stop and reset** the Sudoku solving process
- **Checks for valid Sudoku input** before solving

## Technologies Used
- **React.js** (Hooks: `useState`, `useRef`)
- **JavaScript (ES6)**
- **CSS** for styling

## Installation & Usage

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/sudoku-solver.git
cd sudoku-solver
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Application
```bash
npm start
```

The application will be available at `http://localhost:3000/`.

## Project Structure
```
├── src
│   ├── App.js          # Main React component
│   ├── styles.css      # Styling file
│   ├── index.js        # Entry point
│   ├── Display.js      # Sudoku board UI component
│   └── utils.js        # Contains Sudoku solving logic
└── README.md          # Project documentation
```

## How It Works
1. **Input a Sudoku puzzle** by filling the grid.
2. Click **Solve Sudoku**, and the board will be solved step by step.
3. Adjust the solving **speed** using the slider.
4. Click **Stop Solving** to pause the process.
5. Click **Reset Board** to clear the grid.

## Contributing
Feel free to contribute by creating an issue or submitting a pull request. Any enhancements, bug fixes, or performance improvements are welcome!

## License
This project is **MIT Licensed**. You are free to use, modify, and distribute it as per the license terms.

---
**Made with ❤️ using React.js**