
import { jsPDF } from 'jspdf';

/**
 * Generates a 23-page PDF document for 'The Business of Life: Student Edition'
 */
export const generatePDF = async () => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'letter'
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 72; // 1 inch
      const contentWidth = pageWidth - margin * 2;

      const addPageNumber = (pageNum) => {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(String(pageNum), pageWidth - margin, pageHeight - 40, { align: 'right' });
      };

      const addChapterHeader = (title) => {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(24);
        doc.setTextColor(245, 158, 11); // Amber accent
        doc.text(title, margin, margin + 20);
        doc.setDrawColor(245, 158, 11);
        doc.setLineWidth(2);
        doc.line(margin, margin + 30, margin + 100, margin + 30);
        doc.setTextColor(0, 0, 0);
      };

      const addBodyText = (text, yPos) => {
        doc.setFont('times', 'normal');
        doc.setFontSize(12);
        const lines = doc.splitTextToSize(text, contentWidth);
        doc.text(lines, margin, yPos);
        return yPos + (lines.length * 15);
      };

      // --- PAGE 1: Cover Page ---
      doc.setFillColor(15, 23, 42);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
      
      doc.setFillColor(245, 158, 11);
      doc.rect(0, pageHeight - 100, pageWidth, 20, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(36);
      doc.text('THE BUSINESS', margin, 200);
      doc.text('OF LIFE', margin, 240);
      
      doc.setFontSize(18);
      doc.setTextColor(245, 158, 11);
      doc.text('STUDENT EDITION - FREE SAMPLE', margin, 270);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(14);
      doc.setTextColor(200, 200, 200);
      doc.text('By Adam Bond Devereau', margin, 320);
      doc.text('Hidden Genius Labs LLC', margin, pageHeight - 50);

      // --- PAGE 2: Copyright ---
      doc.addPage();
      doc.setTextColor(0, 0, 0);
      doc.setFont('times', 'normal');
      doc.setFontSize(10);
      doc.text('Copyright © 2026 Hidden Genius Labs LLC', margin, pageHeight - margin);
      doc.text('All rights reserved.', margin, pageHeight - margin + 15);

      // --- PAGE 3: Author's Note (Part 1) ---
      doc.addPage();
      addPageNumber(3);
      addChapterHeader("Author's Note");
      let y = addBodyText("This book wasn't supposed to exist. I built this system because I was failing. The traditional educational model didn't work for my brain, and the advice to 'just work harder' was leading me straight into burnout.", margin + 70);
      y = addBodyText("The Four Burners theory suggests that life is a stove with four burners: Family, Friends, Health, and Work. The theory states that to be successful, you have to cut off one burner. To be really successful, you have to cut off two.", y + 20);
      
      // --- PAGE 4: Author's Note (Part 2) ---
      doc.addPage();
      addPageNumber(4);
      y = addBodyText("I refuse to accept that premise. This manual is the integrated system that proves you don't have to choose. When I looked around at my peers, I saw the same exhaustion. We were all running on a treadmill that was speeding up, with no off switch in sight.", margin + 40);
      
      // --- PAGE 5: Author's Note (Part 3) ---
      doc.addPage();
      addPageNumber(5);
      y = addBodyText("The tools in this book are not theoretical. They were forged in the fire of actual academic and personal struggle. I tested them, refined them, and threw out anything that didn't yield immediate, tangible results.", margin + 40);

      // --- PAGE 6: Author's Note (Part 4) ---
      doc.addPage();
      addPageNumber(6);
      y = addBodyText("If you are reading this, you are likely looking for a way out of the burnout cycle. You hold in your hands the exact blueprint I used to reclaim my time, my health, and my sanity, without sacrificing my ambition. Welcome to the system.", margin + 40);

      // --- PAGE 7: Find Your Road First (Part 1 - Book Page 10) ---
      doc.addPage();
      addPageNumber(10);
      addChapterHeader("Find Your Road First");
      y = addBodyText("Before you can optimize your engine, you need to know what road you're driving on. Most students are driving a Ferrari on a dirt road, wondering why the ride is so bumpy. The Identity Matrix is the first tool because without it, efficiency is just getting to the wrong destination faster.", margin + 70);

      // --- PAGE 8: Find Your Road First (Part 2 - Book Page 11) ---
      doc.addPage();
      addPageNumber(11);
      y = addBodyText("We spend so much time trying to meet the expectations of our parents, our teachers, and our peers that we forget to ask ourselves what we actually want. The Identity Matrix forces you to strip away the noise and define your core operating principles.", margin + 40);

      // --- PAGE 9: Introduction: The Stove (Part 1 - Book Page 12) ---
      doc.addPage();
      addPageNumber(12);
      addChapterHeader("Introduction: The Stove");
      y = addBodyText("Look at the stove. The burners are all connected to the same gas line. When you turn one up, the others don't necessarily have to go down if you increase the total gas supply. That's what this system does: it increases your total capacity.", margin + 70);

      // --- PAGE 10: Introduction: The Stove (Part 2 - Book Page 13) ---
      doc.addPage();
      addPageNumber(13);
      y = addBodyText("Capacity is not fixed. It is a muscle that can be trained. By optimizing how you rest, how you communicate, and how you process failure, you effectively widen the gas line. You get more output for the same amount of input.", margin + 40);

      // --- PAGE 11: Introduction: The Stove (Part 3 - Book Page 14) ---
      doc.addPage();
      addPageNumber(14);
      y = addBodyText("The traditional model tells you to manage your time. Time management is a defensive strategy. It assumes a scarcity of resources. Energy management, which is what we teach here, is an offensive strategy. It focuses on maximizing the quality of the hours you have.", margin + 40);

      // --- PAGE 12: Introduction: The Stove (Part 4 - Book Page 15) ---
      doc.addPage();
      addPageNumber(15);
      y = addBodyText("As you progress through these tools, remember that they are interconnected. The Output Engine relies on the Energy Audit. The Network Map is fueled by the Communication Protocol. Do not skip steps.", margin + 40);

      // --- PAGE 13: Chapter One: The Myth of Separation (Part 1 - Book Page 16) ---
      doc.addPage();
      addPageNumber(16);
      addChapterHeader("Chapter One: The Myth of Separation");
      y = addBodyText("We are taught to compartmentalize. School is school. Life is life. Work is work. But your brain doesn't know the difference. Stress from a failing grade bleeds into your relationships. A fight with a friend destroys your focus for studying. The system must be integrated because you are integrated.", margin + 70);

      // --- PAGE 14: Chapter One: The Myth of Separation (Part 2 - Book Page 17) ---
      doc.addPage();
      addPageNumber(17);
      y = addBodyText("When you try to build walls between the different areas of your life, you spend an enormous amount of energy just maintaining those walls. It is exhausting. Integration means allowing your personal growth to fuel your academic success, and vice versa.", margin + 40);

      // --- PAGE 15: Chapter One: The Myth of Separation (Part 3 - Book Page 18) ---
      doc.addPage();
      addPageNumber(18);
      y = addBodyText("Consider the concept of 'bleed-over'. Positive bleed-over happens when a win in the gym gives you the confidence to speak up in class. Negative bleed-over happens when sleep deprivation makes you snap at your family. We want to engineer positive bleed-over.", margin + 40);

      // --- PAGE 16: Chapter One: The Myth of Separation (Part 4 - Book Page 19) ---
      doc.addPage();
      addPageNumber(19);
      y = addBodyText("The goal is to become a singular, unified force. You are not a student from 8 AM to 3 PM and a human being the rest of the time. You are a human being who is currently studying. That shift in perspective changes everything.", margin + 40);

      // --- PAGE 17: Chapter Two: You Already Have the OS (Book Page 20) ---
      doc.addPage();
      addPageNumber(20);
      addChapterHeader("Chapter Two: You Already Have the OS");
      y = addBodyText("You don't need a new brain. You just need to update the operating system. The hardware is fine; the software is buggy. We're going to patch the bugs. You already possess the raw intelligence required to succeed; it is simply being misdirected by outdated programming.", margin + 70);

      // --- PAGE 18: Tool 3: The Signal Board (Part 1 - Book Page 81) ---
      doc.addPage();
      addPageNumber(81);
      addChapterHeader("Tool 3: The Signal Board");
      y = addBodyText("The Signal Board is your daily dashboard. It's how you know if you're winning or losing the day before the day is over.", margin + 70);
      y = addBodyText("Step 1: Identify your core metrics. What are the 3-5 lead indicators that predict your success? Not lag indicators like grades, but lead indicators like hours of deep work or hours of sleep.", y + 20);

      // --- PAGE 19: Tool 3: The Signal Board (Part 2 - Book Page 82) ---
      doc.addPage();
      addPageNumber(82);
      y = addBodyText("Step 2: Set the baseline. You cannot improve what you do not measure. For one week, simply track your core metrics without trying to change them. Be brutally honest with yourself.", margin + 40);

      // --- PAGE 20: Tool 3: The Signal Board (Part 3 - Book Page 83) ---
      doc.addPage();
      addPageNumber(83);
      y = addBodyText("Step 3: Track without judgment. The Signal Board is a diagnostic tool, not a weapon to beat yourself up with. If a metric is red, it just means the system needs an adjustment. It is data, not an indictment of your character.", margin + 40);

      // --- PAGE 21: Tool 3: The Signal Board (Part 4 - Book Page 84) ---
      doc.addPage();
      addPageNumber(84);
      y = addBodyText("Step 4: The Daily Review. Spend 5 minutes at the end of every day reviewing your Signal Board. What went well? What went wrong? What is the one adjustment you will make tomorrow?", margin + 40);

      // --- PAGE 22: Tool 3: The Signal Board (Part 5 - Book Page 85) ---
      doc.addPage();
      addPageNumber(85);
      y = addBodyText("Over time, the Signal Board becomes intuitive. You will start to feel when a metric is slipping before you even write it down. That is the moment you have successfully installed the new operating system.", margin + 40);

      // --- PAGE 23: Final CTA (Book Page 86) ---
      doc.addPage();
      addPageNumber(86);
      doc.setFillColor(15, 23, 42);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(24);
      doc.text('READY FOR THE FULL SYSTEM?', margin, margin + 50);
      
      doc.setFontSize(14);
      doc.setTextColor(245, 158, 11);
      doc.text('Get the Book on Amazon', margin, margin + 100);
      doc.text('Download MaxCoach.app', margin, margin + 130);
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text('Copyright © 2026 Hidden Genius Labs LLC', margin, pageHeight - margin);

      const pdfBlob = doc.output('blob');
      resolve(pdfBlob);
    } catch (error) {
      reject(error);
    }
  });
};
