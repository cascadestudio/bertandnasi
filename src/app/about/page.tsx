import Marquee from "@/components/home/Marquee";

export default function AboutPage() {
  return (
    <div>
      <Marquee pageName="about" />
      <div className="min-h-screen bg-white">
        <main className="grid grid-cols-3 min-h-screen">
          {/* Left Column - Bert */}
          <div className="flex flex-col items-start justify-start p-8 border-r-2 border-[var(--color-green)]">
            <h1 className="text-6xl md:text-8xl font-bold show-title-hover mb-8">
              Bert
            </h1>
            <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Bert Image</span>
            </div>
          </div>

          {/* Middle Column - & */}
          <div className="flex flex-col items-center justify-start p-8 border-r-2 border-[var(--color-green)]">
            <h1 className="text-6xl md:text-8xl font-bold text-[var(--color-green)] mb-8">
              &
            </h1>
            <div className="text-left space-y-6">
              <p className="text-black text-base leading-relaxed">
                Bert and Nasi is a contemporary performance duo that creates
                innovative theatrical experiences. Their work explores the
                boundaries between traditional performance and modern artistic
                expression, creating immersive shows that challenge audiences
                and push creative boundaries.
              </p>
              <p className="text-black text-base leading-relaxed">
                Since their formation, they have performed internationally,
                bringing their unique vision to stages around the world. Their
                performances combine physical theater, multimedia elements, and
                experimental storytelling techniques.
              </p>
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-black mb-4">
                  Awards
                </h3>
                <p className="text-black text-base leading-relaxed">
                  In 2020, they received the prestigious Contemporary
                  Performance Award for their groundbreaking work in
                  experimental theater, recognizing their contribution to the
                  evolution of performance art.
                </p>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-black mb-4">Team</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-base font-medium text-black">
                      Emma Dupont
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-black">
                      Emma Dupont
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-black">
                      Emma Dupont
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Nasi */}
          <div className="flex flex-col items-end justify-start p-8">
            <h1 className="text-6xl md:text-8xl font-bold show-title-hover mb-8">
              Nasi
            </h1>
            <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Nasi Image</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
