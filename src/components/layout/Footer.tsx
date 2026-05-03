export function Footer() {
  return (
    <footer className="bg-bg-subtle border-t border-line mt-(--spacing-section)">
      <div className="max-w-(--container-content) mx-auto px-6 lg:px-12 py-16 grid gap-12 md:grid-cols-4">
        <div>
          <p className="font-display text-2xl font-light tracking-tight text-ink">Maria Levi</p>
          <p className="mt-4 text-sm text-soft max-w-xs">
            Editorial · Personal brand · Commercial photography. Based in New Jersey — serving
            Manhattan, Long Island City, Hoboken, Jersey City, Princeton and beyond.
          </p>
        </div>
        <div>
          <h5 className="font-body text-xs uppercase tracking-[0.18em] text-muted">Explore</h5>
          <ul className="mt-4 space-y-2 text-sm">
            <li>Portfolio</li>
            <li>Services</li>
            <li>Journal</li>
            <li>FAQ</li>
            <li>Testimonials</li>
          </ul>
        </div>
        <div>
          <h5 className="font-body text-xs uppercase tracking-[0.18em] text-muted">Connect</h5>
          <ul className="mt-4 space-y-2 text-sm">
            <li>Instagram</li>
            <li>Pinterest</li>
            <li>Contact</li>
            <li>Client Gallery</li>
          </ul>
        </div>
        <div>
          <h5 className="font-body text-xs uppercase tracking-[0.18em] text-muted">
            Receive updates
          </h5>
          <p className="mt-4 text-sm text-soft">Newsletter form — Phase 3</p>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="max-w-(--container-content) mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row justify-between text-xs text-muted gap-2">
          <p>© {new Date().getFullYear()} Maria Levi Photography</p>
          <p>Privacy Policy · Terms of Service · Cookie Notice</p>
        </div>
      </div>
    </footer>
  )
}
