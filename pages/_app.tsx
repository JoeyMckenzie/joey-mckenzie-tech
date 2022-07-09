import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { VFC } from 'react';
import Navbar from '@/components/Navbar';
import BlogSearchContextProvider from '@/lib/contexts/blog-search.context';
import AlertContextProvider from '@/lib/contexts/alert.context';
import Modal from '@/components/Modal';
import Notification from '@/components/Notification';
import FooterWithLinks from '@/components/FooterWithLinks';
import { ThemeProvider } from 'next-themes';
import { DefaultSeo } from 'next-seo';
import Intro from '@/components/Intro';
import { useRouter } from 'next/router';

const CustomApp: VFC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  const isPathRoute = (routeFragment: string) =>
    router.pathname.indexOf(routeFragment) > -1;

  const isSnippetOrBlogPage =
    isPathRoute('/blog/') || isPathRoute('/snippets/');

  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: 'https://joeymckenzie.tech/',
          site_name: 'joeymckenzie.tech',
        }}
        twitter={{
          handle: '@_joeyMcKenzie',
          site: 'https://twitter.com/_joeyMcKenzie',
          cardType: 'summary_large_image',
        }}
      />
      <BlogSearchContextProvider>
        <AlertContextProvider>
          <Modal />
          <Notification />
          <Navbar />
          {!isSnippetOrBlogPage && <Intro />}
          <Component {...pageProps} />
          <FooterWithLinks />
        </AlertContextProvider>
      </BlogSearchContextProvider>
    </ThemeProvider>
  );
};

export default CustomApp;
