/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    
   
  ],
  theme: {
    extend: { 
      fontFamily:{
        'open-sans':['Open Sans','sans-serif'],
        'poppins':['Poppins','sans-serif'],
        'JosefinSans': ['Josefin Sans', 'sans-serif'],
        "inter": ['Inter', 'sans-serif']
      },
      backgroundImage:{
       'landing-page-bottom-image':"url('/images/home-bg-bottom-image.png')",
       "auth-bg": "url('/images/bg.png')",
       'home-page-employeer-bg':"url('/images/home-employee-image.svg')",
       'home-bg-display-image':"url('/images/home-design.svg')",
       'eclipse-image':"url('/images/home-eclipse-image.svg')"
      },
      
      colors: { 
      'primary': '#151B54', 
      'secondary': '#ffb200',
      'tertiary': '#e6edfc',
      'info': '#2A56EB',
      'border': '#B0B0B0',
      'nav-bar-line-color':'rgba(255, 178, 0, 1)',
      'color-primary-blue':'rgba(21, 27, 84, 1)',
      'color-white-alpha-1':'rgba(255, 255, 255, 1)',
      'color-primary-lighter-blue':'rgba(14, 99, 255, 1)',
      'color-transparent':'rgba(0, 0, 0, 0.5)',
      'color-accent-yellow':'rgba(250, 204, 21, 1)'
    },
    animation: {
      'chatbot-talk': 'chatbot-talk 0.5s ease-in-out infinite',
      'spin-circle': 'spinCircle 1.5s linear infinite',
       'loading':'loadingFrame 1.5s linear infinite'

    },
    keyframes: {
      'chatbot-talk': {
        '0%, 100%': {
          transform: 'translateY(0)',
        },
        '50%': {
          transform: 'translateY(-10px)',
        },
      },
      spinCircle: {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
      },
      loadingFrame:{
        '0%': { transform: 'rotate(0deg)',opacity:0 },
        '100%': { transform: 'rotate(360deg)',opacity:1 },
      }
    },
  
  },
  },
  plugins: [],
}

