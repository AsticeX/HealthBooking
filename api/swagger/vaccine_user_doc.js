/**
 * @swagger
 * components:
 *   schemas:
 *     Vaccine_Users:
 *       type: object
 *       properties:
 *         user_id:
 *           type: string
 *         vaccine_name:
 *           type: string
 *         expire:
 *           type: string
 *           format: date
 *         attendance_date:
 *           type: string
 *           format: date
 *         hospital_name:
 *           type: string
 *         dose_user:
 *           type: array
 *           items:
 *             type: string
 *         dose_require:
 *           type: number
 *         type:
 *           type: string
 *         hospital:
 *           type: string
 *         priority:
 *           type: number
 *         flag:
 *           type: boolean
 */

/**
 * @swagger
 * tags:
 *   name: Vaccine_User
 *   description: Operations related to vaccines
 */

/**
 * @swagger
 * /api/vaccine_user:
 *   get:
 *     summary: Get all vaccine data
 *     tags: [Vaccine_User]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: []
 */

/**
 * @swagger
 * /api/vaccine_user:
 *   post:
 *     summary: Create a new vaccine record
 *     tags: [Vaccine_User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vaccine_Users'
 *     responses:
 *       201:
 *         description: Created successfully
 *         content:
 *           application/json:
 *             example: {}
 */

/**
 * @swagger
 * /api/vaccine_user/{id}:
 *   put:
 *     summary: Update a vaccine record by ID
 *     tags: [Vaccine_User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the vaccine to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vaccine_Users'
 *     responses:
 *       200:
 *         description: Updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vaccine_User'
 *       404:
 *         description: Vaccine User not found
 *         content:
 *           application/json:
 *             example:
 *               message: Vaccine User not found
 */

/**
 * @swagger
 * /api/vaccine_user/{id}:
 *   delete:
 *     summary: Delete a vaccine record by ID
 *     tags: [Vaccine_User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the vaccine to delete
 *     responses:
 *       200:
 *         description: Vaccine User deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Vaccine User deleted successfully
 *       404:
 *         description: Vaccine User not found
 *         content:
 *           application/json:
 *             example:
 *               message: Vaccine User not found
 */

/**
 * @swagger
 * /api/vaccine_user/search-vaccine-user-by-priority:
 *   get:
 *     summary: Get all vaccine data
 *     tags: [Vaccine_User]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: []
 */

/**
 * @swagger
 * /api/vaccine_user/search-single-vaccine-user/{id}:
 *   get:
 *     summary: Get a single Vaccine User by ID
 *     tags: [Vaccine_User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Vaccine User to retrieve
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 *       400:
 *         description: Invalid ID format
 *         content:
 *           application/json:
 *             example:
 *               message: Invalid ID format
 *       404:
 *         description: Vaccine User not found
 *         content:
 *           application/json:
 *             example:
 *               message: Vaccine User not found
 */
