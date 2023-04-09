import { Cases, Hero } from '@/components/home';
import { Footer } from '@/components/shared';

export function Index() {
  return (
    <div className="bg-[#f3f3f3]">
      <Hero />
      <Cases />
      <Footer />
    </div>
  );
}

export default Index;
