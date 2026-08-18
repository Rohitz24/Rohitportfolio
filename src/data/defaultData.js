export const initialPortfolioData = {
  hero: {
    status: "STATUS: AVAILABLE FOR OPPORTUNITIES",
    bioText: "Frontend Developer crafting scalable, user-centric web applications and elegant interface architectures."
  },
  about: {
    bio: "I am a Frontend Developer and MCA Graduate passionate about turning complex system requirements into intuitive, fluid digital experiences. Focused on clean architecture, modern React lifecycles, and high-performance Web APIs.",
    skills: "React.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Firebase, Redux Toolkit, REST APIs, Git/GitHub, Java",
    timeline: [
      {
        year: "2024 - 2026",
        role: "Master of Computer Applications (MCA)",
        institution: "PIRENS IBMA, Savitribai Phule Pune University",
        details: "Specialized in Web Application Architecture, Algorithms, and Software Engineering."
      },
      {
        year: "2019 - 2024",
        role: "Bachelor of Computer Applications (BCA)",
        institution: "Kamla Nehru Mahavidyalaya (RTMNU)",
        details: "Built foundations in Object-Oriented Programming, Database Systems, and UI Engineering."
      }
    ]
  },
  projects: [
    {
      id: 1,
      category: "Frontend",
      title: "Weather Intelligence Platform",
      exe: "weather_app.sh",
      img: "weathery.jpg",
      desc: "Real-time global weather tracking app fetching live meteorological data, humidity metrics, and multi-day forecasts via OpenWeather API.",
      details: "Engineered with asynchronous API fetching, dynamic DOM updates, query caching, and responsive glassmorphic cards.",
      github: "https://github.com/Rohitz24/weatherapp"
    },
    {
      id: 2,
      category: "Fullstack",
      title: "Minimalist Task Management App",
      exe: "todo_app.sh",
      img: "toddo.jpg",
      desc: "A productivity tool to organize, filter, and track daily development tasks with real-time state persistence.",
      details: "Features interactive status trackers, localStorage sync, priority tags, and keyboard shortcut operations.",
      github: "https://github.com/Rohitz24/to-do-list-app"
    },
    {
      id: 3,
      category: "Frontend",
      title: "Precision Arithmetic Engine",
      exe: "calc_app.sh",
      img: "calc.jpg",
      desc: "A clean, tactile arithmetic workspace built with modular JavaScript handling compound operations smoothly.",
      details: "Includes input validation, key binding support, error handling, and lightweight memory consumption.",
      github: "https://github.com/Rohitz24/calculator-app"
    }
  ]
};