const Router = require('express');

const router = new Router();

const artistController = require('../controllers/artistController');
const checkRole = require('../middleware/CheckRoleMiddleware');

router.post('/', checkRole('ADMIN'), artistController.create);
router.get('/', artistController.getAll);
router.get('/:id', artistController.getOne);
router.delete('/:id', checkRole('ADMIN'), artistController.deleteOne);
router.put('/', checkRole('ADMIN'), artistController.updateArtist);

module.exports = router;