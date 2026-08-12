
import React from 'react';
import { Twitter, Instagram, Linkedin, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerSections = [
    {
      title: 'Book & App',
      links: [
        { label: 'The Business of Life', href: 'https://amazon.com', external: true },
        { label: 'MaxCoach App', href: 'https://maxcoach.app', external: true }
      ]
    },
    {
      title: 'Opportunities',
      links: [
        { label: '90-Day Student Sprint', href: '#sprint' },
        { label: 'Level Up RI', href: '#levelupri' },
        { label: 'Teacher Co-Design Event', href: '#teachers' },
        { label: 'Creative Council', href: '#council' }
      ]
    },
    {
      title: 'About',
      links: [
        { label: 'Author Bio', href: '#author' },
        { label: 'Company Info', href: '#' }
      ]
    }
  ];

  const handleNavClick = (e, href, external) => {
    if (external || href === '#') return;
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-background border-t border-border pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-2">
            <span className="text-2xl font-black text-foreground tracking-tight">
              HIDDEN GENIUS LABS
            </span>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-sm">
              Building systems, tools, and content that empower the next generation to master the business of life without burnout or sacrifice.
            </p>
            <div className="flex gap-4 mt-8">
              {[Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-bold text-foreground mb-6 uppercase tracking-wider text-sm">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      onClick={(e) => handleNavClick(e, link.href, link.external)}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1 group"
                    >
                      {link.label}
                      {link.external && (
                        <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Hidden Genius Labs LLC. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
