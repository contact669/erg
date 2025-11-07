import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import Hero from '@/app/_components/hero';
import ServicesOverview from '@/app/_components/services-overview';
import ProcessSteps from './_components/process-steps';
import FeaturedProjects from './_components/featured-projects';
import Testimonials from './_components/testimonials';
import CtaBanner from './_components/cta-banner';
import AnimatedSection from '@/components/animated-section';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-grow">
        <Hero />
        <AnimatedSection>
          <ServicesOverview />
        </AnimatedSection>
        <AnimatedSection>
          <ProcessSteps />
        </AnimatedSection>
        <AnimatedSection>
          <FeaturedProjects />
        </AnimatedSection>
        <AnimatedSection>
          <Testimonials />
        </AnimatedSection>
        <AnimatedSection>
          <CtaBanner />
        </AnimatedSection>
      </main>
      <SiteFooter />
    </div>
  );
}
