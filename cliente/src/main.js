import { routes } from "./router/routes";
import "./styles/global.css";


const app = document.getElementById("app")

app.innerHTML = routes["/"].render()