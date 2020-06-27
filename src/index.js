import {renderComponent} from "./util";
import './index.css'
import GameStats from "./components/GameStats";

renderComponent({
    container: document.querySelector('body'),
    Element: GameStats,
    params: {
        player: window.location.pathname.replace('/', '') || 'firee80'
    }
})
