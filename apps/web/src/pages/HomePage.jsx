
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Smartphone, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CountdownTimer from '@/components/CountdownTimer.jsx';
import StudentStoryCard from '@/components/StudentStoryCard.jsx';
import ToolkitCard from '@/components/ToolkitCard.jsx';
import TestimonialQuote from '@/components/TestimonialQuote.jsx';
import StudentSprintForm from '@/components/StudentSprintForm.jsx';
import TeacherCodesignForm from '@/components/TeacherCodesignForm.jsx';
import CreativeCouncilForm from '@/components/CreativeCouncilForm.jsx';
import PDFGenerator from '@/components/PDFGenerator.jsx';
import PreOrderModal from '@/components/PreOrderModal.jsx';

const HomePage = () => {
  const [isPreOrderModalOpen, setIsPreOrderModalOpen] = useState(false);

  const tools = [
    { title: 'The Identity Matrix', description: 'Define who you are outside of the classroom to build unshakeable confidence.' },
    { title: 'The Energy Audit', description: 'Track where your mental and physical energy goes, and plug the leaks.' },
    { title: 'The Output Engine', description: 'A system for doing deep work that actually moves the needle.' },
    { title: 'The Network Map', description: 'Build authentic relationships that open doors without feeling transactional.' },
    { title: 'The Failure Resume', description: 'Reframe setbacks into data points for inevitable future success.' },
    { title: 'The Wealth Blueprint', description: 'Financial literacy fundamentals they forgot to teach in high school.' },
    { title: 'The Communication Protocol', description: 'Mastering the art of writing emails, speaking up, and pitching ideas.' },
    { title: 'The Rest Ritual', description: 'Systematizing recovery so you can sprint harder without breaking down.' }
  ];

  return (
    <>
      <Helmet>
        <title>The Business of Life: Student Edition | Hidden Genius Labs</title>
        <meta name="description" content="Eight tools. One integrated system. No burnout. No sacrifice. Leveling up isn't optional." />
      </Helmet>
      
      <div className="bg-background text-foreground min-h-screen">
        
        {/* SECTION 1 - HERO + BOOK SALES */}
        <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-grid-pattern">
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-background to-transparent" />
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide uppercase mb-8 border border-primary/20">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Pre-Orders Open
                </div>
                <h1 className="mb-6">
                  Leveling up <br/>
                  <span className="text-primary">isn't optional.</span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-4">
                  The Four Burners myth says you have to choose between work, family, friends, and health. We say you don't.
                </p>
                <p className="text-lg text-foreground/80 mb-10 font-bold border-l-4 border-primary pl-4">
                  Eight tools. One integrated system. No burnout. No sacrifice.
                </p>
                
                <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-16">
                  <Button 
                    size="lg" 
                    onClick={() => setIsPreOrderModalOpen(true)}
                    className="h-14 px-8 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <BookOpen className="mr-2 w-5 h-5" />
                    Softcover Edition — $14.99
                  </Button>
                  
                  <Button 
                    size="lg" 
                    variant="outline" 
                    onClick={() => setIsPreOrderModalOpen(true)}
                    className="h-14 px-8 text-lg font-bold border-border text-foreground hover:bg-muted"
                  >
                    <Smartphone className="mr-2 w-5 h-5" />
                    E-book Edition — $4.99
                  </Button>

                  <PDFGenerator 
                    asButton 
                    variant="secondary" 
                    className="h-14 px-8 text-lg font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  />
                </div>

                <div className="space-y-8">
                  <TestimonialQuote 
                    quote="The Four Burners theory says you have to choose. This book proves you don't." 
                    index={0} 
                  />
                  <TestimonialQuote 
                    quote="This helped me understand I'm not the only one struggling. Everyone's voice matters." 
                    index={1} 
                  />
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative mx-auto max-w-md lg:max-w-full space-y-8"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                  <img
                    src="/images/book-cover-full.webp"
                    alt="The Business of Life — full paperback cover"
                    className="relative z-10 w-full rounded-2xl shadow-2xl shadow-black/50 border border-border transform -rotate-2 hover:rotate-0 transition-transform duration-500"
                    width={2000}
                    height={1461}
                  />
                </div>
                
                <div id="sample">
                  <PDFGenerator />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 2 - THE PROOF */}
        <section className="py-24 bg-card border-y border-border relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-4"
              >
                This system already works.
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-primary font-bold"
              >
                One student. One system. Real results.
              </motion.p>
            </div>
            
            <StudentStoryCard 
              image="https://images.unsplash.com/photo-1520393166118-b7cfb87d5ae9"
              headline="Adam's First Student"
              description={[
                "In a single 3-hour 1-on-1 coaching session, one student went from a shaky presentation and a short video of a few professors praising his campus-wide app idea after coming up with it at a campus hackathon... to a complete professional pitch deck with market analysis, feasibility studies, and full execution plan.",
                "That one focused session landed him a paid summer job right out of college to lead the development of the program he created — positioning him to level up and run the campus rollout and so much more now that he has this book to help guide him.",
                "This is exactly the kind of real-time coaching breakthrough The Business of Life (and the upcoming Max AI Coach) is built to deliver."
              ]}
            />
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center text-2xl font-bold mt-16 text-muted-foreground"
            >
              This is just the beginning.
            </motion.p>
          </div>
        </section>

        {/* SECTION 3 - 90-DAY STUDENT SPRINT */}
        <section id="sprint" className="py-24 relative overflow-hidden bg-background">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1503148206741-9028d4b0b279)', backgroundSize: 'cover', backgroundPosition: 'center', mixBlendMode: 'screen' }} />
          <div className="absolute inset-0 bg-background/90" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-bold tracking-wide uppercase mb-6 border border-destructive/20">
                  Documentary Cast Call
                </div>
                <h2 className="mb-6 leading-tight">
                  We're looking for 5-20 students to level up in the next 90 days.
                </h2>
                <p className="text-xl text-primary font-bold mb-8">
                  You'll be featured in the documentary. Your story matters.
                </p>
                
                <ul className="space-y-6 mb-10">
                  {[
                    "Be the first to experience AI coaching that actually knows you — built around your goals, your life, your next move. And if you qualify, you get direct access to a seasoned executive who's already solved the problems you're standing in front of",
                    'Daily execution of the eight foundational tools',
                    'Real-time documentation of your transformation',
                    'Direct access to proven, easy to use coaching methodologies'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="mt-1 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <ArrowRight className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-lg font-medium text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="bg-card/50 backdrop-blur-sm border border-border p-8 rounded-3xl mt-8">
                  <CountdownTimer />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <StudentSprintForm />
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 4 - SUMMER TEACHER CO-DESIGN EVENT */}
        <section id="teachers" className="py-24 bg-card border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="mb-4">Help us build Phase 2.</h2>
                <p className="text-xl text-primary font-bold mb-6">
                  We're recruiting 5-10 teachers for a special summer event.
                </p>
                <p className="text-lg text-foreground/80 leading-relaxed mb-8">
                  Teachers see the system in action every day. You know where the gaps are. We want your insights to shape what comes next as we expand the ecosystem to families.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-background rounded-xl p-6 border border-border">
                    <h4 className="text-primary font-bold text-2xl mb-2">4 Weeks</h4>
                    <p className="text-muted-foreground font-medium">Intensive collaborative sprint</p>
                  </div>
                  <div className="bg-background rounded-xl p-6 border border-border">
                    <h4 className="text-primary font-bold text-2xl mb-2">1-2 Days</h4>
                    <p className="text-muted-foreground font-medium">Per week commitment</p>
                  </div>
                  <div className="bg-background rounded-xl p-6 border border-border col-span-2">
                    <h4 className="text-foreground font-bold text-xl mb-2">The Mission</h4>
                    <p className="text-muted-foreground font-medium">Co-design the Family Edition tools alongside the core team.</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground font-bold tracking-wide uppercase">
                  Summer event only. Limited spots.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <TeacherCodesignForm />
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 5 - SHAPE THE MOVEMENT */}
        <section id="council" className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1703463890291-e65bbfbe358c" 
              alt="Collaborative meeting" 
              className="w-full h-full object-cover opacity-20 grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/50" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="mb-6 leading-tight text-3xl md:text-5xl space-y-4">
                  <span className="block">
                    This isn't a documentary we're making <span className="text-primary italic">for</span> you.
                  </span>
                  <span className="block">
                    It's a documentary we're making <span className="text-primary italic">with</span> you.
                  </span>
                </h2>
                <p className="text-xl text-foreground/90 font-medium mb-10 border-l-4 border-primary pl-4">
                  Vote on the stories we follow, suggest new directions, and see your input directly influence what gets made.
                </p>
                <p className="text-base text-muted-foreground font-bold">
                  You're not watching a show. You're building it with us.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <CreativeCouncilForm />
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 6 - THE TOOLKIT + APP */}
        <section className="py-24 bg-card border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-4"
              >
                The system in your pocket
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-primary font-bold mb-4"
              >
                Eight tools. One integrated system.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-muted-foreground max-w-2xl mx-auto space-y-4"
              >
                <p>
                  A book that challenges how you think. Guides that tell you exactly what to do next, track your progress and keep you on point without burning out.
                </p>
                <p>
                  Giving you a personal AI coach in your pocket that shows up when life gets loud and never forgets a thing that's important to you. Whether you're still in high school or already in the thick of your twenties — you're not figuring this out alone anymore.
                </p>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {tools.map((tool, index) => (
                <ToolkitCard key={index} number={index + 1} {...tool} index={index} />
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center bg-background p-10 rounded-2xl border border-border"
            >
              <Smartphone className="w-12 h-12 text-primary mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Take the tools everywhere</h3>
              <div className="text-muted-foreground mb-8 max-w-2xl mx-auto space-y-4">
                <p>
                  Download the MaxCoach app. After the Beta test, you will be able to track your progress across all eight tools, set goals, reminders, etc., and get real-time guidance to keep you on the path toward becoming the best version of yourself.
                </p>
                <p>
                  No more excuses or obstacles. Just opportunities to level up every day.
                </p>
              </div>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold border-primary text-primary hover:bg-primary/10" asChild>
                <a href="https://maxcoach.app" target="_blank" rel="noopener noreferrer">
                  Download MaxCoach App
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* SECTION 7 - AUTHOR BIO + FINAL CTA */}
        <section id="author" className="relative py-32 overflow-hidden bg-background">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1590927938000-82cb790f8591)', backgroundSize: 'cover', backgroundPosition: 'center', mixBlendMode: 'screen' }} />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-5"
              >
                <div className="relative p-2 bg-gradient-to-br from-primary to-background rounded-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1575383596664-30f4489f9786" 
                    alt="Adam - Author" 
                    className="w-full rounded-xl object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-7"
              >
                <h2 className="mb-6">Built by someone who needed it.</h2>
                <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
                  <p>
                    Adam started as an F student. The traditional system didn't work for him, and burnout came.
                  </p>
                  <p>
                    Instead of accepting that, he rewired his brain. Then later spent years synthesizing psychology, productivity, human nature and leadership principles into a framework that actually functioned in the real world.
                  </p>
                  <p className="font-bold text-primary">
                    He built a system that works. Now, he's handing over the blueprint.
                  </p>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center bg-card border border-border rounded-3xl p-12 lg:p-20"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6">
                The blueprint is here. <br/>
                <span className="text-primary">The movement is starting.</span>
              </h2>
              <p className="text-2xl font-bold text-muted-foreground mb-12">
                Be part of it.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg" 
                  onClick={() => setIsPreOrderModalOpen(true)}
                  className="h-14 px-8 text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Pre-Order Now
                </Button>
                <Button size="lg" variant="secondary" className="h-14 px-8 text-base font-bold" asChild>
                  <a href="#sprint">Apply for Sprint</a>
                </Button>
                <Button size="lg" variant="secondary" className="h-14 px-8 text-base font-bold" asChild>
                  <a href="#teachers">Teacher Event</a>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-base font-bold border-primary text-primary hover:bg-primary/10" asChild>
                  <a href="#council">Creative Council</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <PreOrderModal 
        isOpen={isPreOrderModalOpen} 
        onClose={() => setIsPreOrderModalOpen(false)} 
      />
    </>
  );
};

export default HomePage;
