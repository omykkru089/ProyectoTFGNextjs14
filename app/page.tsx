import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from './ui/home.module.css';
import Image from 'next/image';
import { Footer } from './ui/footer';
import { Body } from './ui/body';
import { Header } from './ui/header';

export default function Page() {
  return (
    
      <main>
        <Header></Header>
        <Body></Body>
        <Footer></Footer>
      </main>
       
  );
}
