import Navigation from './Navigation';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <main style={{fontFamily:"Poppins"}}>
        {children}
      </main>
    </div>
  );
}