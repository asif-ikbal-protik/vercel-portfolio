import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import CalendlyWidget from '@/components/CalendlyWidget';
import { CALENDLY_CONFIG } from '@/config/calendly';
import {
  Mail,
  Phone,
  MapPin,
  Download,
  Github,
  Linkedin,
  Menu,
  X,
  Brain,
  Code,
  CheckCircle,
  Send,
  Box,
  MessageSquare,
  Globe,
  Shield,
  GraduationCap,
  Award,
  Zap,
  Target,
  Database,
  Film
} from 'lucide-react';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (formData: typeof contactForm) => {
      return await apiRequest('POST', '/api/contact', formData);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message! I will get back to you soon.",
      });
      setContactForm({ name: '', email: '', subject: '', message: '' });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const trackViewMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest('POST', '/api/portfolio-view', {});
    },
    onError: (error) => {
      console.warn('Portfolio view tracking failed:', error);
    },
  });

  const phrases = [
    "Technical Project Manager",
    "AI Operations Specialist",
    "Agile Delivery Lead",
    "Workflow Optimization Expert"
  ];

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'Contact' }
  ];

  const skills = [
    {
      name: "Project Management",
      icon: Target,
      items: ["Agile & Scrum", "Sprint Planning", "Jira Tracking", "Stakeholder Management", "Risk Management", "Cross-functional Teams"]
    },
    {
      name: "AI Operations",
      icon: Database,
      items: ["Workflow Optimization", "Annotation Workflows", "QA/QC Pipelines", "SOP Development", "SLA/KPI Monitoring", "Team Training"]
    },
    {
      name: "Process Automation",
      icon: Zap,
      items: ["n8n", "Retool", "Looker Studio", "Dashboard Reporting", "Workflow Automations", "Basic Web Development"]
    },
    {
      name: "Tools & Platforms",
      icon: Code,
      items: ["Jira, Notion, Slack", "Postman, GitHub", "Canva, Adobe After Effects", "Google Workspace", "Lucidchart"]
    }
  ];


  const experiences = [
    {
      title: "Technical Project Manager",
      company: "Appalux Global IT",
      duration: "Apr 2025 - Present",
      website: "",
      description: "Managed end-to-end delivery operations across AI-based projects using Agile methodologies. Coordinated cross-functional teams (creative, engineering, QA, operations). Led AI data annotation workflows for 70+ members, improving operational accuracy from 82% to 97%. Built automations using n8n and dashboards using Retool and Looker Studio.",
      achievements: ["Agile & Sprint Execution", "Improved accuracy to 97%", "Built n8n automations", "Developed SOPs & training"]
    },
    {
      title: "Associate Delivery Lead",
      company: "Quantigo AI",
      duration: "Dec 2023 - Apr 2025",
      website: "",
      description: "Managed project coordination and sprint execution across multiple AI-focused delivery teams within a Scrum environment. Coordinated with engineering, operations, and QA. Monitored KPIs, SLA adherence, and operational metrics while identifying workflow bottlenecks.",
      achievements: ["Scrum Sprint Execution", "KPI & SLA Monitoring", "Workflow Optimization", "Cross-functional Coordination"]
    },
    {
      title: "Project Associate",
      company: "Quantanite",
      duration: "Aug 2022 - Dec 2023",
      website: "",
      description: "Supported service delivery operations including workflow coordination, reporting, quality monitoring, and task management. Assisted in SLA compliance tracking, operational issue resolution, and prepared operational reports for management.",
      achievements: ["SLA Compliance Tracking", "Operational Reporting", "Process Improvements", "Workflow Coordination"]
    },
    {
      title: "Data Operations Associate",
      company: "Bengali AI",
      duration: "Aug 2021 - Jan 2023",
      website: "",
      description: "Supported AI data operations and annotation workflows while ensuring adherence to project guidelines and quality standards. Collaborated with cross-functional teams to maintain data quality and resolved operational and data-related issues.",
      achievements: ["Data Validation", "Quality Assurance", "Issue Resolution", "Workflow Tracking"]
    }
  ];

  const projects = [
    {
      title: "3D Point Cloud Segmentation",
      description: "Advanced annotation project for autonomous navigation systems with complex 3D segmentation.",
      tech: ["Computer Vision", "3D Segmentation", "Autonomous Systems"],
      icon: Box
    },
    {
      title: "RLHF for Chatbot Optimization",
      description: "Large-scale Reinforcement Learning with Human Feedback project for improving chatbot responses.",
      tech: ["NLP", "RLHF", "Human Feedback"],
      icon: MessageSquare
    },
    {
      title: "Defect Detection for Aerial Vehicles",
      description: "Annotation pipeline for an aerial vehicle defect detection system, ensuring high accuracy for critical safety applications.",
      tech: ["Computer Vision", "Quality Assurance", "Defect Detection"],
      icon: Shield
    },
    {
      title: "Multimodal Sentiment Classification",
      description: "A project for classifying sentiment and intent from multimodal data within the banking sector.",
      tech: ["Multimodal AI", "NLP", "Banking Sector"],
      icon: Globe
    }
  ];

  // Typing animation effect
  useEffect(() => {
    const currentPhraseText = phrases[currentPhrase];
    const typingSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting && currentChar < currentPhraseText.length) {
        setTypedText(currentPhraseText.slice(0, currentChar + 1));
        setCurrentChar(currentChar + 1);
      } else if (isDeleting && currentChar > 0) {
        setTypedText(currentPhraseText.slice(0, currentChar - 1));
        setCurrentChar(currentChar - 1);
      } else if (!isDeleting && currentChar === currentPhraseText.length) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && currentChar === 0) {
        setIsDeleting(false);
        setCurrentPhrase((prev) => (prev + 1) % phrases.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentChar, isDeleting, currentPhrase, phrases]);

  // Track portfolio view on load
  useEffect(() => {
    trackViewMutation.mutate();
  }, []);

  // Active section tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(contactForm);
  };

  return (
    <div className="min-h-screen w-full bg-black relative text-[var(--text-primary)]">
      {/* Black Basic Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#000000",
          backgroundImage: `
            linear-gradient(to right, rgba(75, 85, 99, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(75, 85, 99, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-4 left-0 right-0 z-50">
        <div className="container mx-auto px-4">
          <div className="glass-nav mx-auto max-w-5xl rounded-2xl border border-[var(--border-color)]/60 bg-[var(--bg-primary)]/60 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="text-xl font-bold gradient-text font-mono">Asif Ikbal</div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-2">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`nav-link rounded-xl ${activeSection === item.id ? 'active' : ''}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-xl hover:bg-[var(--hover-color)] transition-colors"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="md:hidden border-t border-[var(--border-color)]/60 px-2 py-2">
                <div className="flex flex-col space-y-1">
                  {navItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`nav-link rounded-lg text-left ${activeSection === item.id ? 'active' : ''}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative z-10">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-center animate-float">
              <Brain className="w-12 h-12 text-[var(--accent-blue)] animate-pulse-slow" />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text animate-gradient">
              Asif Ikbal
            </h1>

            <div className="text-xl md:text-2xl text-[var(--text-secondary)] mb-8 min-h-[2rem]">
              <span className="typing-cursor font-mono">{typedText}</span>
            </div>

            <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-10 leading-relaxed">
              Technical Project Manager with 4+ years of experience leading AI-driven, digital, and operational projects. Experienced in Agile and Scrum methodologies, stakeholder communication, and cross-functional execution. Skilled in managing teams while improving workflows, delivery consistency, and operational performance through process automation and reporting dashboards.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => scrollToSection('contact')}
                className="modern-button px-8 py-4 font-semibold text-lg flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Hire Me
              </button>

              <a
                href="/Asif_IKbal.pdf"
                download
                className="px-8 py-4 border-2 border-[var(--accent-blue)] text-[var(--accent-blue)] font-semibold hover:bg-[var(--accent-blue)] hover:text-white transition-all duration-300 rounded-xl backdrop-blur-sm flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title animate-fade-in-up">
              About Me
            </h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="modern-card glow-blue animate-slide-in">
                <h3 className="text-2xl font-semibold mb-4 gradient-text">Agile & AI Operations</h3>
                <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                  Extensive background in AI operations, sprint planning, Jira tracking, and cross-functional team coordination. Strong focus on SLA/KPI monitoring and SOP development.
                </p>
                <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                  I specialize in improving operational accuracy, resolving bottlenecks, and automating workflows to deliver consistent and scalable results in fast-paced environments.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-[var(--accent-blue)]" />
                    <span className="text-[var(--text-secondary)]">Dhaka, Bangladesh</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-[var(--accent-blue)]" />
                    <span className="text-[var(--text-secondary)]">+8801878044854</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-[var(--accent-blue)]" />
                    <span className="text-[var(--text-secondary)]">asifikbalprotik@gmail.com</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="modern-card glow-purple animate-fade-in">
                  <h4 className="text-xl font-semibold mb-3 gradient-text">Core Expertise</h4>
                  <ul className="space-y-2 text-[var(--text-secondary)]">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-[var(--accent-blue)] mr-2" />Agile & Scrum Methodologies</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-[var(--accent-blue)] mr-2" />AI Data Operations & Annotation</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-[var(--accent-blue)] mr-2" />SOP Development & Team Training</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-[var(--accent-blue)] mr-2" />Dashboard Reporting (Retool, Looker)</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-[var(--accent-blue)] mr-2" />Process Automation (n8n)</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-[var(--accent-blue)] mr-2" />Cross-functional Collaboration</li>
                  </ul>
                </div>

                <div className="modern-card glow-cyan animate-fade-in">
                  <h4 className="text-xl font-semibold mb-3 gradient-text">Tools & Platforms</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Jira", "Notion", "Retool", "Looker Studio", "n8n", "Canva", "After Effects"].map(format => (
                      <Badge key={format} variant="secondary" className="bg-[var(--accent-blue)]/20 text-[var(--accent-blue)]">
                        {format}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section bg-[var(--bg-secondary)]/50 relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="section-title animate-fade-in-up">
              Technical Skills
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {skills.map((skill, index) => (
                <div key={skill.name} className="modern-card glow-gradient animate-fade-in">
                  <div className="flex items-center mb-4">
                    <skill.icon className="w-6 h-6 text-[var(--accent-blue)] mr-3" />
                    <h3 className="text-xl font-semibold text-[var(--accent-blue)]">{skill.name}</h3>
                  </div>
                  <div className="space-y-2">
                    {skill.items.map((item, idx) => (
                      <div key={idx} className="text-[var(--text-secondary)] text-sm">
                        • {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="section-title animate-fade-in-up">
              Experience
            </h2>

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className="modern-card glow-blue animate-slide-in">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold gradient-text">{exp.title}</h3>
                      <p className="text-[var(--text-secondary)]">{exp.company}</p>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-1">
                      {exp.website && (
                        <a
                          href={exp.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--accent-blue)] font-mono text-sm hover:underline"
                        >
                          {`@${exp.website}`.replace(/^@https?:\/\//, "")}
                        </a>
                      )}
                      <div className="text-[var(--accent-blue)] font-mono text-sm">
                        {exp.duration}
                      </div>
                    </div>
                  </div>
                  <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.achievements.map((achievement, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-[var(--accent-purple)]/20 text-[var(--accent-purple)]">
                        {achievement}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section bg-[var(--bg-secondary)]/50 relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="section-title animate-fade-in-up">
              Featured Projects
            </h2>

            {/* Featured Creative Project */}
            <div className="mb-8 max-w-2xl mx-auto modern-card glow-gradient animate-fade-in">
              <div className="flex items-center mb-3">
                <Film className="w-5 h-5 text-[var(--accent-blue)] mr-2" />
                <h3 className="text-lg font-semibold gradient-text">Appalux Global IT (aartic ai) — Company Promo</h3>
              </div>
              <p className="text-[var(--text-secondary)] mb-4 leading-relaxed text-sm">
                Motion graphics promotional video created using Adobe After Effects to showcase the company's services, culture, and brand identity.
              </p>
              <a
                href="https://drive.google.com/file/d/17fKDvPru01mdZlFB6ABH9WJUYAys42A6/view"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block w-full rounded-lg overflow-hidden border border-[var(--border-color)]/40 hover:border-[var(--accent-blue)]/60 transition-all duration-300"
              >
                <img
                  src="/appalux_promo_thumb.png"
                  alt="Appalux Global IT Promo Video"
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[var(--accent-blue)]/80 group-hover:bg-[var(--accent-blue)] flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg shadow-[var(--accent-blue)]/30">
                    <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
              </a>
              <div className="flex flex-wrap gap-2 mt-3">
                {["Adobe After Effects", "Motion Graphics", "Creative Production", "Brand Identity"].map((tech, idx) => (
                  <Badge key={idx} variant="secondary" className="bg-[var(--accent-purple)]/20 text-[var(--accent-purple)] text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <div key={index} className="modern-card glow-purple animate-fade-in">
                  <div className="flex items-center mb-4">
                    <project.icon className="w-6 h-6 text-[var(--accent-blue)] mr-3" />
                    <h3 className="text-xl font-semibold gradient-text">{project.title}</h3>
                  </div>
                  <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-[var(--accent-blue)]/20 text-[var(--accent-blue)]">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="section relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title animate-fade-in-up">
              Education
            </h2>

            <div className="modern-card glow-cyan animate-fade-in text-center">
              <div className="flex items-center justify-center mb-4">
                <GraduationCap className="w-8 h-8 text-[var(--accent-blue)] mr-3" />
                <h3 className="text-2xl font-semibold gradient-text">B.Sc. in Computer Science & Engineering</h3>
              </div>
              <p className="text-[var(--text-secondary)] text-lg mb-2">
                Bangladesh University of Business Technology, Dhaka
              </p>
              <p className="text-[var(--text-muted)]">
                2018-2022
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="section bg-[var(--bg-secondary)]/50 relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title animate-fade-in-up">
              Certifications
            </h2>

            <div className="space-y-4">
              {[
                { name: "Project Management", issuer: "Coursera", year: "2024" },
                { name: "Generative AI for Project Management", issuer: "PMI", year: "2024" },
                { name: "Web Development Course", issuer: "SoftTech IT", year: "2020" }
              ].map((cert, index) => (
                <div key={index} className="modern-card glow-gradient animate-fade-in flex items-center gap-4">
                  <div className="w-12 h-12 bg-[var(--accent-blue)]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-[var(--accent-blue)]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">{cert.name}</h3>
                    <p className="text-[var(--text-secondary)] text-sm">{cert.issuer} • {cert.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section bg-[var(--bg-secondary)]/50 relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto flex flex-col gap-8">
            <h2 className="section-title animate-fade-in-up">
              Get In Touch
            </h2>

            {/* Calendly Widget */}
            <CalendlyWidget
              calendlyUrl={CALENDLY_CONFIG.CALENDLY_URL}
              className="w-full"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div className="animate-slide-in">
                <h3 className="text-2xl font-semibold mb-6 gradient-text">Let's Work Together</h3>
                <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
                  I'm always interested in discussing new opportunities in AI data annotation,
                  MLOps, and quality assurance. Let's connect and explore how we can collaborate.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[var(--accent-blue)]/20 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-[var(--accent-blue)]" />
                    </div>
                    <div>
                      <p className="text-[var(--text-primary)] font-medium">Email</p>
                      <p className="text-[var(--text-secondary)]">asifikbalprotik@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[var(--accent-blue)]/20 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-[var(--accent-blue)]" />
                    </div>
                    <div>
                      <p className="text-[var(--text-primary)] font-medium">Phone</p>
                      <p className="text-[var(--text-secondary)]">+8801878044854</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[var(--accent-blue)]/20 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[var(--accent-blue)]" />
                    </div>
                    <div>
                      <p className="text-[var(--text-primary)] font-medium">Location</p>
                      <p className="text-[var(--text-secondary)]">Dhaka, Bangladesh</p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-6 mt-8">
                  <a
                    href="https://www.linkedin.com/in/improtik/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link w-12 h-12 bg-[var(--accent-blue)]/20 rounded-full flex items-center justify-center hover:bg-[var(--accent-blue)] hover:text-white transition-all duration-300"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="https://github.com/asif-ikbal-protik"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link w-12 h-12 bg-[var(--accent-blue)]/20 rounded-full flex items-center justify-center hover:bg-[var(--accent-blue)] hover:text-white transition-all duration-300"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="contact-form animate-fade-in">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-[var(--text-primary)] font-medium">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      className="form-input mt-2"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-[var(--text-primary)] font-medium">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      className="form-input mt-2"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject" className="text-[var(--text-primary)] font-medium">Subject</Label>
                    <Input
                      id="subject"
                      type="text"
                      className="form-input mt-2"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-[var(--text-primary)] font-medium">Message</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      className="form-input mt-2"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="modern-button w-full py-3 font-semibold text-lg flex items-center justify-center gap-2"
                  >
                    {contactMutation.isPending ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--bg-primary)] border-t border-[var(--border-color)] py-8 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-[var(--text-secondary)]">
            © 2025 Asif Ikbal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;