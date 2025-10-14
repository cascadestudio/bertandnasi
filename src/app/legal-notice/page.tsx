export default function LegalNoticePage() {
  return (
    <main className="min-h-screen bg-white px-4 md:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Legal Notice</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Publisher Information</h2>
          <p className="mb-2">Bertandnasi</p>
          <p className="mb-2">Email: bertandnasi@gmail.com</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Hosting</h2>
          <p className="mb-2">
            This website is hosted by [Hosting Provider Name]
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
          <p className="mb-2">
            All content on this website, including but not limited to text,
            images, graphics, and videos, is the property of Bertandnasi unless
            otherwise noted.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Privacy</h2>
          <p className="mb-2">
            We respect your privacy. For more information about how we handle
            your data, please contact us at bertandnasi@gmail.com.
          </p>
        </section>
      </div>
    </main>
  );
}
