const PHONE = '256707113630'; // +256 707 113630, in wa.me's international-no-plus format
const MESSAGE = "Hi! I'd like to know more about Roosty's Homes.";

// Floating WhatsApp button — fixed to every public page via the shared
// layout. Opens a chat directly (wa.me), not just a phone-call/SMS intent.
export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Roosty's Homes on WhatsApp"
      className="fixed right-5 bottom-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:bg-[#20bd5a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-800"
    >
      <svg viewBox="0 0 32 32" className="h-8 w-8" fill="currentColor" aria-hidden="true">
        <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.36.66 4.63 1.906 6.598L4 29l7.59-1.876A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3zm0 21.75c-1.93 0-3.822-.52-5.47-1.505l-.392-.233-4.51 1.115 1.19-4.393-.256-.406A9.71 9.71 0 0 1 5.25 15c0-5.93 4.824-10.75 10.754-10.75S26.75 9.07 26.75 15 21.933 24.75 16.004 24.75z" />
        <path d="M21.6 17.66c-.3-.15-1.77-.874-2.045-.974-.274-.1-.474-.15-.673.15-.2.3-.773.973-.948 1.174-.174.2-.35.225-.65.075-.3-.15-1.264-.466-2.408-1.485-.89-.793-1.49-1.773-1.665-2.073-.174-.3-.019-.462.131-.611.135-.134.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.673-1.62-.923-2.22-.243-.583-.49-.504-.673-.513l-.573-.01c-.2 0-.525.075-.8.375-.274.3-1.048 1.024-1.048 2.497 0 1.473 1.073 2.897 1.223 3.097.15.2 2.111 3.224 5.114 4.522.714.308 1.271.492 1.705.63.716.228 1.368.196 1.883.119.574-.086 1.766-.722 2.016-1.42.25-.697.25-1.294.174-1.42-.074-.125-.274-.2-.573-.35z" />
      </svg>
    </a>
  );
}
