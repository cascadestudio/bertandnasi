import Marquee from "@/components/home/Marquee";

export default function AboutPage() {
  return (
    <div>
      <Marquee pageName="about" />
      <div className="px-4 md:px-8 py-16">
        <main>
          <h1 className="text-4xl md:text-5xl font-bold mb-8">About Us</h1>
          <p>Information about Bertandnasi Theater Company.</p>
          {/* Add your content here */}
        </main>
      </div>
    </div>
  );
}
