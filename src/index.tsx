import { Container, createRoot } from 'react-dom/client'
import 'normalize.css'
import '@/css/init.less'
import { Main } from './main';


const container = document.querySelector('#root') as Container;
const root = createRoot(container);

root.render(<Main />);
