import { ArrowUpRight } from 'lucide-react';
import { Brand } from './brand';
import { site } from '@/data/site';
export function Navigation() {
  return <header className="header"><Brand /><nav aria-label="Main navigation"><a href="#work">Work</a><a href="#services">Services</a><a href="#about">About</a><a className="pill red-pill" href={site.enquiry}>Start a project <ArrowUpRight size={16} /></a></nav></header>;
}
