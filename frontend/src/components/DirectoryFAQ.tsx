import { useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// Mock data based on categories
const faqData: Record<string, { q: string, a: string }[]> = {
  default: [
    { q: "How do I list my business on Kasaragod Hub?", a: "You can click on the 'Suggest a Listing' button and fill out the details. Our team will verify and add it." },
    { q: "Is it free to use Kasaragod Hub?", a: "Yes, searching and browsing businesses is completely free." },
    { q: "How can I update my business information?", a: "If you own a listed business, you can claim it or contact our support team to update your details." }
  ],
  "Clinics": [
    { q: "What are the average consultation fees for clinics in Kasaragod?", a: "Consultation fees vary but typically range from ₹150 to ₹500 depending on the specialty." },
    { q: "Do these clinics offer emergency services?", a: "Some do, but it is best to call the clinic directly or check their profile for 24/7 service availability." },
    { q: "Can I book an appointment online?", a: "Many clinics listed on our platform offer phone numbers for direct booking. Online booking via our platform is coming soon." }
  ],
  "Restaurants": [
    { q: "What is the best restaurant for family dining in Kasaragod?", a: "There are many great options. You can filter our directory by 'Ratings' to find the top-rated family restaurants." },
    { q: "Do restaurants in Kasaragod offer home delivery?", a: "Yes, a majority of restaurants listed offer delivery directly or via local delivery apps." },
    { q: "Are vegetarian-only restaurants available?", a: "Absolutely! You can find dedicated vegetarian restaurants by searching 'veg' in the directory." }
  ]
};

export function DirectoryFAQ({ categoryName, location }: { categoryName?: string, location?: string }) {
  const categoryKey = categoryName && faqData[categoryName] ? categoryName : 'default';
  const faqs = faqData[categoryKey];

  useEffect(() => {
    // Inject JSON-LD
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [faqs]);

  return (
    <section className="mt-16 border-t border-gray-100 pt-16 mb-20 md:mb-0">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-black text-secondary tracking-tight mb-8 text-center">
          Frequently Asked Questions
          {categoryName && <span className="block text-lg text-muted-foreground font-medium mt-2">about {categoryName} in {location !== 'All Locations' ? location : 'Kasaragod'}</span>}
        </h2>
        
        <Accordion className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-gray-100">
              <AccordionTrigger className="text-left font-bold text-secondary hover:text-primary transition-colors">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
