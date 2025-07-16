import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
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
  Cog,
  ProjectorIcon,
  Cloud,
  Trophy,
  Star,
  Award,
  CheckCircle,
  Send,
  Box,
  MessageSquare,
  Bot,
  Globe,
  Shield,
  Plane,
  GraduationCap,
  Tag
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
      return await apiRequest('/api/contact', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
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
      return await apiRequest('/api/portfolio-view', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
  });

  const phrases = [
    "Data Annotation Manager",
    "AI Expert", 
    "MLOps Specialist",
    "Quality Assurance Lead"
  ];

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' }
  ];

  const projects = [
    {
      title: "3D Point Cloud Segmentation",
      description: "Advanced annotation project for autonomous navigation systems, involving complex 3D point cloud segmentation for object detection and path planning.",
      icon: <Box className="w-6 h-6" />,
      tags: ["Computer Vision", "3D Segmentation", "Autonomous Systems"]
    },
    {
      title: "Multimodal Sentiment Analysis",
      description: "Banking sector project involving sentiment and intent classification across multiple modalities, improving customer service automation.",
      icon: <MessageSquare className="w-6 h-6" />,
      tags: ["NLP", "Multimodal", "Banking"]
    },
    {
      title: "RLHF Chatbot Optimization",
      description: "Implemented reinforcement learning with human feedback pipeline for chatbot optimization, significantly improving response quality.",
      icon: <Bot className="w-6 h-6" />,
      tags: ["RLHF", "Chatbot", "GenAI"]
    },
    {
      title: "Multilingual LLM Training",
      description: "Synthetic dataset curation for multilingual large language model training, focusing on diverse language representation.",
      icon: <Globe className="w-6 h-6" />,
      tags: ["LLM", "Multilingual", "Synthetic Data"]
    },
    {
      title: "AI Safety Evaluation",
      description: "Adversarial prompt evaluation project for generative AI safety, developing robust testing frameworks.",
      icon: <Shield className="w-6 h-6" />,
      tags: ["AI Safety", "Adversarial", "Evaluation"]
    },
    {
      title: "Aerial Vehicle Detection",
      description: "Defect detection system for aerial vehicles using computer vision techniques, ensuring safety through automated inspection.",
      icon: <Plane className="w-6 h-6" />,
      tags: ["Object Detection", "Aerial Systems", "Quality Control"]
    }
  ];

  const experiences = [
    {
      title: "Data Annotation Manager",
      company: "Appalux Global IT",
      location: "Dhaka, Bangladesh",
      period: "April 2025 – Present",
      description: "Leading scalable annotation workflows for computer vision, NLP, multimodal AI, and Generative AI. Expert in QA/QC protocols, Human-in-the-Loop processes, and annotation schema development.",
      highlights: [
        "Manage large-scale annotation pipelines for computer vision, NLP, and multimodal AI projects supporting SFT, RLHF, and HITL workflows",
        "Enforce SOPs, QA, and QC protocols across formats including bounding boxes, masks, 3D point clouds, OCR, and NER",
        "Lead multi-tier annotation teams and feedback-driven QA loops",
        "Collaborate with ML engineers to refine edge case handling and metric monitoring"
      ]
    },
    {
      title: "Associate Delivery Lead",
      company: "Quantigo AI",
      location: "Dhaka, Bangladesh",
      period: "December 2023 – April 2025",
      description: "Oversaw comprehensive management of data annotation projects, integrating client collaboration, technical coordination, team training, and quality assurance.",
      highlights: [
        "Led client engagement to capture requirements and structure workflows",
        "Built classification schemas, benchmark plans, and demo reviews",
        "Trained teams, enforced QC, and monitored review pipelines"
      ]
    },
    {
      title: "Associate",
      company: "Quantanite",
      location: "Dhaka, Bangladesh",
      period: "January 2023 – December 2023",
      description: "Executed client assignments with precision, fostering collaboration to enhance task quality and deliver consistently high standards.",
      highlights: [
        "Supervised operational output and contributed to task accuracy",
        "Delivered client-ready deliverables using MS Office and G-Suite tools"
      ]
    }
  ];

  const achievements = [
    {
      title: "Employee of the Month",
      company: "Quantigo AI",
      date: "May 2024",
      icon: <Trophy className="w-5 h-5" />
    },
    {
      title: "Super Star",
      company: "Quantanite",
      date: "November 2024",
      icon: <Star className="w-5 h-5" />
    },
    {
      title: "Above & Beyond",
      company: "Quantanite",
      date: "July 2024",
      icon: <Award className="w-5 h-5" />
    }
  ];

  const certifications = [
    {
      title: "Project Management",
      provider: "Coursera",
      date: "November 2024"
    },
    {
      title: "Leveraging Generative AI for Project Management",
      provider: "PMI",
      date: "September 2024"
    },
    {
      title: "Excel Essential Training (Microsoft 365)",
      provider: "NASBA",
      date: "September 2024"
    },
    {
      title: "Data Annotation",
      provider: "Quantigo AI",
      date: "January 2023"
    },
    {
      title: "Conflict Management",
      provider: "Quantigo AI",
      date: "September 2023"
    }
  ];

  // Typing animation effect
  useEffect(() => {
    const typeEffect = () => {
      const current = phrases[currentPhrase];
      
      if (isDeleting) {
        setTypedText(current.substring(0, currentChar - 1));
        setCurrentChar(prev => prev - 1);
      } else {
        setTypedText(current.substring(0, currentChar + 1));
        setCurrentChar(prev => prev + 1);
      }
      
      let typeSpeed = isDeleting ? 100 : 150;
      
      if (!isDeleting && currentChar === current.length) {
        typeSpeed = 2000;
        setIsDeleting(true);
      } else if (isDeleting && currentChar === 0) {
        setIsDeleting(false);
        setCurrentPhrase((currentPhrase + 1) % phrases.length);
        typeSpeed = 500;
      }
      
      setTimeout(typeEffect, typeSpeed);
    };
    
    const timer = setTimeout(typeEffect, 150);
    return () => clearTimeout(timer);
  }, [currentPhrase, currentChar, isDeleting]);

  // Intersection Observer for active section and fade animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.3 }
    );

    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    navItems.forEach(item => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    // Observe all sections with fade animation
    document.querySelectorAll('.section-fade').forEach(section => {
      fadeObserver.observe(section);
    });

    return () => {
      observer.disconnect();
      fadeObserver.disconnect();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(contactForm);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  // Track portfolio view on mount
  useEffect(() => {
    trackViewMutation.mutate();
  }, []);

  const FloatingParticles = () => {
    const particles = Array.from({ length: 8 }, (_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-gradient-to-r from-sky-accent to-cyan-accent rounded-full animate-float"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 8}s`,
          animationDuration: `${6 + Math.random() * 4}s`
        }}
      />
    ));
    return <>{particles}</>;
  };

  return (
    <div className="bg-midnight text-light-text font-sora overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-midnight/90 backdrop-blur-sm border-b border-sky-accent/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-sky-accent">Asif Ikbal</div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-link transition-colors ${
                    activeSection === item.id ? 'text-cyan-accent' : 'text-light-text hover:text-sky-accent'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-light-text hover:text-sky-accent transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 space-y-4 bg-midnight/95 backdrop-blur-sm border-t border-sky-accent/20 pt-4">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left nav-link transition-colors text-light-text hover:text-sky-accent"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative hero-bg">
        <FloatingParticles />
        
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-sky-accent to-cyan-accent p-1">
                <div className="w-full h-full rounded-full bg-midnight flex items-center justify-center">
                  <Brain className="w-12 h-12 text-sky-accent" />
                </div>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-sky-accent to-cyan-accent bg-clip-text text-transparent">
                Asif Ikbal
              </h1>
              
              <div className="text-xl md:text-2xl text-subtext mb-8">
                <span className="typing-cursor">{typedText}</span>
              </div>
              
              <p className="text-lg md:text-xl text-subtext max-w-3xl mx-auto mb-10 leading-relaxed">
                AI Expert with CSE background specializing in scaling high-quality datasets across vision, NLP, and multimodal domains. 
                Proven expertise in SFT, RLHF, and HITL operations with focus on MLOps integration and measurable performance uplift.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 bg-gradient-to-r from-sky-accent to-cyan-accent text-midnight font-semibold hover:scale-105 transition-transform"
              >
                <Mail className="w-4 h-4 mr-2" />
                Hire Me
              </Button>
              
              <Button
                variant="outline"
                asChild
                className="px-8 py-4 border-2 border-sky-accent text-sky-accent font-semibold hover:bg-sky-accent hover:text-midnight transition-colors"
              >
                <a href="/resume.pdf" download>
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 section-fade">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-sky-accent to-cyan-accent bg-clip-text text-transparent">
              About Me
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <Card className="gradient-border bg-transparent">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-4 text-sky-accent">AI Data Annotation Expert</h3>
                  <p className="text-subtext mb-6 leading-relaxed">
                    With a strong Computer Science and Engineering background, I specialize in managing large-scale 
                    annotation pipelines for cutting-edge AI systems. My expertise spans computer vision, NLP, and 
                    multimodal AI projects, ensuring high-quality data that drives successful model performance.
                  </p>
                  <p className="text-subtext mb-6 leading-relaxed">
                    I excel in designing robust workflows, implementing QA/QC protocols, and managing Human-in-the-Loop 
                    processes that are essential for modern AI development. My work directly contributes to the advancement 
                    of Generative AI, RLHF systems, and MLOps ecosystems.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-sky-accent" />
                      <span className="text-subtext">Dhaka, Bangladesh</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-sky-accent" />
                      <span className="text-subtext">+8801878044854</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-sky-accent" />
                      <span className="text-subtext">asifikbalprotik@gmail.com</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="space-y-6">
                <Card className="gradient-border bg-transparent">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold mb-3 text-cyan-accent">Core Expertise</h4>
                    <ul className="space-y-2 text-subtext">
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-sky-accent mr-2" />Large-scale annotation pipelines</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-sky-accent mr-2" />SFT, RLHF, and HITL operations</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-sky-accent mr-2" />QA/QC protocol design</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-sky-accent mr-2" />MLOps integration</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 text-sky-accent mr-2" />Cross-functional collaboration</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="gradient-border bg-transparent">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold mb-3 text-cyan-accent">Data Formats</h4>
                    <div className="flex flex-wrap gap-2">
                      {["COCO", "JSON", "Pascal VOC", "3D Point Clouds", "NER", "OCR"].map(format => (
                        <Badge key={format} variant="secondary" className="bg-sky-accent/20 text-sky-accent">
                          {format}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-dark-surface/50 section-fade">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-sky-accent to-cyan-accent bg-clip-text text-transparent">
              Technical Skills
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* AI/ML Skills */}
              <Card className="skill-card bg-gradient-to-br from-sky-accent/10 to-cyan-accent/10 border-sky-accent/30">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Brain className="w-6 h-6 text-sky-accent mr-3" />
                    <h3 className="text-xl font-semibold">AI/ML Expertise</h3>
                  </div>
                  <div className="space-y-2">
                    {[
                      { skill: "Generative AI", level: "Expert" },
                      { skill: "RLHF", level: "Expert" },
                      { skill: "SFT", level: "Expert" },
                      { skill: "HITL", level: "Expert" }
                    ].map(item => (
                      <div key={item.skill} className="flex justify-between">
                        <span className="text-subtext">{item.skill}</span>
                        <span className="text-sky-accent">{item.level}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Data Pipeline Skills */}
              <Card className="skill-card bg-gradient-to-br from-cyan-accent/10 to-sky-accent/10 border-cyan-accent/30">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Cog className="w-6 h-6 text-cyan-accent mr-3" />
                    <h3 className="text-xl font-semibold">Data Pipelines</h3>
                  </div>
                  <div className="space-y-2">
                    {[
                      { skill: "NLP Pipelines", level: "Expert" },
                      { skill: "CV Pipelines", level: "Expert" },
                      { skill: "MLOps Integration", level: "Expert" },
                      { skill: "Evaluation & QA", level: "Expert" }
                    ].map(item => (
                      <div key={item.skill} className="flex justify-between">
                        <span className="text-subtext">{item.skill}</span>
                        <span className="text-cyan-accent">{item.level}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Tools & Platforms */}
              <Card className="skill-card bg-gradient-to-br from-sky-accent/10 to-cyan-accent/10 border-sky-accent/30">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <ProjectorIcon className="w-6 h-6 text-sky-accent mr-3" />
                    <h3 className="text-xl font-semibold">Tools & Platforms</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["CVAT", "Label Studio", "Supervisely", "Encord", "SuperAnnotate", "Roboflow"].map(tool => (
                      <Badge key={tool} variant="secondary" className="bg-sky-accent/20 text-sky-accent text-sm">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Project Management */}
              <Card className="skill-card bg-gradient-to-br from-cyan-accent/10 to-sky-accent/10 border-cyan-accent/30">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <ProjectorIcon className="w-6 h-6 text-cyan-accent mr-3" />
                    <h3 className="text-xl font-semibold">Project Management</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Scrum", "Agile", "ClickUp", "Asana", "Trello"].map(tool => (
                      <Badge key={tool} variant="secondary" className="bg-cyan-accent/20 text-cyan-accent text-sm">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Programming */}
              <Card className="skill-card bg-gradient-to-br from-sky-accent/10 to-cyan-accent/10 border-sky-accent/30">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Code className="w-6 h-6 text-sky-accent mr-3" />
                    <h3 className="text-xl font-semibold">Programming</h3>
                  </div>
                  <div className="space-y-2">
                    {[
                      { skill: "Python", level: "Advanced" },
                      { skill: "JavaScript", level: "Intermediate" },
                      { skill: "SQL", level: "Intermediate" }
                    ].map(item => (
                      <div key={item.skill} className="flex justify-between">
                        <span className="text-subtext">{item.skill}</span>
                        <span className="text-sky-accent">{item.level}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Cloud Platforms */}
              <Card className="skill-card bg-gradient-to-br from-cyan-accent/10 to-sky-accent/10 border-cyan-accent/30">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Cloud className="w-6 h-6 text-cyan-accent mr-3" />
                    <h3 className="text-xl font-semibold">Cloud Platforms</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["AWS", "GCP", "Azure", "Git", "GitHub"].map(tool => (
                      <Badge key={tool} variant="secondary" className="bg-cyan-accent/20 text-cyan-accent text-sm">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 section-fade">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-sky-accent to-cyan-accent bg-clip-text text-transparent">
              Work Experience
            </h2>
            
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className="timeline-item">
                  <Card className="gradient-border bg-transparent">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-semibold text-sky-accent">{exp.title}</h3>
                          <p className="text-cyan-accent font-medium">{exp.company}</p>
                          <p className="text-subtext">{exp.location}</p>
                        </div>
                        <div className="text-right mt-2 md:mt-0">
                          <Badge variant="secondary" className="bg-sky-accent/20 text-sky-accent">
                            {exp.period}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-subtext mb-4 leading-relaxed">
                        {exp.description}
                      </p>
                      <ul className="space-y-2 text-subtext">
                        {exp.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-sky-accent mr-2 mt-1 flex-shrink-0" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-dark-surface/50 section-fade">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-sky-accent to-cyan-accent bg-clip-text text-transparent">
              Key Projects
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Card key={index} className="project-card bg-gradient-to-br from-dark-surface/80 to-midnight/90 border-sky-accent/20 hover:border-sky-accent/50 transition-all duration-300 hover:transform hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="text-sky-accent mr-3">
                        {project.icon}
                      </div>
                      <h3 className="text-xl font-semibold">{project.title}</h3>
                    </div>
                    <p className="text-subtext mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="bg-sky-accent/20 text-sky-accent text-sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 section-fade">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-sky-accent to-cyan-accent bg-clip-text text-transparent">
              Education & Certifications
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Education */}
              <Card className="gradient-border bg-transparent">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-6 text-sky-accent">Education</h3>
                  <div className="space-y-6">
                    <div className="timeline-item">
                      <div className="flex items-center mb-2">
                        <GraduationCap className="w-5 h-5 text-cyan-accent mr-2" />
                        <h4 className="text-xl font-semibold text-cyan-accent">B.Sc. in Computer Science and Engineering</h4>
                      </div>
                      <p className="text-subtext">Bangladesh University of Business Technology</p>
                      <p className="text-subtext">2018 – 2022</p>
                    </div>
                    <div className="timeline-item">
                      <div className="flex items-center mb-2">
                        <GraduationCap className="w-5 h-5 text-cyan-accent mr-2" />
                        <h4 className="text-xl font-semibold text-cyan-accent">Higher Secondary Certificate</h4>
                      </div>
                      <p className="text-subtext">Alamdanga Govt. College</p>
                      <p className="text-subtext">2015 – 2017</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Certifications */}
              <Card className="gradient-border bg-transparent">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-6 text-sky-accent">Certifications</h3>
                  <div className="space-y-4">
                    {certifications.map((cert, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Tag className="w-4 h-4 text-sky-accent" />
                        <div>
                          <p className="font-semibold">{cert.title}</p>
                          <p className="text-subtext text-sm">{cert.provider} ({cert.date})</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Achievements */}
            <div className="mt-12">
              <Card className="gradient-border bg-transparent">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-6 text-sky-accent">Achievements</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-sky-accent to-cyan-accent flex items-center justify-center text-midnight">
                          {achievement.icon}
                        </div>
                        <h4 className="font-semibold text-sky-accent">{achievement.title}</h4>
                        <p className="text-subtext text-sm">{achievement.company} ({achievement.date})</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-dark-surface/50 section-fade">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-sky-accent to-cyan-accent bg-clip-text text-transparent">
              Get In Touch
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <Card className="gradient-border bg-transparent">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-semibold mb-6 text-sky-accent">Let's Connect</h3>
                    <p className="text-subtext mb-6 leading-relaxed">
                      I'm always interested in discussing AI projects, data annotation challenges, 
                      and opportunities to collaborate on cutting-edge machine learning initiatives.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-sky-accent to-cyan-accent rounded-full flex items-center justify-center">
                          <Mail className="w-5 h-5 text-midnight" />
                        </div>
                        <div>
                          <p className="font-semibold">Email</p>
                          <p className="text-subtext">asifikbalprotik@gmail.com</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-accent to-sky-accent rounded-full flex items-center justify-center">
                          <Phone className="w-5 h-5 text-midnight" />
                        </div>
                        <div>
                          <p className="font-semibold">Phone</p>
                          <p className="text-subtext">+8801878044854</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-sky-accent to-cyan-accent rounded-full flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-midnight" />
                        </div>
                        <div>
                          <p className="font-semibold">Location</p>
                          <p className="text-subtext">Dhaka, Bangladesh</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-4 mt-8">
                      <Button
                        variant="outline"
                        size="icon"
                        asChild
                        className="w-12 h-12 bg-sky-accent/20 hover:bg-sky-accent/40 border-sky-accent/30"
                      >
                        <a href="https://linkedin.com/in/asif-ikbal" target="_blank" rel="noopener noreferrer">
                          <Linkedin className="w-5 h-5 text-sky-accent" />
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        asChild
                        className="w-12 h-12 bg-sky-accent/20 hover:bg-sky-accent/40 border-sky-accent/30"
                      >
                        <a href="https://github.com/asif-ikbal" target="_blank" rel="noopener noreferrer">
                          <Github className="w-5 h-5 text-sky-accent" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Contact Form */}
              <Card className="gradient-border bg-transparent">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-6 text-sky-accent">Send Message</h3>
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-subtext">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your Name"
                        value={contactForm.name}
                        onChange={handleInputChange}
                        required
                        className="mt-2 bg-dark-surface border-sky-accent/30 focus:border-sky-accent text-light-text"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-subtext">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={contactForm.email}
                        onChange={handleInputChange}
                        required
                        className="mt-2 bg-dark-surface border-sky-accent/30 focus:border-sky-accent text-light-text"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="subject" className="text-subtext">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="Project Discussion"
                        value={contactForm.subject}
                        onChange={handleInputChange}
                        required
                        className="mt-2 bg-dark-surface border-sky-accent/30 focus:border-sky-accent text-light-text"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="message" className="text-subtext">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="Tell me about your project..."
                        value={contactForm.message}
                        onChange={handleInputChange}
                        required
                        className="mt-2 bg-dark-surface border-sky-accent/30 focus:border-sky-accent text-light-text resize-none"
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={contactMutation.isPending}
                      className="w-full bg-gradient-to-r from-sky-accent to-cyan-accent text-midnight font-semibold hover:scale-105 transition-transform disabled:opacity-50"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {contactMutation.isPending ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-sky-accent/20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-subtext mb-4 md:mb-0">
              © 2024 Asif Ikbal. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <button onClick={() => scrollToSection('home')} className="text-subtext hover:text-sky-accent transition-colors">Home</button>
              <button onClick={() => scrollToSection('about')} className="text-subtext hover:text-sky-accent transition-colors">About</button>
              <button onClick={() => scrollToSection('contact')} className="text-subtext hover:text-sky-accent transition-colors">Contact</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
