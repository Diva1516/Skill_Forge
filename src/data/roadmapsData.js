export const roadmaps = [
  {
    id: 'frontend',
    title: 'Frontend Developer',
    description: 'Learn to build modern, interactive user interfaces.',
    modules: [
      {
        id: 'fe_1',
        title: 'Internet & Web Basics',
        topics: ['How the Internet Works', 'HTTP/HTTPS', 'DNS'],
        status: 'completed'
      },
      {
        id: 'fe_2',
        title: 'HTML & CSS Foundations',
        topics: ['Semantic HTML', 'CSS Box Model', 'Flexbox & Grid', 'Responsive Design'],
        status: 'available'
      },
      {
        id: 'fe_3',
        title: 'JavaScript Essentials',
        topics: ['Variables & Types', 'Functions', 'DOM Manipulation', 'ES6+ Features'],
        status: 'locked'
      },
      {
        id: 'fe_4',
        title: 'React.js',
        topics: ['Components', 'Hooks', 'State Management', 'Routing'],
        status: 'locked'
      }
    ]
  },
  {
    id: 'backend',
    title: 'Backend Java Developer',
    description: 'Master server-side programming and APIs with Java.',
    modules: [
      {
        id: 'be_1',
        title: 'Java Fundamentals',
        topics: ['OOP Concepts', 'Collections Framework', 'Exceptions', 'Streams API'],
        status: 'available'
      },
      {
        id: 'be_2',
        title: 'Databases',
        topics: ['SQL Basics', 'Joins & Indexes', 'Transactions', 'JDBC'],
        status: 'locked'
      },
      {
        id: 'be_3',
        title: 'Spring Boot',
        topics: ['Dependency Injection', 'RESTful APIs', 'Spring Data JPA', 'Security'],
        status: 'locked'
      }
    ]
  }
];

export const technologies = [
  { id: 'react', name: 'React', category: 'Frontend', level: 'Intermediate', popular: true },
  { id: 'java', name: 'Java', category: 'Backend', level: 'Beginner', popular: true },
  { id: 'spring', name: 'Spring Boot', category: 'Backend', level: 'Advanced', popular: false },
  { id: 'js', name: 'JavaScript', category: 'Language', level: 'Beginner', popular: true },
  { id: 'css', name: 'CSS', category: 'Frontend', level: 'Beginner', popular: true },
  { id: 'sql', name: 'SQL', category: 'Database', level: 'Intermediate', popular: true },
  { id: 'git', name: 'Git', category: 'Tools', level: 'Beginner', popular: true },
];
