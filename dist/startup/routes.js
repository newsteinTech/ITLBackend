"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userRoutes_1 = require("../routes/userRoutes");
const incidentRoutes_1 = require("../routes/incidentRoutes");
const groupRoutes_1 = require("../routes/groupRoutes");
class Routes {
    constructor() {
    }
    static configRoutes(app) {
        app.get('/', (req, res) => {
            res.send("server running");
        });
        app.use('/api/user', userRoutes_1.userRoutes);
        app.use('/api/incident', incidentRoutes_1.incidentRoutes);
        //app.use('/api/task', taskRoutes)
        app.use('/api/group', groupRoutes_1.groupRoutes);
        //app.use('/api/CI', CIRoutes)
        //app.use('/api/chatPortal', chatPortalRoutes)
        //app.use('/api/querySelector', QSRoutes)
    }
}
exports.Routes = Routes;
