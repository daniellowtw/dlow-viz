require('../../build/index.html'); // so we have live reload

import data from "./components/data";
import dash from './components/dash';

require("../style/main.css");
require("../style/bulma.min.css");

var bootstrap = dash("#container");
bootstrap.init(data);
bootstrap.test();
bootstrap.update();