import { Cases, Hero, Navbar, Footer } from '../components';

export function Index() {
  return (
    <Navbar>
      <div className="bg-[#F3F3F3]">
        <Hero />
        <Cases />
        <Footer />
      </div>
    </Navbar>
  );
}

export default Index;
