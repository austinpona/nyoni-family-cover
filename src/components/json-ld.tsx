/**
 * JSON-LD is injected as an inline script. The existing CSP already allows
 * 'unsafe-inline' for script-src, so no CSP change is needed here — and none
 * should be made.
 *
 * The payload is built from constants in this repo, never from user input, so
 * there is nothing for an injection to ride in on. The `<` escape is belt and
 * braces against a future caller passing something less careful.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
