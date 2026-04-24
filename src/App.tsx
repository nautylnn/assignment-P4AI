import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Menu, ChevronRight, ArrowLeft } from 'lucide-react';
import LandingPage from './components/LandingPage';
import DatasetsPage from './components/DatasetsPage';
import AssignmentDetails from './components/AssignmentDetails';
import ArtAnalysis from './components/ArtAnalysis';
import TabularEDA from './components/TabularEDA';
import TabularPipeline from './components/TabularPipeline';
import TextEDA from './components/TextEDA';
import ImageEDA from './components/ImageEDA';
import MultimodalEDA from './components/MultimodalEDA';


type Page = 'overview' | 'assignments' | 'datasets' | 'art-analysis' | 'tabular-eda' | 'tabular-pipeline' | 'text-eda' | 'image-eda' | 'multimodal-eda';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('overview');
  const [selectedDataset, setSelectedDataset] = useState<string>('');

  // Fixed Navigation Logic with History API Support
  const navigate = (page: Page, dataset?: string) => {
    setCurrentPage(page);
    if (dataset) setSelectedDataset(dataset);
    
    // Update browser history so "Back" works as expected
    window.history.pushState({ page, dataset }, "", "");
  };

  useEffect(() => {
    // Handle Browser Back/Forward buttons
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.page) {
        setCurrentPage(event.state.page);
        if (event.state.dataset) setSelectedDataset(event.state.dataset);
      } else {
        setCurrentPage('overview');
      }
    };

    // Initial history anchor
    window.history.replaceState({ page: 'overview' }, "", "");
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'overview': return <LandingPage onNavigate={navigate} />;
      case 'datasets': return <DatasetsPage onNavigate={navigate} />;
      case 'assignments': return <AssignmentDetails />;
      case 'art-analysis': return <ArtAnalysis onBack={() => navigate('overview')} title={selectedDataset} />;
      case 'tabular-eda': return <TabularEDA onBack={() => navigate('overview')} />;
      case 'tabular-pipeline': return <TabularPipeline onBack={() => navigate('overview')} />;
      case 'text-eda': return <TextEDA onBack={() => navigate('overview')} />;
      case 'image-eda': return <ImageEDA onBack={() => navigate('overview')} />;
      case 'multimodal-eda': return <MultimodalEDA onBack={() => navigate('overview')} />;

      default: return <LandingPage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-surface sticky top-0 z-50 border-b border-on-surface-variant/5">
        <nav className="flex justify-between items-center w-full px-8 py-4 max-w-[1200px] mx-auto">
            <div
              className="text-2xl font-bold tracking-tighter text-primary font-headline cursor-pointer"
              onClick={() => navigate('overview')}
            >
              Academic Curator
            </div>

            <div className="hidden md:flex items-center gap-8 font-headline tracking-tight">
              <button
                onClick={() => navigate('overview')}
                className={`text-sm font-semibold transition-colors cursor-pointer ${currentPage === 'overview' ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'}`}
              >
                Overview
              </button>
              <button
                onClick={() => navigate('assignments')}
                className={`text-sm font-semibold transition-colors cursor-pointer ${currentPage === 'assignments' ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'}`}
              >
                Assignments
              </button>
              <button
                onClick={() => navigate('datasets')}
                className={`text-sm font-semibold transition-colors cursor-pointer ${currentPage === 'datasets' ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'}`}
              >
                Datasets
              </button>
            </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-primary/5 transition-all duration-200 cursor-pointer">
              <BookOpen className="text-primary w-6 h-6" />
            </button>
            <button className="md:hidden p-2 hover:bg-primary/5 transition-all duration-200 cursor-pointer">
              <Menu className="text-primary w-6 h-6" />
            </button>
          </div>
        </nav>

        {/* Breadcrumbs */}
        <div className="bg-surface-container-low/50 border-t border-on-surface-variant/5">
          <div className="max-w-[1200px] mx-auto px-8 py-2 flex items-center gap-2 text-xs font-medium">
            <button
              onClick={() => navigate('overview')}
              className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer flex items-center gap-1"
            >
              Academic Curator
            </button>

            {currentPage !== 'overview' && (
              <>
                <ChevronRight size={14} className="text-on-surface-variant/40" />
                <span className="text-primary capitalize">
                  {currentPage.replace('-', ' ')}
                </span>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low border-t border-on-surface-variant/10 py-12 mt-20">
        <div className="max-w-[1200px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="text-lg font-bold text-primary font-headline mb-2">Programming for AI & Data Science (CO3135)</div>
            <div className="text-sm text-on-surface-variant">HCMUT – VNU-HCM | 2026</div>
            <div className="text-xs text-on-surface-variant/60 mt-4">© 2026 Academic Curator. All rights reserved.</div>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <a className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer" onClick={(e) => e.preventDefault()}>Ethics Policy</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer" onClick={(e) => e.preventDefault()}>Data Privacy</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer" onClick={(e) => e.preventDefault()}>Contact Faculty</a>
          </div>

          <div className="text-sm text-on-surface-variant/60">
            © 2026 HCMUT - VNU-HCM.
          </div>
        </div>
      </footer>
    </div>
  );
}
