import { SwapForm, ThemeToggle } from "./components";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen min-w-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4 transition-colors duration-300 flex justify-center items-center">
        <ThemeToggle />
        <SwapForm />
      </div>
    </ThemeProvider>
  );
}

export default App;
