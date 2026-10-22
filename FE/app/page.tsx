import Link from "next/link";


export default function Home() {
  return (
    <main>
      <nav className='navbar'>
        <h2>Hədiyyələr</h2>
        <ul className='nav-links'>
          <li><Link href='/'>Ana Səhifə</Link></li>
          <li><Link href='/products'>Məhsullar</Link></li>
          <li><Link href='/favorites'>Sevimlilər</Link></li>
        </ul>
      </nav>
    </main>
  );
}
