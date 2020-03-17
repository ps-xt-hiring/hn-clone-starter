
import { TOP, NEW } from '../utils/constants';
import Anchor from './shared/Anchor';
export default function Header() {
  return (
    <header className="header flex">
      <nav>
        <Anchor href="#" className="app-logo color-white">Y</Anchor>
        <Anchor href="#" className="color-white">{TOP}</Anchor>
        <span className="seperator">|</span>
        <Anchor href="#" className="color-black">{NEW}</Anchor>
      </nav>
      <style jsx>{`
            .header {
                background: #fb683b;
                padding: 10px;
                align-items: center;
                font-family: monospace;
                font-weight: 600;
                font-size: 12px;
            }
              .header .app-logo {
                border: 1px solid #ffffff;
                padding: 2px 4px;
                margin-right: 10px;
              }
              .seperator {
                margin: 0px 5px;
              }
            `}</style>
    </header>
  )
}