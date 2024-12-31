import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';

export default function FooterCom() {
  return (
    <Footer container className="bg-gradient-to-r from-gray-50 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-300 border-t-4 border-teal-500">
      <div className="w-full max-w-7xl mx-auto py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Branding */}
          <div className="text-center md:text-left">
            <Link
              to="/"
              className="flex items-center text-2xl font-extrabold text-teal-600 dark:text-teal-400"
            >
              <span className="px-3 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-md shadow-lg">
                Sahand's
              </span>
              <span className="ml-2">Blog</span>
            </Link>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Sharing knowledge and ideas through engaging blog posts.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <Footer.Title title="About" className="text-lg text-gray-900 dark:text-white font-semibold" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.100jsprojects.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-500 dark:hover:text-teal-400"
                >
                  100 JS Projects
                </Footer.Link>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-500 dark:hover:text-teal-400"
                >
                  About Us
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow Us" className="text-lg text-gray-900 dark:text-white font-semibold" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/sahandghavidel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-500 dark:hover:text-teal-400"
                >
                  Github
                </Footer.Link>
                <Footer.Link
                  href="#"
                  className="hover:text-teal-500 dark:hover:text-teal-400"
                >
                  Discord
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" className="text-lg text-gray-900 dark:text-white font-semibold" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="#"
                  className="hover:text-teal-500 dark:hover:text-teal-400"
                >
                  Privacy Policy
                </Footer.Link>
                <Footer.Link
                  href="#"
                  className="hover:text-teal-500 dark:hover:text-teal-400"
                >
                  Terms & Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>

        <Footer.Divider className="my-6 border-gray-300 dark:border-gray-600" />

        {/* Footer Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <Footer.Copyright
            href="#"
            by="Sahand's Blog"
            year={new Date().getFullYear()}
            className="text-sm text-gray-600 dark:text-gray-400"
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
              href="#"
              icon={BsTwitter}
              className="text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400"
            />
            <Footer.Icon
              href="https://github.com/sahandghavidel"
              icon={BsGithub}
              className="text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400"
            />
            <Footer.Icon
              href="#"
              icon={BsDribbble}
              className="text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400"
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}
