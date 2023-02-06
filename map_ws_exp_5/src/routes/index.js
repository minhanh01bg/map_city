const v1Router = require('./ver1/index');
const authRouter = require('./authRouter');

const initWebRouter = (app) => {
    app.use('/api/auth', authRouter);
    app.use('/api/v1', v1Router);
};

module.exports = initWebRouter;
