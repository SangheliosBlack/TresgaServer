const {dbConnection} = require('./database/config');
const corsOptions = require('./utils/cors_config');
const compression = require('compression');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path');
const passport = require('passport');

const expressWinston = require('express-winston')
const xss = require('xss-clean')
const trim_json_values = require('./utils/trim_json_values');

const swaggerOptions = require('./utils/swagger_config');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const AppError = require('./utils/appError');
const logger = require('./helpers/logger');
const globalErrorHandler = require('./controllers/errorController');

require('dotenv').config();


class Server {

    constructor(){
        
        this.app = express();
        this.server = require('http').createServer(this.app);
        this.port = process.env.PORT || 3000;
        this.env = process.env.NODE_ENV || 'development'
        this.apiVersion = `/api/${process.env.API_VERSION || 'v1'}`;

        module.exports.io = require('socket.io')(this.server);
        require('./sockets/socket');

        this.paths = {

            auth:'/auth',
            usuario:'/usuario',
            vales:'/vales',
            unidades:'/unidades',
            tanques:'/tanques',
            rutas: '/rutas',
            puntos_recoleccion : '/puntos_recoleccion',
            puntos_descarga : '/puntos_descarga',
            empleados: '/empleados',
            clientes: '/clientes'

        }

        this.middlewares();
        this.conectarDB();
        this.routes();

    }


    async conectarDB(){

        await dbConnection();

    }

    middlewares(){

      this.setupLogger();
      this.setupSecurity();
      this.setupCors();

      this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerOptions.options,)));

      this.app.get('/api-docs.json',(req,res)=>{
        res.setHeader('Content-Type','application/json');
        res.send(swaggerJsdoc(swaggerOptions.options));
      });

      this.app.use(express.static(path.resolve(__dirname,'public')));
      this.app.use(bodyParser.json(),trim_json_values);
      this.app.use(compression());

      if (process.env.NODE_ENV !== 'production') {
        this.app.use(morgan('dev'));
      }

      this.app.use(
        bodyParser.urlencoded({
          limit: '50mb',
          extended: true,
        })
      );

      require('./config/authentication');
      this.app.use(passport.initialize()); 

      this.app.use((req, res, next) => {
        req.requestTime = new Date().toISOString();
        next();
      });

    }

    routes(){

      this.app.set('view engine', 'ejs');

      this.app.use(`${this.apiVersion}${this.paths.auth}`,       require('./routes/autentificacion'));
      this.app.use(`${this.apiVersion}${this.paths.usuario}`,    require('./routes/usuarios'));
      this.app.use(`${this.apiVersion}${this.paths.vales}`,    require('./routes/vales'));
      this.app.use(`${this.apiVersion}${this.paths.unidades}`,    require('./routes/unidades'));
      this.app.use(`${this.apiVersion}${this.paths.tanques}`,    require('./routes/tanques'));
      this.app.use(`${this.apiVersion}${this.paths.rutas}`,    require('./routes/rutas'));
      this.app.use(`${this.apiVersion}${this.paths.puntos_recoleccion}`,    require('./routes/puntosRecoleccion'));
      this.app.use(`${this.apiVersion}${this.paths.puntos_descarga}`,    require('./routes/puntosDescarga'));
      this.app.use(`${this.apiVersion}${this.paths.empleados}`,    require('./routes/empleados'));
      this.app.use(`${this.apiVersion}${this.paths.clientes}`,    require('./routes/clientes'));

      this.app.all('*', (req, res, next) => {
        next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
      });

      this.app.use(globalErrorHandler);

    }

    listen(){

        this.server.listen(this.port,()=>{

          logger.info(`Servidor corriendo en puerto ${this,this.port}`);

        });
        
    }

    setupLogger() {
      this.app.use(
        expressWinston.logger({
          winstonInstance: logger,
          msg: function (req, res) {
            return `${res.statusCode} - ${req.method} - ${req.url} - ${
              res.responseTime
            }ms from: ${req.protocol}://${req.get('host')}`;
          },
        })
      );
    }

    setupSecurity() {
      
      this.app.use(xss());
    }
    
    setupCors() {
      this.app.use(cors(corsOptions.config));
    }

}

module.exports = Server                     ;