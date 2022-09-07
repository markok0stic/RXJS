import {initHome} from "./views/HomeView";
import {scoreboardView} from "./views/ScoreboardView";
import {getUsers} from "./controllers/UsersController";
import {loadUsers} from "./services/ScoreboardService";

loadUsers();