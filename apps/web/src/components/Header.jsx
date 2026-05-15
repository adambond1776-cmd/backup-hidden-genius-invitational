
import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Book', href: 'https://amazon.com', external: true },
    { label: 'App', href: 'https://maxcoach.app', external: true }
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleNavClick = (e, href, external) => {
    if (external) return;
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-background/90 backdrop-blur-md shadow-lg border-border' 
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home', false)}
            className="text-xl md:text-2xl font-black text-foreground hover:text-primary transition-colors duration-200 tracking-tight"
          >
            HIDDEN GENIUS LABS
          </a>
          
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                onClick={(e) => handleNavClick(e, link.href, link.external)}
                className="text-sm font-bold tracking-wide uppercase text-foreground/80 hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold tracking-wide uppercase px-6"
              asChild
            >
              <a href="#sprint" onClick={(e) => handleNavClick(e, '#sprint', false)}>
                Apply Now
              </a>
            </Button>
          </nav>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon"
                className="text-foreground"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-background border-border">
              <SheetHeader>
                <SheetTitle className="text-left font-black tracking-tight text-foreground">
                  HIDDEN GENIUS LABS
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 mt-12">
                <nav className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      onClick={(e) => handleNavClick(e, link.href, link.external)}
                      className="text-lg font-bold tracking-wide uppercase text-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  ))}
                  <div className="pt-6 border-t border-border">
                    <Button 
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold tracking-wide uppercase h-12"
                      asChild
                    >
                      <a href="#sprint" onClick={(e) => handleNavClick(e, '#sprint', false)}>
                        Apply Now
                      </a>
                    </Button>
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
