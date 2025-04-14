const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start">
            <span className="text-emerald-400 font-bold text-xl tracking-tight">
              X<span className="text-white">Emerald</span>
            </span>
          </div>
          <div className="mt-8 md:mt-0">
            <p className="text-center md:text-right text-sm text-gray-400">
              &copy; {new Date().getFullYear()} XEmerald. A tokenized real estate platform.<br />
              This is a simulation for educational purposes only.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
