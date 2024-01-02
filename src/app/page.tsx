import DashboardCardsTop from '@/components/DashboardCardsTop';
import DashboardMiddleSection from '@/components/DashboardMiddleSection';

export default function Home() {
  return (
    <main className="bg-gray-100 min-h-screen">
      <DashboardCardsTop />
      <DashboardMiddleSection />
    </main>
  );
}
