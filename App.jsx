
import React, { useState } from "react";
import "./App.css";
// Header Component
function Header({ theme, toggleTheme }) {
    return (
        <header className="app-header">
            <div>
                <h2>🌿 Crafty Corner</h2>
                <p>Online Craft Store</p>
            </div>
            <div className="header-actions">
                <span>Welcome, <strong>Alex Vance</strong></span>
                <button className="theme-btn" onClick={toggleTheme}>
                    {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </button>
            </div>
        </header>
    );
}
// Statistics Card Component
function StatCard({ title, value, change, icon }) {
    return (
        <div className="stat-card">
            <div className="stat-header">
                <span className="stat-icon">{icon}</span>
                <span>{title}</span>
            </div>
            <div className="stat-body">
                <h2>{value}</h2>
                <span className="stat-change">{change}</span>
            </div>
        </div>
    );
}
// Category Component
function CategoryCard({ icon, title, description }) {
    return (
        <div className="category-card">
            <span className="category-icon">{icon}</span>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}
// Store Task List Component
function TaskList({ tasks, onToggleTask, onDeleteTask }) {
    return (
        <div className="task-container">
            <h3>Store Management Tasks</h3>
            <ul className="task-list">
                {tasks.length === 0 ? (
                    <li className="empty-state">
                        No tasks available.
                    </li>
                ) : (
                    tasks.map((task) => (
                        <li
                            key={task.id}
                            className={`task-item ${task.completed ? "completed" : ""}`}
                        >
                            <label>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => onToggleTask(task.id)}
                                />
                                <span>{task.title}</span>
                            </label>
                            <button
                                className="delete-btn"
                                onClick={() => onDeleteTask(task.id)}
                            >
                                ✕
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}
// Main Application Component
function App() {
    const [theme, setTheme] = useState("light");
    const [taskInput, setTaskInput] = useState("");
    const [tasks, setTasks] = useState([
        { id: 1, title: "Update handmade product collection", completed: true },
        { id: 2, title: "Prepare new craft materials", completed: false },
        { id: 3, title: "Pack customer orders", completed: false }
    ]);
    // Toggle Theme
    const toggleTheme = () => {
        setTheme((prev) =>
            prev === "light" ? "dark" : "light"
        );
    };
    // Add New Task
    const handleAddTask = (e) => {
        e.preventDefault();
        if (!taskInput.trim()) return;
        const newTask = {
            id: Date.now(),
            title: taskInput.trim(),
            completed: false
        };
        setTasks((prev) => [...prev, newTask]);
        setTaskInput("");
    };
    // Complete Task
    const handleToggleTask = (id) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );
    };
    // Delete Task
    const handleDeleteTask = (id) => {
        setTasks((prev) =>
            prev.filter((task) => task.id !== id)
        );
    };
    return (
        <div className={`app-root ${theme}`}>
            <Header
                theme={theme}
                toggleTheme={toggleTheme}
            />
            <main className="dashboard-content">
                <section className="welcome-section">
                    <h1>Welcome to Crafty Corner! 🎨</h1>
                    <p>
                        Manage your craft store and explore your business overview.
                    </p>
                </section>
                {/* Statistics Section */}
                <section className="stats-grid">
                    <StatCard
                        title="Total Products"
                        value="128"
                        change="↑ 12% this month"
                        icon="🧶"
                    />
                    <StatCard
                        title="Orders Received"
                        value="245"
                        change="↑ 8% this month"
                        icon="📦"
                    />
                    <StatCard
                        title="Total Revenue"
                        value="₹48,250"
                        change="↑ 14.2% this month"
                        icon="💰"
                    />
                </section>
                {/* Craft Categories */}
                <section className="categories-section">
                    <h2>Our Craft Categories</h2>
                    <div className="categories-grid">
                        <CategoryCard
                            icon="🎨"
                            title="Painting & Art"
                            description="Creative painting supplies and art materials."
                        />
                        <CategoryCard
                            icon="🧶"
                            title="Knitting & Sewing"
                            description="Yarns, fabrics and knitting accessories."
                        />
                        <CategoryCard
                            icon="🕯️"
                            title="Handmade Candles"
                            description="Beautiful decorative handmade candles."
                        />
                        <CategoryCard
                            icon="🏺"
                            title="Clay Crafts"
                            description="Unique clay decorations and pottery items."
                        />
                    </div>
                </section>
                {/* Task Management */}
                <section className="task-section">
                    <h2>Manage Your Store</h2>
                    <form className="task-form" onSubmit={handleAddTask}>
                        <input
                            type="text"
                            placeholder="Add a new store task..."
                            value={taskInput}
                            onChange={(e) => setTaskInput(e.target.value)}
                        />
                        <button type="submit">
                            + Add Task
                        </button>
                    </form>
                    <TaskList
                        tasks={tasks}
                        onToggleTask={handleToggleTask}
                        onDeleteTask={handleDeleteTask}
                    />
                </section>
            </main>
            <footer>
                © 2026 Crafty Corner | Handmade Happiness, Delivered with Love.
            </footer>
        </div>
    );
}
export default App;
