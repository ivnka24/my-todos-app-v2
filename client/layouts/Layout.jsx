export default function Layout({ children }) {
  const greeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good Morning";
    if (hours < 18) return "Good Afternoon";
    return "Good Evening";
  };
  return (
    <div className="w-full min-h-screen bg-[#1a1a1c] flex flex-col px-[55px] py-[24px]">
      <div className="w-full flex items-center justify-center">
        <div className="w-full md:w-[445px] h-[155px] py-4 rounded-xl shadow-raised text-start px-4 border border-white border-[0px] bg-gradient-to-r from-[#1f1f21] via-[#1f1f21] to-[#1f1f21] justify-center flex flex-col">
          <h1 className="text-white text-4xl font-medium">{greeting()}</h1>
          <p className="text-white text-md mt-4">Start Managing Todos</p>
        </div>
      </div>
      {children}
    </div>
  );
}
