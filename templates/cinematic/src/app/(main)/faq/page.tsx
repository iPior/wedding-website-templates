import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@wedding/ui";
import { weddingConfig } from "../../../../wedding.config";

export default function FaqPage() {
  return (
    <>
      {/* ═══ SCENE 1 — Page Header ═══ */}
      <section className="flex min-h-[25vh] items-center justify-center bg-[#fff8f8] px-6 text-center">
        <div>
          <h1
            className="text-4xl uppercase tracking-[0.3em] text-[#2c2424] sm:text-5xl lg:text-6xl"
            style={{
              fontFamily: "var(--font-display)",
              animation: "fadeInUp 1.2s ease forwards",
              animationDelay: "0.3s",
              opacity: 0,
            }}
          >
            Questions
          </h1>
          <div className="mx-auto mt-6 overflow-hidden">
            <div
              className="mx-auto h-[2px] bg-[#d4a0b0]"
              style={{
                animation: "grow 0.8s ease forwards",
                animationDelay: "1s",
                width: 0,
                maxWidth: "6rem",
              }}
            />
          </div>
          <p
            className="mt-4 text-[11px] font-light uppercase tracking-[0.3em] text-[#8a7f7f]"
            style={{
              animation: "fadeInUp 1s ease forwards",
              animationDelay: "1.3s",
              opacity: 0,
            }}
          >
            Everything you need to know
          </p>
        </div>
      </section>

      {/* ═══ SCENE 2 — FAQ Accordion ═══ */}
      <section className="border-t border-[#f0e0e4] bg-[#fff8f8] py-14 sm:py-20">
        <div
          className="mx-auto max-w-3xl px-6"
          style={{
            animation: "fadeInUp 1s ease forwards",
            animationDelay: "0.3s",
            opacity: 0,
          }}
        >
          <Accordion type="single" collapsible className="w-full">
            {weddingConfig.faq.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-[#f0e0e4]"
              >
                <AccordionTrigger
                  className="py-6 text-left text-base font-light tracking-wide text-[#2c2424] hover:no-underline sm:text-lg"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-sm font-light leading-relaxed text-[#8a7f7f]">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
