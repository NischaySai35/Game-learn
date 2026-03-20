const courses = [
  {
    title: "React Fundamentals",
    description: "Learn the basics of React including components and state.",
    difficulty: "Beginner",
    lessons: 10,
    role: ["Frontend Developer", "UI/UX Designer"],
    category: "Frontend",
    topics: [
      { title: "JSX" },
      { title: "Components" },
      { title: "Props & State" }
    ]
  },
  {
    title: "JavaScript Fundamentals",
    description: "Core JavaScript concepts for web development.",
    difficulty: "Beginner",
    lessons: 12,
    role: ["Frontend Developer", "UI/UX Designer", "Backend Developer", "Web Developer"],
    category: "Programming",
    topics: [
      { title: "Variables" },
      { title: "Functions" },
      { title: "DOM Manipulation" }
    ]
  },
  {
    title: "Data Structures & Algorithms",
    description: "Learn essential DSA concepts for problem solving.",
    difficulty: "Intermediate",
    lessons: 15,
    role: ["Software Engineer","Web Developer"],
    category: "DSA",
    topics: [
      { title: "Arrays" },
      { title: "Linked Lists" },
      { title: "Sorting Algorithms" }
    ]
  },
  {
    title: "Machine Learning Basics",
    description: "Introduction to machine learning concepts.",
    difficulty: "Intermediate",
    lessons: 14,
    role: ["AI Engineer", "Data Scientist"],
    category: "AI",
    topics: [
      { title: "Supervised Learning" },
      { title: "Regression" },
      { title: "Classification" }
    ]
  },
  {
    title: "Advanced CSS & Design",
    description: "Master layouts and animations in CSS.",
    difficulty: "Intermediate",
    lessons: 10,
    role: ["Frontend Developer", "UI/UX Designer"],
    category: "Frontend",
    topics: [
      { title: "Flexbox" },
      { title: "Grid" },
      { title: "Animations" }
    ]
  },
  {
    title: "Node.js & Express",
    description: "Build backend applications using Node.js.",
    difficulty: "Intermediate",
    lessons: 12,
    role: ["Backend Developer", "Web Developer"],
    category: "Backend",
    topics: [
      { title: "Express Setup" },
      { title: "Routing" },
      { title: "Middleware" }
    ]
  },
  {
    title: "Database Design",
    description: "Learn how to design efficient databases.",
    difficulty: "Intermediate",
    lessons: 10,
    role: ["Backend Developer", "Web Developer"],
    category: "Database",
    topics: [
      { title: "ER Models" },
      { title: "Normalization" },
      { title: "Indexes" }
    ]
  },
  {
    title: "Cloud Computing with AWS",
    description: "Understand cloud services and deployment.",
    difficulty: "Intermediate",
    lessons: 10,
    role: ["Cloud Engineer"],
    category: "Cloud",
    topics: [
      { title: "EC2" },
      { title: "S3" },
      { title: "Deployment" }
    ]
  },
  {
    title: "DevOps & CI/CD",
    description: "Learn DevOps practices and automation.",
    difficulty: "Advanced",
    lessons: 12,
    role: ["DevOps Engineer", "Software Engineer"],
    category: "DevOps",
    topics: [
      { title: "CI/CD Pipelines" },
      { title: "Docker" },
      { title: "GitHub Actions" }
    ]
  },
  {
    title: "System Design",
    description: "Design scalable and efficient systems.",
    difficulty: "Advanced",
    lessons: 14,
    role: ["Software Engineer","Web Developer"],
    category: "Architecture",
    topics: [
      { title: "Scalability" },
      { title: "Load Balancing" },
      { title: "Caching" }
    ]
  },
  {
    title: "Web Security",
    description: "Learn how to secure web applications.",
    difficulty: "Advanced",
    lessons: 10,
    role: ["Security Engineer"],
    category: "Security",
    topics: [
      { title: "XSS" },
      { title: "CSRF" },
      { title: "Authentication" }
    ]
  },
  {
    title: "GraphQL API Development",
    description: "Build APIs using GraphQL.",
    difficulty: "Advanced",
    lessons: 12,
    role: ["Backend Developer", "Web Developer"],
    category: "Backend",
    topics: [
      { title: "Schemas" },
      { title: "Resolvers" },
      { title: "Apollo Server" }
    ]
  }
];

module.exports = courses;