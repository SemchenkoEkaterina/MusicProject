const Router = require('express');
//const bodyParser = require('body-parser');

const router = new Router();

const trackController = require('../controllers/trackController');
const checkRole = require('../middleware/CheckRoleMiddleware');
//router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', checkRole('ADMIN'), trackController.create);
router.get('/', trackController.getAll);
router.get('/:id', trackController.getOne);
router.delete('/:id', checkRole('ADMIN'), trackController.deleteOne);
router.put('/', checkRole('ADMIN'), trackController.updateTrack);

module.exports = router;