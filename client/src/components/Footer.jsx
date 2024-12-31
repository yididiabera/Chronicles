import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsTelegram } from 'react-icons/bs';

export default function FooterCom() {
  return (
    <Footer container className="bg-gradient-to-r from-indigo-50 to-purple-200 dark:from-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-300 border-t-4 border-purple-900">
      <div className="w-full max-w-7xl mx-auto py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Branding */}
          <div className="text-center md:text-left">
            <Link
              to="/"
              className="flex items-center text-2xl font-extrabold text-purple-600 dark:text-teal-400"
            >
              <span className="px-3 py-2 bg-gradient-to-r from-purple-950 via-pink-500 to-purple-500 text-white rounded-md shadow-lg">
                Chronicles
              </span>
            </Link>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Discover a world of insights and inspiration <br/> 
            through our engaging blog posts.<br />
             We share knowledge, spark ideas, and foster <br />
             a community of curious minds eager to learn and grow together.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <Footer.Title title="About" className="text-lg text-gray-900 dark:text-white font-semibold" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.linkedin.com/in/yididia-abera-a78276266/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-500 dark:hover:text-purple-400"
                >
                 Linkedin 
                </Footer.Link>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-500 dark:hover:text-pink-400"
                >
                  About Us
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow Us" className="text-lg text-gray-900 dark:text-white font-semibold" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/yididiabera"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-500 dark:hover:text-purple-400"
                >
                  Github
                </Footer.Link>
                <Footer.Link
                  href="#"
                  className="hover:text-purple-500 dark:hover:text-pink-400"
                >
                  X
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" className="text-lg text-gray-900 dark:text-white font-semibold" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://x.com/yididia_abera"
                  className="hover:text-purple-500 dark:hover:text-teal-400"
                >
                  Privacy Policy
                </Footer.Link>
                <Footer.Link
                  href="#"
                  className="hover:text-purple-500 dark:hover:text-teal-400"
                >
                  Terms & Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>

        <Footer.Divider className="my-6 border-pink-300 dark:border-gray-600" />

        {/* Footer Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <Footer.Copyright
            href="#"
            by="Chronicles"
            year={new Date().getFullYear()}
            className="text-sm text-purple-600 dark:text-gray-400"
          />
          {/* Social Icons */}
          <div className="flex gap-6 mt-4 md:mt-0">
            <Footer.Icon
              href="#"
              icon={BsFacebook}
              className="text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400"
            />
            <Footer.Icon
              href="#"
              icon={BsInstagram}
              className="text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400"
            />
            <Footer.Icon
              href="https://x.com/yididia_abera"
              icon={BsTwitter}
              className="text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400"
            />
            <Footer.Icon
              href="https://github.com/yididiabera"
              icon={BsGithub}
              className="text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400"
            />
            <Footer.Icon
              href="@BelovedOfJah"
              icon={BsTelegram}
              className="text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400"
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}
