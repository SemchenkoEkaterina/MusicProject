const ApiError = require('../error/apiError');
const sequelize = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateJWT = (id, email, role) => {
    return jwt.sign({id, email, role}, process.env.SECRET_KEY, {expiresIn: '24h'})
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body;
        if (!password || !email) {
            return next(ApiError.badRequest('Некорректный email или password'));
        }
        const sql = `
        SELECT * FROM users WHERE email='${email}'
      `;
		const candidate = await sequelize.query(sql, {
				type: sequelize.QueryTypes.SELECT
		});
        if (candidate.length !== 0) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'));
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const sqlUser = `
    	INSERT INTO users (email, role, password)
    	VALUES ('${email}', '${role}', '${hashPassword}')
        RETURNING id, email, role
  		`;
          const newUser = await sequelize.query(sqlUser, {
				type: sequelize.QueryTypes.INSERT
			});
        const token = generateJWT(newUser[0][0].id, newUser[0][0].email, newUser[0][0].role);
            return res.json({token})
    }
    
    async login(req, res, next) {
        const {email, password} = req.body;
        const sql = `
        SELECT * FROM users WHERE email='${email}'
      `;
		const user = await sequelize.query(sql, {
				type: sequelize.QueryTypes.SELECT
		});
        if (user.length === 0) {
            return next(ApiError.internal('Пользователь не найден'));
        };
        let comparePassword = bcrypt.compareSync(password, user[0].password);
        if (!comparePassword) {
            return next(ApiError.internal('Указан не верный пароль'));
        }
        const token = generateJWT(user[0].id, user[0].email, user[0].role);
        return res.json({token})
    }
    
    async check(req, res, next) {
        const token = generateJWT(req.user.id, req.user.email, req.user.role);
        return res.json({token});
    }
}

module.exports = new UserController();