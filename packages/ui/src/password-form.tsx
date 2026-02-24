type PasswordFormProps = {
  errorMessage?: string;
};

export function PasswordForm({ errorMessage }: PasswordFormProps) {
  return (
    <form action="/auth/unlock" method="post" className="mt-8 space-y-6">
      <div className="relative">
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="password"
          className="w-full border-b border-[#d4a0b0] bg-transparent pb-3 pt-1 text-center text-sm uppercase tracking-[0.3em] text-[#2c2424] outline-none transition-colors duration-300 placeholder:text-[#8a7f7f]/50 focus:border-[#2c2424]"
        />
      </div>

      {errorMessage ? (
        <p role="alert" className="text-xs uppercase tracking-[0.2em] text-red-400">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        className="w-full bg-[#2c2424] px-8 py-4 text-[11px] uppercase tracking-[0.3em] text-[#fff8f8] transition-colors duration-300 hover:bg-[#d4a0b0]"
      >
        Enter
      </button>
    </form>
  );
}
