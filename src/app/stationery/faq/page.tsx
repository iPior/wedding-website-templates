import { weddingConfig } from "@/lib/wedding-config";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@wedding/ui";

export default function StationeryFaqPage() {
  const { faq } = weddingConfig;

  return (
    <div className="space-y-16 text-center">
      <div className="space-y-4" style={{ animation: "fadeIn 1s ease-out forwards", opacity: 0 }}>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-light tracking-wide text-neutral-800 sm:text-5xl">
          Questions &amp; Answers
        </h1>
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-neutral-300/50" />
          <span className="text-xs text-neutral-300">✽</span>
          <div className="h-px w-12 bg-neutral-300/50" />
        </div>
        <p className="font-[family-name:var(--font-body)] text-sm italic text-neutral-500">
          Everything you need to know about our celebration.
        </p>
      </div>

      <div className="mx-auto max-w-xl" style={{ animation: "fadeIn 1s ease-out 0.3s forwards", opacity: 0 }}>
        <Accordion type="single" collapsible className="w-full">
          {faq.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-neutral-200/60">
              <AccordionTrigger className="py-5 text-left font-[family-name:var(--font-display)] text-base font-normal tracking-wide text-neutral-700 hover:text-neutral-900 [&>svg]:text-neutral-300">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 font-[family-name:var(--font-body)] text-sm leading-relaxed text-neutral-500">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
