import DashboardCardsTop from '@/components/dashboard/DashboardCardsTop';
import DashboardMiddleSection from '@/components/dashboard/DashboardMiddleSection';

export default function Home() {
  return (
    <main className="bg-gray-100 min-h-screen">
      <DashboardCardsTop />
      <DashboardMiddleSection />
    </main>
  );
}
