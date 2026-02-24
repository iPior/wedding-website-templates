import { PasswordForm } from "@wedding/ui";
import { weddingConfig } from "../../../wedding.config";

type PasswordPageProps = {
  searchParams: Promise<{ error?: string }>;
};

const ERROR_MESSAGES: Record<string, string> = {
  invalid: "Incorrect password. Please try again.",
  misconfigured: "SITE_PASSWORD is not configured yet.",
};

const { person1, person2 } = weddingConfig.couple;

export default async function PasswordPage({ searchParams }: PasswordPageProps) {
  const { error } = await searchParams;
  const errorMessage = error ? ERROR_MESSAGES[error] ?? "Something went wrong." : undefined;

  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16"
      style={{ backgroundColor: "#fff8f8", fontFamily: "var(--font-lato), sans-serif" }}
    >
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes grow {
          from { width: 0; }
          to   { width: 100%; }
        }
      `}</style>

      {/* Watercolor blobs */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute rounded-full blur-[100px]"
          style={{
            width: "60vw", height: "60vh",
            top: "-10%", right: "-10%",
            background: "radial-gradient(ellipse at center, rgba(255,218,233,0.4), rgba(247,224,232,0.2), transparent)",
          }}
        />
        <div
          className="absolute rounded-full blur-[100px]"
          style={{
            width: "50vw", height: "50vh",
            bottom: "-10%", left: "-10%",
            background: "radial-gradient(ellipse at center, rgba(210,217,139,0.2), rgba(255,255,227,0.3), transparent)",
          }}
        />
        <div
          className="absolute rounded-full blur-[100px]"
          style={{
            width: "30vw", height: "30vh",
            top: "40%", left: "10%",
            background: "radial-gradient(ellipse at center, rgba(247,224,232,0.15), rgba(255,255,227,0.2))",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-sm text-center">

        {/* Eyebrow */}
        <p
          className="text-xs font-light uppercase tracking-[0.4em] text-[#8a7f7f]"
          style={{ animation: "fadeInUp 0.8s ease forwards", opacity: 0 }}
        >
          You&apos;re invited
        </p>

        {/* Names */}
        <h1
          className="mt-6 text-5xl uppercase leading-[1.1] tracking-[0.25em] text-[#2c2424]"
          style={{
            fontFamily: "var(--font-playfair), serif",
            animation: "fadeInUp 0.9s ease forwards",
            animationDelay: "0.15s",
            opacity: 0,
          }}
        >
          {person1.firstName}
          <span className="block text-[0.5em] tracking-[0.5em] text-[#d4a0b0]">&</span>
          {person2.firstName}
        </h1>

        {/* Divider */}
        <div className="mx-auto mt-8 overflow-hidden">
          <div
            className="mx-auto h-[2px] bg-[#d4a0b0]"
            style={{
              animation: "grow 0.7s ease forwards",
              animationDelay: "0.6s",
              width: 0,
              maxWidth: "4rem",
            }}
          />
        </div>

        {/* Instruction */}
        <p
          className="mt-8 text-xs font-light uppercase tracking-[0.3em] text-[#8a7f7f]"
          style={{
            animation: "fadeInUp 0.8s ease forwards",
            animationDelay: "0.8s",
            opacity: 0,
          }}
        >
          Enter the password from your invitation
        </p>

        {/* Form */}
        <div
          style={{
            animation: "fadeInUp 0.8s ease forwards",
            animationDelay: "1s",
            opacity: 0,
          }}
        >
          <PasswordForm errorMessage={errorMessage} />
        </div>
      </div>
    </main>
  );
}
