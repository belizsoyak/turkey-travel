import Header from './Header';
import SocialLinks from './SocialLinks';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <SocialLinks />
      <Header />
      <Outlet /> 
    </>
  );
}