import favicon from './favicon.png'
import hero from './hero.png'
import futuristicHero from './futuristic_hero.png'
import learning from './learning.png'
import reactLogo from './react.svg'
import viteLogo from './vite.svg'

export const assets = {
    favicon,
    hero,
    futuristicHero,
    learning,
    reactLogo,
    viteLogo,
}

export const dummyCourses = [
    {
        _id: '1',
        title: 'Complete React Native Developer in 2024',
        description: 'Learn React Native from scratch and build real-world mobile apps for iOS and Android.',
        courseContent: `
          <p>This comprehensive course is designed to take you from a complete beginner to an advanced React Native developer. You will learn the core concepts and build real-world, production-ready applications.</p>
          <p><strong>Key concepts covered include:</strong></p>
          <ul class="list-disc list-inside mt-2 mb-4">
            <li>React Native Core Components & Layouts</li>
            <li>Navigation using React Navigation v6</li>
            <li>State Management with Redux Toolkit</li>
            <li>Integrating Native Device Features</li>
          </ul>
          <p>By the end of this course, you will be able to tackle complex mobile app development challenges with confidence.</p>
        `,
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop',
        price: 49.99,
        educator: 'John Doe',
        rating: 4.8,
        enrolledStudents: 1200,
        chapters: [
            {
                chapterId: 'c1',
                chapterTitle: 'Introduction to React Native',
                chapterContent: [
                    { lectureId: 'l1', isPreviewFree: true, lectureTitle: 'What is React Native?', lectureDuration: '12 mins', lectureUrl: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' },
                    { lectureId: 'l2', lectureTitle: 'Environment Setup for Mac & Windows', lectureDuration: '25 mins', lectureUrl: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' },
                    { lectureId: 'l3', lectureTitle: 'Running your first app', lectureDuration: '15 mins', lectureUrl: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' }
                ]
            },
            {
                chapterId: 'c2',
                chapterTitle: 'Core Components & Layouts',
                chapterContent: [
                    { lectureId: 'l4', lectureTitle: 'View, Text, and Image Components', lectureDuration: '18 mins', lectureUrl: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' },
                    { lectureId: 'l5', lectureTitle: 'Flexbox in React Native', lectureDuration: '30 mins', lectureUrl: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' },
                    { lectureId: 'l6', lectureTitle: 'ScrollView and FlatList for Performance', lectureDuration: '22 mins', lectureUrl: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' }
                ]
            },
            {
                chapterId: 'c3',
                chapterTitle: 'Navigation',
                chapterContent: [
                    { lectureId: 'l7', lectureTitle: 'Setting up React Navigation', lectureDuration: '15 mins', lectureUrl: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' },
                    { lectureId: 'l8', lectureTitle: 'Stack & Tab Navigators', lectureDuration: '28 mins', lectureUrl: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' }
                ]
            }
        ]
    },
    {
        _id: '2',
        title: 'Build Text to Image SaaS App in React JS',
        description: 'Build fast, modern web applications with Vite and React.',
        courseContent: `
          <p>Master the MERN stack by building a Full Stack AI Text to Image SaaS Application. This project-based course walks you through every step of building a modern, monetizable web app.</p>
          <p><strong>What you will build and learn:</strong></p>
          <ul class="list-disc list-inside mt-2 mb-4">
            <li>Frontend development with React.js and Tailwind CSS</li>
            <li>Backend architecture using Node.js and Express</li>
            <li>Integrating OpenAI's DALL-E API for image generation</li>
            <li>Handling subscriptions and payments with Stripe</li>
          </ul>
          <p>Perfect for developers looking to add a highly impressive, full-stack project to their portfolio.</p>
        `,
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
        price: 10.99,
        educator: 'Richard James',
        rating: 4.5,
        enrolledStudents: 122,
        chapters: [
            {
                chapterId: 'c1',
                chapterTitle: 'Project Setup and Configuration',
                chapterContent: [
                    { lectureId: 'l1', isPreviewFree: true, lectureTitle: 'Environment Setup - Install Node.js, VS Code', lectureDuration: '10 mins', lectureUrl: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' },
                    { lectureId: 'l2', lectureTitle: 'Repository Setup & Dependencies', lectureDuration: '15 mins', lectureUrl: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' }
                ]
            },
            {
                chapterId: 'c2',
                chapterTitle: 'Frontend Development',
                chapterContent: [
                    { lectureId: 'l3', lectureTitle: 'Designing the Hero Section', lectureDuration: '25 mins', lectureUrl: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' },
                    { lectureId: 'l4', lectureTitle: 'State Management Context', lectureDuration: '20 mins', lectureUrl: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' }
                ]
            },
            {
                chapterId: 'c3',
                chapterTitle: 'Backend & Stripe Integration',
                chapterContent: [
                    { lectureId: 'l5', lectureTitle: 'Building the Express API', lectureDuration: '35 mins', lectureUrl: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' },
                    { lectureId: 'l6', lectureTitle: 'Stripe Webhooks & Payments', lectureDuration: '45 mins', lectureUrl: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' }
                ]
            }
        ]
    },
    {
        _id: '3',
        title: 'Fullstack Web Development Bootcamp',
        description: 'Become a fullstack developer by learning MERN stack.',
        courseContent: `
          <p>This is the ultimate bootcamp to take you from zero to fullstack hero. We cover the entire modern web development ecosystem from the ground up.</p>
          <p><strong>Bootcamp Modules:</strong></p>
          <ul class="list-disc list-inside mt-2 mb-4">
            <li>HTML5, CSS3, and modern JavaScript (ES6+)</li>
            <li>React.js fundamentals and Hooks</li>
            <li>Backend development with Node.js and MongoDB</li>
            <li>Authentication, Authorization, and Security</li>
          </ul>
        `,
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop',
        price: 89.99,
        educator: 'Alex Johnson',
        rating: 4.7,
        enrolledStudents: 2300,
        chapters: [
            {
                chapterId: 'c1',
                chapterTitle: 'Frontend Basics',
                chapterContent: [
                    { lectureId: 'l1', isPreviewFree: true, lectureTitle: 'HTML5 Semantic Tags', lectureDuration: '20 mins', lectureUrl: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' },
                    { lectureId: 'l2', lectureTitle: 'Advanced CSS Layouts', lectureDuration: '35 mins', lectureUrl: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' }
                ]
            },
            {
                chapterId: 'c2',
                chapterTitle: 'Backend with Node.js',
                chapterContent: [
                    { lectureId: 'l3', lectureTitle: 'Express.js Routing', lectureDuration: '25 mins', lectureUrl: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' },
                    { lectureId: 'l4', lectureTitle: 'MongoDB Models & Schemas', lectureDuration: '40 mins', lectureUrl: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' }
                ]
            }
        ]
    },
    {
        _id: '4',
        title: 'Mastering Python for Data Science',
        description: 'Learn Python programming for data analysis and machine learning.',
        courseContent: `
          <p>Unlock the power of Data Science with Python. This course dives deep into the libraries and tools that power the modern data industry.</p>
          <p><strong>Core competencies:</strong></p>
          <ul class="list-disc list-inside mt-2 mb-4">
            <li>Data manipulation with Pandas</li>
            <li>Numerical computing with NumPy</li>
            <li>Data visualization with Matplotlib & Seaborn</li>
            <li>Introductory Machine Learning with Scikit-Learn</li>
          </ul>
        `,
        image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=800&auto=format&fit=crop',
        price: 59.99,
        educator: 'Sarah Williams',
        rating: 4.9,
        enrolledStudents: 3100,
        chapters: [
            {
                chapterId: 'c1',
                chapterTitle: 'Python Data Structures',
                chapterContent: [
                    { lectureId: 'l1', lectureTitle: 'Lists, Tuples, and Dictionaries', lectureDuration: '22 mins', lectureUrl: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' },
                    { lectureId: 'l2', lectureTitle: 'List Comprehensions', lectureDuration: '18 mins', lectureUrl: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' }
                ]
            },
            {
                chapterId: 'c2',
                chapterTitle: 'Pandas Deep Dive',
                chapterContent: [
                    { lectureId: 'l3', lectureTitle: 'DataFrames and Series', lectureDuration: '30 mins', lectureUrl: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' },
                    { lectureId: 'l4', lectureTitle: 'Cleaning Missing Data', lectureDuration: '25 mins', lectureUrl: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' }
                ]
            }
        ]
    },
    {
        _id: '5',
        title: 'Advanced UI/UX Design with Figma',
        description: 'Master Figma and design beautiful, user-friendly interfaces.',
        courseContent: `
          <p>Elevate your design skills. This course teaches you not just how to use Figma, but how to think like a Senior Product Designer.</p>
          <p><strong>You will master:</strong></p>
          <ul class="list-disc list-inside mt-2 mb-4">
            <li>Auto Layout 5.0 and Component Variants</li>
            <li>Building scalable Design Systems</li>
            <li>Interactive Prototyping and Micro-animations</li>
            <li>Developer Handoff best practices</li>
          </ul>
        `,
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop',
        price: 34.99,
        educator: 'Emily Chen',
        rating: 4.6,
        enrolledStudents: 1850,
        chapters: [
            {
                chapterId: 'c1',
                chapterTitle: 'Figma Mastery',
                chapterContent: [
                    { lectureId: 'l1', lectureTitle: 'Advanced Auto Layout', lectureDuration: '25 mins', lectureUrl: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' },
                    { lectureId: 'l2', lectureTitle: 'Component Properties', lectureDuration: '20 mins', lectureUrl: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' }
                ]
            },
            {
                chapterId: 'c2',
                chapterTitle: 'Design Systems',
                chapterContent: [
                    { lectureId: 'l3', lectureTitle: 'Color and Typography Tokens', lectureDuration: '35 mins', lectureUrl: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' },
                    { lectureId: 'l4', lectureTitle: 'Building a Component Library', lectureDuration: '45 mins', lectureUrl: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' }
                ]
            }
        ]
    },
    {
        _id: '6',
        title: 'The Complete Node.js Backend Course',
        description: 'Build scalable APIs and microservices with Node.js and Express.',
        courseContent: `
          <p>Become a backend master. This course covers everything from simple Express servers to complex microservices deployed on the cloud.</p>
          <p><strong>Curriculum highlights:</strong></p>
          <ul class="list-disc list-inside mt-2 mb-4">
            <li>RESTful API Design & Best Practices</li>
            <li>Database integration with MongoDB and PostgreSQL</li>
            <li>Authentication with JWT and OAuth2</li>
            <li>Docker containerization and CI/CD deployment</li>
          </ul>
        `,
        image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=800&auto=format&fit=crop',
        price: 64.99,
        educator: 'Michael Roberts',
        rating: 4.8,
        enrolledStudents: 4200,
        chapters: [
            {
                chapterId: 'c1',
                chapterTitle: 'Express Framework',
                chapterContent: [
                    { lectureId: 'l1', lectureTitle: 'Middleware in Express', lectureDuration: '18 mins', lectureUrl: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' },
                    { lectureId: 'l2', lectureTitle: 'Error Handling Patterns', lectureDuration: '22 mins', lectureUrl: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' }
                ]
            },
            {
                chapterId: 'c2',
                chapterTitle: 'Database Integration',
                chapterContent: [
                    { lectureId: 'l3', lectureTitle: 'Connecting to MongoDB with Mongoose', lectureDuration: '30 mins', lectureUrl: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' },
                    { lectureId: 'l4', lectureTitle: 'Complex Aggregation Pipelines', lectureDuration: '40 mins', lectureUrl: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' }
                ]
            }
        ]
    },
    {
        _id: '7',
        title: 'Next.js 14 Full Stack Development',
        description: 'Build fast, SEO-friendly React apps with the App Router.',
        courseContent: `
          <p>Master the latest paradigm in React development. We dive deep into Next.js 14, the App Router, and React Server Components.</p>
          <p><strong>What you will learn:</strong></p>
          <ul class="list-disc list-inside mt-2 mb-4">
            <li>Server Actions vs API Routes</li>
            <li>Caching and Revalidation Strategies</li>
            <li>Static Site Generation (SSG) & Server-Side Rendering (SSR)</li>
            <li>Deploying Edge Functions on Vercel</li>
          </ul>
        `,
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
        price: 79.99,
        educator: 'David Kim',
        rating: 4.9,
        enrolledStudents: 980,
        chapters: [
            {
                chapterId: 'c1',
                chapterTitle: 'App Router Fundamentals',
                chapterContent: [
                    { lectureId: 'l1', lectureTitle: 'File-based Routing in Next 14', lectureDuration: '15 mins', lectureUrl: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' },
                    { lectureId: 'l2', lectureTitle: 'Layouts, Templates, and Loading UI', lectureDuration: '25 mins', lectureUrl: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' }
                ]
            },
            {
                chapterId: 'c2',
                chapterTitle: 'Data Fetching & Mutations',
                chapterContent: [
                    { lectureId: 'l3', lectureTitle: 'React Server Components', lectureDuration: '35 mins', lectureUrl: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' },
                    { lectureId: 'l4', lectureTitle: 'Mutating Data with Server Actions', lectureDuration: '30 mins', lectureUrl: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' }
                ]
            }
        ]
    },
    {
        _id: '8',
        title: 'React Router Complete Course in One Video',
        description: 'Master React routing with dynamic paths and loaders.',
        courseContent: `
          <p>A concise, crash-course style masterclass on React Router v6. Perfect for developers who want to get up to speed quickly.</p>
          <p><strong>Topics covered:</strong></p>
          <ul class="list-disc list-inside mt-2 mb-4">
            <li>BrowserRouter and Route components</li>
            <li>Nested Routing and the Outlet component</li>
            <li>Data Loaders and Actions (Remix style)</li>
            <li>Handling 404s and Error Boundaries</li>
          </ul>
        `,
        image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=800&auto=format&fit=crop',
        price: 15.99,
        educator: 'Richard James',
        rating: 4.5,
        enrolledStudents: 122,
        chapters: [
            {
                chapterId: 'c1',
                chapterTitle: 'React Router Crash Course',
                chapterContent: [
                    { lectureId: 'l1', lectureTitle: 'Basic Routing Setup', lectureDuration: '15 mins', lectureUrl: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' },
                    { lectureId: 'l2', lectureTitle: 'Nested Routes and Outlets', lectureDuration: '25 mins', lectureUrl: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' },
                    { lectureId: 'l3', lectureTitle: 'Loaders, Actions, and Error Elements', lectureDuration: '40 mins', lectureUrl: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' }
                ]
            }
        ]
    }
]

export const dummyTestimonials = [
    {
        name: 'Donald Jackman',
        role: 'SWE 1 @ Amazon',
        rating: 5,
        feedback: 'I\'ve been using EduTrack for nearly two years, primarily for full-stack development, and it has been incredibly user-friendly, making my work much easier.',
        image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
        name: 'Richard Nelson',
        role: 'SWE 2 @ Samsung',
        rating: 4,
        feedback: 'I\'ve been using EduTrack for nearly two years, primarily for advanced algorithms, and it has been incredibly user-friendly, making my work much easier.',
        image: 'https://randomuser.me/api/portraits/men/44.jpg'
    },
    {
        name: 'James Washington',
        role: 'SWE 2 @ Google',
        rating: 5,
        feedback: 'I\'ve been using EduTrack for nearly two years, primarily for system design, and it has been incredibly user-friendly, making my work much easier.',
        image: 'https://randomuser.me/api/portraits/men/22.jpg'
    }
]

export const dummyEducatorData = {
    name: 'John Doe',
    title: 'Senior Software Engineer',
    about: 'I am a passionate software engineer with over 10 years of experience in full-stack development. I love teaching and sharing my knowledge with others.',
    courses: dummyCourses,
    totalStudents: 3450,
    totalReviews: 210,
    rating: 4.8
}
