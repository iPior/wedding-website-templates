import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@wedding/ui";
import { weddingConfig } from "@/lib/wedding-config";

export default function WatercolorFaqPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10 md:py-16">
      <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#d4a0b0]">001</p>
      <h2 className="mb-8 border-b border-[#f0e0e4] pb-4 text-5xl text-[#2c2424]" style={{ fontFamily: "var(--font-playfair), serif" }}>
        Questions and Answers
      </h2>

      <Accordion type="single" collapsible className="w-full">
        {weddingConfig.faq.map((item, index) => (
          <AccordionItem key={index} value={`faq-${index}`} className="border-b border-[#f0e0e4]">
            <AccordionTrigger className="py-7 text-left text-lg text-[#2c2424] hover:no-underline" style={{ fontFamily: "var(--font-playfair), serif" }}>
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="pb-7 text-sm leading-relaxed text-[#5a4f4f]">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
}
