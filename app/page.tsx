"use client"

import React, { useState } from "react";
import { Mail, Briefcase, Calendar, Image as ImageIcon, Code, Maximize2, X } from "lucide-react";
import Navbar from "../components/Navbar"; // Adjusted import path

// Define the shape of a single skill item
interface Skill {
  name: string;
  imgSrc?: string; // Optional since list items don't have images
}

// Define the shape of a skill category
interface SkillCategory {
  title: string;
  isList?: boolean; // Optional flag for text-only lists
  skills: Skill[];
}

interface Experience {
  role: string;
  company: string;
  date: string;
  bullets: string[];
}

interface Project {
  title: string;
  date: string;
  bullets: string[];
  tech: string[];
  imgSrc?: string;
}

interface MinorProject {
  title: string;
  desc: string;
  imgSrc?: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Programming & AI Integration',
    skills: [
      { name: 'C', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg' },
      { name: 'C++', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
      { name: 'C#', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg' },
      { name: 'Java', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
      { name: 'Android', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg' },
      { name: 'Kotlin', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg' },
      { name: 'Python', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
      { name: 'HTML', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
      { name: 'JS', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
      { name: 'Ruby', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ruby/ruby-original.svg' },
      { name: 'ASM', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg' },
      { name: 'CSS', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
      { name: 'OpenAI', imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg' },
      { name: 'Gemini', imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg' },
      { name: 'Claude', imgSrc: 'https://cdn.simpleicons.org/claude/D97757' }
    ]
  },
  {
    title: 'Web Development',
    skills: [
      { name: 'React', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'TypeScript', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
      { name: 'Next.js', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
      { name: 'Vue', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg' }
    ]
  },
  {
    title: 'Database Management',
    skills: [
      { name: 'MySQL', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
      { name: 'SQLite', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg' },
      { name: 'PostgreSQL', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
      { name: 'Supabase', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg' },
      { name: 'Firebase', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg' }
    ]
  },
  {
    title: 'Graphics Programming',
    skills: [
      { name: 'OpenGL', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opengl/opengl-original.svg' },
      { name: 'DirectX', imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/1/11/DirectX_logo.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail_unscaled&_=20130701184431' },
      { name: 'BGFX', imgSrc: 'https://repository-images.githubusercontent.com/3925242/a4566200-912a-11ea-984f-c387546a3126' }
    ]
  },
  {
    title: 'Applications and Software',
    skills: [
      { name: 'Microsoft Office', imgSrc: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0e/Microsoft_365_%282022%29.svg/960px-Microsoft_365_%282022%29.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20231004051714' },
      { name: 'PowerBI', imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg' },
      { name: 'Figma', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
      { name: 'GitHub', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
      { name: 'GitLab', imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original.svg' }
    ]
  },
  {
    title: 'Other Skills',
    isList: true,
    skills: [
      { name: 'Critical Thinking' },
      { name: 'Team Player' },
      { name: 'Adaptable' },
      { name: 'Detail Oriented' },
      { name: 'Problem-Solving' },
      { name: 'Ability to analyze complex technical information' },
      { name: 'Interpersonal Skills' }
    ]
  }
];

const experiences: Experience[] = [
  {
    role: "Research Assistant Intern",
    company: "GAME Lab - De La Salle University Manila",
    date: "Jan 2026 - June 2026",
    bullets: [
      "Developed a 3D game engine/scene editor software using C++ libraries and frameworks like BGFX with an AI-integrated workflow using Claude and ChatGPT",
      "Made significant contributions to the research and development of the in-house game engine creation of Project Anito, a DOST-funded project",
      "Created 3D environments and scenes through Blender, Unity, and self-developed editor software, AnitoCrosshatch"
    ]
  },
  {
    role: "Systems Development Intern",
    company: "Abenson Ventures Inc.",
    date: "Jan 2025 - March 2025",
    bullets: [
      "Designed and developed front-end user interfaces for staging websites through designing applications and front-end components development tools like Magento",
      "Participated in back-end systems workshops and developed back-end systems with continuous integration",
      "Coordinated testing and validation of various website functions and implementations"
    ]
  }
];

const projects: Project[] = [
  {
    title: "AnitoCrosshatch: Designing a 3D Editor Tool for Cross Hatch-Rendered 3d Environments (Undergraduate Thesis)",
    date: "November 2024 - June 2026",
    bullets: [
      "Designed and developed a 3D editor tool that that can create 3D environments with a cross-hatching style using primitive and imported 3D objects.",
      "Built from the ground up with the Bgfx framework, GLFW rendering, and ImGui user interface",
      "Selected for exhibition in multiple showcases featuring notable projects in game development and computer graphics",
      "Exhibited at: Philippine Blockchain Week 2025, GoGlobe Game Changers 2025, Philippine Game Dev Expo 2025 & 2026"
    ],
    tech: ["C++", "BGFX", "GLFW", "ImGui"],
    imgSrc: "/anitocrosshatch.png"
  },
  {
    title: "HQSys: Hospital Queueing System",
    date: "June 2026 - August 2026",
    bullets: [
      "Developed a secure, full-stack queue management application designed for clinic environments using Next.js, TypeScript, and Supabase.",
      "Features real-time synchronization that mirrors queue states between the main queue and individual accounts.",
      "Includes strict role-based access control, hardware integration for thermal printing, and server-side security for sensitive data."
    ],
    tech: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    imgSrc: "/HQsys.png"
  }
];

const minorProjects: MinorProject[] = [
  {
    title: "TOMATO LIST",
    desc: "Mobile Application developed for helping students and researchers with academic work.",
    imgSrc: "/tomatolist.png"
  },
  {
    title: "DECIMAL32 FLOATING POINT CONVERTER",
    desc: "Web Application that computes the equivalent IEEE-754 of floating point decimals",
    imgSrc: "/decimal cal.png"
  },
  {
    title: "AQUIRE SYSTEMS",
    desc: "Web Application designed to locally store student information for the Aquinas School",
    imgSrc: "/aquire.png"
  },
  {
    title: "SERIOUSMD OLAP DASHBOARD",
    desc: "Web Application that communicates with servers and supports OLAP designs for data backups",
    imgSrc: "/database.png"
  },
  {
    title: "POSTIEE",
    desc: "Web application social media app that acts like a blog for multiple users.",
    imgSrc: "/postiee.png"
  },
  {
    title: "JAVA FARMING GAME",
    desc: "Java farming simulator that uses UI elements to simulate a farm",
    imgSrc: "/java farming.png"
  }
];

export default function App() {
  const [selectedMedia, setSelectedMedia] = useState<{ title: string; imgSrc?: string } | null>(null);

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white overflow-x-hidden font-sans selection:bg-purple-500 selection:text-white scroll-smooth">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Glowy Stuff */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-purple-600/40 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] bg-yellow-600/30 rounded-full blur-[100px] mix-blend-screen"></div>
        <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none" viewBox="0 0 1440 800">
          <path d="M -100 300 C 200 150, 400 500, 800 350 C 1200 200, 1400 450, 1600 300" fill="none" stroke="url(#purple-gradient)" strokeWidth="1" />
          <path d="M -100 450 C 300 300, 600 650, 1000 450 C 1300 300, 1500 500, 1600 400" fill="none" stroke="url(#orange-gradient)" strokeWidth="0.5" />
          <defs>
            <linearGradient id="purple-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <linearGradient id="orange-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Render the Navbar component */}
      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        
        {/* Hero Section */}
        <section id="about" className="pt-28 md:pt-40 pb-20 flex flex-col md:flex-row items-center gap-16 scroll-mt-24">
          {/* LEFT COLUMN: Circular Portrait */}
          <div className="w-full md:w-4/10 flex justify-center md:justify-end">
            <div className="relative group">
              {/* Decorative outer ring */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-purple-500 to-orange-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              
              {/* Image container */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden border-2 border-white/10 bg-[#0d0d12]">
                <img 
                  src="pic.jpg" 
                  alt="Jonathan L. De Vera" 
                  className="w-full h-full object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                {/* Inner shadow overlay for depth */}
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(0,0,0,0.6)]"></div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Typography & Information */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="mb-6 space-y-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-gray-300 tracking-tight">
                Hello,
              </h1>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white">
                I am <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">Jonathan De Vera</span>
              </h2>
            </div>

            <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-lg mb-8">
              Adaptable Software Technology graduate with hands-on expertise in building clean, scalable software solutions.
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-10">
              {['Software Engineer', 'Web Developer', 'Data Engineer'].map((role, i) => (
                <span 
                  key={i} 
                  className="px-5 py-2 text-sm font-medium text-gray-300 bg-white/5 border border-white/10 rounded-full shadow-sm backdrop-blur-md hover:bg-white/10 hover:border-purple-500/30 transition-colors duration-300 cursor-default"
                >
                  {role}
                </span>
              ))}
            </div>
              
            <div className="flex items-center gap-4">
              <a href="#" className="hidden sm:flex p-3 bg-white/5 border border-white/10 hover:border-purple-500/50 rounded-xl hover:-translate-y-1 transition-all duration-300 group shadow-lg">
                <Mail className="w-6 h-6 text-gray-400 group-hover:text-white" />
              </a>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="pt-10 scroll-mt-24">
          <div className="flex items-end gap-6 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white">SKILLS</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-emerald-500 to-transparent mb-3"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category) => (
              <div 
                key={category.title} 
                className={`bg-[#161920]/80 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-6 hover:border-emerald-500/60 transition-colors duration-300 ${category.isList ? 'md:col-span-2 lg:col-span-1' : ''}`}
              >
                <h3 className="text-xl font-bold text-white mb-6 tracking-wide">
                  {category.title}
                </h3>
                
                {category.isList ? (
                  <ul className="space-y-3">
                    {category.skills.map((skill, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-300">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                        <span className="leading-snug">{skill.name}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill, i) => (
                      <div 
                        key={i} 
                        className="group relative flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-all duration-300 p-2"
                      >
                        {skill.imgSrc ? (
                          <img 
                            src={skill.imgSrc} 
                            alt={skill.name} 
                            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-sm" 
                          />
                        ) : (
                          <span className="text-xs font-bold text-slate-400 group-hover:text-emerald-400">
                            {skill.name.substring(0, 2)}
                          </span>
                        )}
                        
                        {/* Tooltip */}
                        <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1 bg-gray-900 text-emerald-400 text-xs font-semibold rounded pointer-events-none whitespace-nowrap shadow-xl border border-emerald-500/20 z-10">
                          {skill.name}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Professional Experience Section */}
        <section id="experience" className="pt-20 scroll-mt-24">
          <div className="flex items-end gap-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight uppercase">Professional Experience</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/50 to-transparent mb-3"></div>
          </div>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-emerald-500/50 before:via-white/10 before:to-transparent">
            {experiences.map((exp, index) => (
              <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                {/* Timeline dot */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0f1115] bg-emerald-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <Briefcase className="w-4 h-4 text-white" />
                </div>
                
                {/* Content Card */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#161920]/80 backdrop-blur-sm border border-white/5 hover:border-emerald-500/30 p-6 md:p-8 rounded-2xl transition-all duration-300 shadow-xl">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6 border-b border-white/5 pb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                      <p className="text-emerald-400 font-medium text-sm">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-sm font-mono shrink-0 bg-white/5 px-3 py-1 rounded-full">
                      <Calendar className="w-4 h-4" />
                      {exp.date}
                    </div>
                  </div>
                  
                  <ul className="space-y-3">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-300 text-sm md:text-base leading-relaxed">
                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-500/50 shrink-0"></div>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="pt-20 scroll-mt-24">
          <div className="flex items-end gap-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight uppercase">Projects</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/50 to-transparent mb-3"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {projects.map((project, index) => (
              <div key={index} className="flex flex-col bg-[#161920]/80 backdrop-blur-sm border border-white/5 hover:border-emerald-500/30 rounded-2xl overflow-hidden transition-all duration-300 group">
                
                {/* Image / Placeholder with Hover Action */}
                <div className="w-full h-64 bg-[#0a0c0f] relative flex items-center justify-center overflow-hidden border-b border-white/5 group-hover:border-emerald-500/30 transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161920] to-transparent z-10 opacity-60 pointer-events-none"></div>
                  
                  {project.imgSrc ? (
                    <img 
                      src={project.imgSrc} 
                      alt={project.title} 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <>
                      <ImageIcon className="w-16 h-16 text-slate-700 group-hover:scale-110 transition-transform duration-500" />
                      <span className="absolute bottom-4 left-4 z-20 text-xs font-mono text-slate-500">Add project image here</span>
                    </>
                  )}
                  
                  {/* Overlay Action */}
                  <div className="absolute inset-0 bg-emerald-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center backdrop-blur-[2px]">
                    <button 
                      onClick={() => setSelectedMedia({ title: project.title, imgSrc: project.imgSrc })}
                      className="px-6 py-2 bg-emerald-500 text-white font-medium rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-emerald-400 shadow-lg cursor-pointer"
                    >
                      View Media <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4 mb-6">
                    <h3 className="text-xl font-bold text-white leading-tight group-hover:text-emerald-400 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs font-mono text-emerald-500/80 bg-emerald-500/10 px-3 py-1.5 rounded-full shrink-0 border border-emerald-500/20 whitespace-nowrap self-start">
                      {project.date}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {project.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                        <Code className="w-4 h-4 text-emerald-500/50 mt-1 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-white/5">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="text-xs font-medium text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Minor Projects Section */}
          <div className="flex items-end gap-6 mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight uppercase">Minor Projects</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/30 to-transparent mb-2"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {minorProjects.map((project, index) => (
              <div 
                key={index} 
                className="flex flex-col bg-[#161920]/80 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.03] hover:border-emerald-500/30 group shadow-lg"
              >
                <div className="w-full h-48 bg-[#0a0c0f] relative flex items-center justify-center overflow-hidden border-b border-white/5">
                  {project.imgSrc ? (
                    <img 
                      src={project.imgSrc} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <>
                      <ImageIcon className="w-12 h-12 text-slate-700/50 group-hover:scale-110 group-hover:text-slate-600 transition-all duration-500" />
                      <span className="absolute bottom-3 left-3 z-20 text-[10px] uppercase font-mono text-slate-600 tracking-wider">Screenshot Space</span>
                    </>
                  )}
                  
                  <div className="absolute inset-0 bg-emerald-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center backdrop-blur-[2px]">
                    <button 
                      onClick={() => setSelectedMedia({ title: project.title, imgSrc: project.imgSrc })}
                      className="px-4 py-1.5 bg-emerald-500 text-white font-medium text-xs rounded-full flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-emerald-400 shadow-lg cursor-pointer"
                    >
                      View Media <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h4 className="text-lg font-bold text-white uppercase mb-3 leading-snug group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {project.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Media Lightbox Modal */}
      {selectedMedia && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
          onClick={() => setSelectedMedia(null)}
        >
          <div 
            className="relative max-w-5xl w-full bg-[#161920] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0f1115]">
              <h3 className="text-lg md:text-xl font-bold text-white tracking-wide pr-8">
                {selectedMedia.title}
              </h3>
              <button 
                onClick={() => setSelectedMedia(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-white/10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Media Content */}
            <div className="p-6 flex items-center justify-center min-h-[300px] overflow-auto bg-[#0a0c0f]">
              {selectedMedia.imgSrc ? (
                <img 
                  src={selectedMedia.imgSrc} 
                  alt={selectedMedia.title} 
                  className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg"
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 text-slate-500 py-16">
                  <ImageIcon className="w-20 h-20 opacity-30" />
                  <p className="text-sm font-mono uppercase tracking-wider text-slate-400">
                    No image uploaded yet
                  </p>
                  <p className="text-xs text-slate-600">
                    Add <code className="text-emerald-400">imgSrc</code> to this item's array in <code className="text-emerald-400">App.tsx</code>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}