import Intro from "@/components/about/intro";
import PhotoGallery from "@/components/about/photos";
import Information from "@/components/about/info";

export default function Page() {
  return (
    <main className="min-h-[100dvh]">
      <section className="container mx-auto px-4">
        <Intro />
        <PhotoGallery />
        <Information />
      </section>
    </main>
  );
}
