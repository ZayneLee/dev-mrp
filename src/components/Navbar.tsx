import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          <Link href="/" legacyBehavior>
            <a className="hover:text-gray-400 transition duration-300">
              CVC Components System
            </a>
          </Link>
        </div>
        <div className="space-x-4 flex items-center">
          <Link href="/" legacyBehavior>
            <a className="text-gray-300 hover:text-white transition duration-300">
              Dashboard
            </a>
          </Link>
          <Link href="/add" legacyBehavior>
            <a className="text-gray-300 hover:text-white transition duration-300">
              CRM
            </a>
          </Link>
          <Link href="/about" legacyBehavior>
            <a className="text-gray-300 hover:text-white transition duration-300">
              My Production Plan
            </a>
          </Link>
          <Link href="/about" legacyBehavior>
            <a className="text-gray-300 hover:text-white transition duration-300">
              Production Planning
            </a>
          </Link>
          <Link href="/stock" legacyBehavior>
            <a className="text-gray-300 hover:text-white transition duration-300">
              Stock
            </a>
          </Link>
          <Link href="/about" legacyBehavior>
            <a className="text-gray-300 hover:text-white transition duration-300">
              Procurement
            </a>
          </Link>
          <Link href="/about" legacyBehavior>
            <a className="text-gray-300 hover:text-white transition duration-300">
              Setting
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
