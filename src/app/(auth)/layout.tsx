import Navbar from "./Navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Navbar />
      <div className="relative mx-auto h-[86vh] max-h-screen overflow-y-auto bg-auth-bg bg-cover bg-center bg-no-repeat py-20">
        <div className="absolute left-1/2 top-1/2 mx-auto w-full max-w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-[40px] border-2 border-black bg-[#04031033] px-10 py-10">
          {children}
        </div>
      </div>
    </section>
  );
}
